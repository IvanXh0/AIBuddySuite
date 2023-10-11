"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { useUser } from "@clerk/nextjs";
import { ApiImageResponse } from "@/lib/ApiImageResponse.interface";

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ApiImageResponse[]>([]);
  const { user } = useUser();

  const getImagesFromBE = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/imagebot/user-images",
      {
        params: {
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      }
    );

    res.data
      ? setImages(
          res.data.flatMap(
            (image: { imageurls: ApiImageResponse["imageurls"][] }) =>
              image.imageurls
          )
        )
      : setImages([]);
  };

  const deleteImageHistory = async () => {
    await axios.delete("http://localhost:8080/api/imagebot", {
      params: {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });
    setImages([]);
  };

  useEffect(() => {
    if (user) getImagesFromBE();
  }, [user]);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post("/api/imagebot", {
        messages: prompt,
      });

      const imageUrls = response.data.map(
        (image: { url: string }) => image.url
      );

      const userEmail = user?.primaryEmailAddress?.emailAddress;

      const imageData = {
        imageUrls,
        userEmail,
      };

      await axios.post("http://localhost:8080/api/imagebot", imageData);

      getImagesFromBE();

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-transparent border w-full h-full p-4 mt-4 sm:p-8">
      <>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-800 bg-clip-text text-transparent">
          What kind of image would you like to generate?
        </h3>
        <div className="flex flex-col mt-4 sm:mt-8 h-full w-full max-w-screen-md">
          <form className="flex items-center flex-col" onSubmit={handleSubmit}>
            <Input
              placeholder="A picture of a cat doing computer science"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="p-4 sm:p-6 text-md w-full "
              disabled={isLoading}
            />
            <Button
              disabled={isLoading || !prompt}
              variant="default"
              className="p-3 sm:p-6 mt-2 sm:mt-4 text-md"
            >
              {isLoading ? (
                <Dna height="30" width="30" ariaLabel="dna-loading" />
              ) : (
                "Generate"
              )}
            </Button>
          </form>
          {images && (
            <div className="container mx-auto mt-4 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, idx) => (
                  <div className="image-container" key={idx}>
                    <div className="shadow-lg transition transform hover:scale-105">
                      <Image
                        //@ts-expect-error: 2322 - NextImage bug where the src is a string but still comes up as an error
                        src={image}
                        width={300}
                        height={300}
                        alt="generated image"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {images.length > 0 && (
            <div className="flex items-center justify-center p-5">
              <Button
                variant="outline"
                className=" p-3 w-[12rem] bg-red-500 hover:bg-black/30"
                onClick={() => deleteImageHistory()}
              >
                Clear History
              </Button>
            </div>
          )}
        </div>
      </>
    </div>
  );
}

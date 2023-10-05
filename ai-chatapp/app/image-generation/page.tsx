"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { Dna } from "react-loader-spinner";

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImages([]);

    try {
      setIsLoading(true);

      const response = await axios.post("/api/imagebot", {
        messages: prompt,
      });

      const imageUrls = response.data.map(
        (image: { url: string }) => image.url
      );

      setImages(imageUrls);

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
          <div className="flex flex-col items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            {images.map((image, idx) => (
              <div className="flex flex-col items-center " key={idx}>
                <Image
                  src={image}
                  width={300}
                  height={300}
                  alt="generated image"
                />
                <Button
                  variant="default"
                  className="p-3 sm:p-6 mt-2 sm:mt-4 text-md"
                  onClick={() => window.open(image, "_blank")}
                >
                  Download Image
                </Button>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

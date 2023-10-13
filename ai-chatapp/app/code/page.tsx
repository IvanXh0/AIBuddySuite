"use client";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import useCodeStore from "@/store/CodeStore";
import { useUser } from "@clerk/nextjs";
import { ApiResponseMessages } from "@/lib/ApiResponseMessage.interface";

export default function Code() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codes, setCodes] = useState<ApiResponseMessages[]>([]);
  const { user } = useUser();
  const { prompts, clearPrompts, addPrompt } = useCodeStore();

  const getCodesFromBE = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chatbot/user-codes`,
      {
        params: {
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      }
    );
    setCodes(res.data);
  };

  const deleteCodeHistory = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/codebot}`, {
      params: {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });
    setCodes([]);
  };

  useEffect(() => {
    if (user) getCodesFromBE();
  }, [user]);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt,
      };

      const response = await axios.post("/api/codebot", {
        messages: [...prompts, userMessage],
      });

      const userEmail = user?.primaryEmailAddress?.emailAddress;

      const requestData = {
        userMessage: {
          ...userMessage,
          email: userEmail,
        },
        responseData: {
          ...response.data,
          email: userEmail,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/codebot}`,
        requestData
      );

      getCodesFromBE();
      addPrompt([userMessage, response.data]);

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
          What do you need help with? Remember, I'm a coding bot.
        </h3>
        <div className="flex flex-col mt-4 sm:mt-8 h-full w-full max-w-screen-md">
          <form className="flex items-center flex-col" onSubmit={handleSubmit}>
            <Input
              placeholder="Reverse a linked list, please."
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
          {codes && (
            <div className="flex flex-col-reverse gap-2 sm:gap-4 mt-4 sm:mt-6">
              {codes.map((message, idx) => (
                <div
                  key={message._id}
                  className={cn(
                    "p-3 sm:p-4 w-full flex items-start gap-2 sm:gap-4 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-zinc-900 border border-black/10 text-white"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 p-2 bg-white/10 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="overflow-hidden text-sm leading-7"
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          )}
          {codes && (
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="mt-4 p-3 w-[12rem] bg-red-500 hover:bg-black/30"
                onClick={() => {
                  deleteCodeHistory();
                  clearPrompts();
                }}
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

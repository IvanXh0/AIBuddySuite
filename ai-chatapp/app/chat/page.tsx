"use client";

import { BotAvatar } from "@/components/bot-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import React, { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import useChatStore from "@/store/ChatStore";
import { ApiResponseMessages } from "@/lib/ApiResponseMessage.interface";

export default function Chat() {
  const [messages, setMessages] = useState<ApiResponseMessages[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { prompts, clearPrompts, addPrompt } = useChatStore();

  const getMessagesFromBE = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/chatbot/user-chats`,
      {
        params: {
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      }
    );
    setMessages(res.data);
  };

  const deleteChatHistory = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/chatbot`, {
      params: {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });
    setMessages([]);
  };

  useEffect(() => {
    if (user) getMessagesFromBE();
  }, [user]);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt,
      };

      const response = await axios.post("/api/chatbot", {
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
        `${process.env.NEXT_PUBLIC_API_URL}/chatbot`,
        requestData
      );

      getMessagesFromBE();
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
          So.. what's on your mind {user?.firstName}?
        </h3>
        <div className="flex flex-col mt-4 sm:mt-8 h-full w-full max-w-screen-md">
          <form className="flex items-center flex-col" onSubmit={handleSubmit}>
            <Input
              placeholder="Ex: I had a horrible day today, can you lighten me up?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="p-4 sm:p-6 text-md w-full "
              disabled={isLoading}
              data-testid="input-element"
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
          {messages && (
            <div className="flex flex-col-reverse gap-2 sm:gap-4 mt-4 sm:mt-6">
              {messages.map((message) => (
                <div
                  key={message._id}
                  data-testid="message-element"
                  className={cn(
                    "p-3 sm:p-4 w-full flex items-start gap-2 sm:gap-4 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-zinc-900 border border-black/10 text-white"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  {message.content}
                </div>
              ))}
            </div>
          )}
          {messages && (
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="mt-4 p-3 w-[12rem] bg-red-500 hover:bg-black/30"
                onClick={() => {
                  deleteChatHistory();
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

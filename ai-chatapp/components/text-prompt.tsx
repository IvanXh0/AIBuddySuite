"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Dna } from "react-loader-spinner";
import { UserAvatar } from "./user-avatar";
import { BotAvatar } from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import { NotLoggedIn } from "./not-logged-in";

export default function TextPrompt() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, isSignedIn } = useUser();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/chatbot", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-zinc-600 w-full h-full p-24 mt-12 ">
      {isSignedIn ? (
        <>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Tell me about your day!
          </h3>
          <div className="flex flex-col mt-12 h-full  max-w-[750px] ">
            <form
              className="flex items-center flex-col"
              onSubmit={handleSubmit}
            >
              <Textarea
                placeholder="Start talking please.."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="p-10 text-md w-[750px]"
                disabled={isLoading}
              />
              <Button
                disabled={isLoading}
                variant="default"
                className="p-9 mt-4 text-md"
              >
                {isLoading ? (
                  <Dna height="40" width="40" ariaLabel="dna-loading" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
            <div className="flex flex-col-reverse gap-y-4 mt-5">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
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
          </div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
}

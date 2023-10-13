"use client";
import TypewriterComponent from "typewriter-effect";

export default function Heading() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Welcome to <span className="text-violet-400">AIBuddySuite</span>
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Your AI Companion For
      </p>
      <span className="text-violet-400 text-lg">
        <TypewriterComponent
          options={{
            strings: ["Chatting", "Coding", "Image Generation"],
            autoStart: true,
            loop: true,
          }}
        />
      </span>
    </div>
  );
}

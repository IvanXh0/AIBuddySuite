"use client";

import TypewriterComponent from "typewriter-effect";

export const Heading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold p-12 text-slate-100">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AIBuddySuite
          </span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl flex flex-col md:flex-row font-semibold p-5 text-slate-100 items-center text-center">
          Your AI Companion For
          <div className="md:ml-3">
            <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              <TypewriterComponent
                options={{
                  strings: ["Chatting", "Coding", "Image Generation"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        </h3>
      </div>
    </>
  );
};

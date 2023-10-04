import HomeAnimation from "@/components/home-animation";
import TextPrompt from "@/components/text-prompt";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  justify-between p-14">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold p-12 text-zinc-800">
          Need someone to lighten up your day?{" "}
          <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ChatBuddyGPT
          </span>{" "}
          has got you covered.
        </h1>
        <h3 className="text-2xl font-semibold p-5 text-zinc-800">
          Just type in a message and let your AI companion help you.
        </h3>
        <HomeAnimation />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-12 p-12">
          Chat with your AI buddy!
        </h2>
        <TextPrompt />
      </div>
    </main>
  );
}

import HomeAnimation from "@/components/home-animation";
import TextPrompt from "@/components/text-prompt";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold p-12 text-zinc-800">
          Welcome to ChatBuddyGPT, your personal{" "}
          <span className="text-blue-500">AI</span> assistant
        </h1>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Chat with your AI buddy!
        </h2>
        <HomeAnimation />
        <TextPrompt />
      </div>
    </main>
  );
}

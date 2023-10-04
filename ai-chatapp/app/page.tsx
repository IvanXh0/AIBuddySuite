import { Heading } from "@/components/heading";
import HomeAnimation from "@/components/home-animation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-zinc-800">
      <div className="flex flex-col items-center">
        <Heading />
        <HomeAnimation />
      </div>
    </main>
  );
}

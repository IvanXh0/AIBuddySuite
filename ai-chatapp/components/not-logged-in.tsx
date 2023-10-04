import Link from "next/link";
import { Button } from "./ui/button";

export const NotLoggedIn = () => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-zinc-600 w-full h-full p-24 mt-12">
      <h3 className="text-3xl font-bold text-zinc-200 bg-clip-text">
        You should consider logging in first
      </h3>
      <Link href="sign-in">
        <Button variant="default" className="p-12 text-lg mt-5">
          Login
        </Button>
      </Link>
    </div>
  );
};

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex align-end justify-end bg-zinc-600">
      {isSignedIn ? (
        <div className="p-5 rounded-lg flex flex-row gap-4">
          <p className="text-xl font-bold text-zinc-200">
            Welcome, {user.firstName}
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="p-5 rounded-lg">
          <Link href="/sign-in">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

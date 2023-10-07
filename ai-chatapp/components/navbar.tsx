"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Chat",
    href: "/chat",
  },
  {
    name: "Code",
    href: "/code",
  },
  {
    name: "Image Generation",
    href: "/image-generation",
  },
];

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const noUser = !isSignedIn && pathname !== "/sign-in";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (noUser) {
        localStorage.removeItem("chatPrompts");
        localStorage.removeItem("codePrompts");
        localStorage.removeItem("imagePrompts");
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [noUser]);

  return (
    <div className="flex justify-between items-center bg-zinc-900 p-5">
      <div className="flex space-x-4 text-slate-300">
        {routes.map((route) => (
          <Link
            className={pathname === route.href ? "text-violet-400" : ""}
            key={route.name}
            href={route.href}
          >
            {route.name}
          </Link>
        ))}
      </div>
      {isSignedIn ? (
        <div className="flex items-center space-x-4">
          <p className="hidden md:block text-lg font-semibold text-zinc-300">
            Welcome, {user.firstName}
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <Link href="/sign-in">
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </div>
  );
}

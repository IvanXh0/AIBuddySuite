"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="flex justify-between inset-0 items-center bg-transparent p-4">
      <div className="flex space-x-4 text-zinc-800">
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
          <p className="hidden md:block text-lg font-semibold text-zinc-800">
            Welcome, {user.firstName}
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <Link href="/sign-in">
          <Button variant="secondary">Login</Button>
        </Link>
      )}
    </nav>
  );
}

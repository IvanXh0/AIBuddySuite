/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isSignedIn: false,
    user: null,
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

const routes = ["Home", "Chat", "Code", "Image Generation"];

describe("Navbar component", () => {
  it("renders the Navbar component", () => {
    render(<Navbar />);

    const navbarElement = screen.getByText("Home");
    expect(navbarElement).toBeInTheDocument();
  });

  it("renders the routes", () => {
    render(<Navbar />);

    routes.forEach((route) => {
      const routeElement = screen.getByText(route);
      expect(routeElement).toBeInTheDocument();
    });
  });

  it("redirects you to /sign-in if you are not signed in", () => {
    render(<Navbar />);

    const chatElement = screen.getByText("Chat");

    fireEvent.click(chatElement);

    expect(usePathname).toHaveBeenCalled();
  });

  it("renders the login button when not signed in", () => {
    render(<Navbar />);

    const loginElement = screen.getByText("Login");

    expect(loginElement).toBeInTheDocument();
  });
});

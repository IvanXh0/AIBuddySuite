/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";

// Mock the Clerk user context for testing
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isSignedIn: false,
    user: null,
  }),
}));

// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Navbar component", () => {
  it("renders the Navbar component", () => {
    render(<Navbar />);

    // Assert that the Navbar component is rendered
    const navbarElement = screen.getByText("Home");
    expect(navbarElement).toBeInTheDocument();
  });

  it("redirects you to /sign-in if you are not signed in", () => {
    render(<Navbar />);

    const chatElement = screen.getByText("Chat");

    fireEvent.click(chatElement);

    expect(require("next/router").useRouter().push("/sign-in"));
  });
});

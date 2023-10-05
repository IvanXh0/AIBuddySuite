/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { UserAvatar } from "@/components/user-avatar";
import { describe } from "node:test";

jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isSignedIn: true,
    user: { imageUrl: "https://example.com" },
  }),
}));

describe("UserAvatar component", () => {
  it("renders the UserAvatar component", () => {
    render(<UserAvatar />);
  });

  it("has the correct size", () => {
    render(<UserAvatar />);
    const avatar = screen.getByTestId("user-avatar");
    expect(avatar).toHaveClass("h-8 w-8");
  });
});

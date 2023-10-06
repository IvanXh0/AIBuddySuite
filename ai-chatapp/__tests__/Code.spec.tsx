/**
 * @jest-environment jsdom
 */

import { describe } from "node:test";
import axios from "axios";

jest.mock("@clerk/nextjs", () => {
  return {
    useUser: () => ({
      isSignedIn: true,
      user: { imageUrl: "https://example.com" },
    }),
  };
});

jest.mock("axios");

const responseData = {
  messages: [{ content: "Hello" }, { content: "World" }],
};

describe("Code component", () => {
  it("returns data from the api", () => {
    axios.post.mockResolvedValueOnce({ data: responseData });
  });
});

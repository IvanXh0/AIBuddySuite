/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Chat from "@/app/chat/page";
import { describe } from "node:test";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

jest.mock("@clerk/nextjs", () => {
  return {
    useUser: () => ({
      isSignedIn: true,
      user: { imageUrl: "https://example.com" },
    }),
  };
});

const mock = new MockAdapter(axios);

mock.onPost("/api/chatbot").reply(200, {
  messages: [{ content: "Hello" }, { content: "World" }],
});

describe("Chat component", () => {
  it("renders the Chat component", () => {
    render(<Chat />);
  });

  it("disables the button during loading", () => {
    render(<Chat />);
    const button = screen.getByText("Generate");

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  it("displays the messages after form submission", async () => {
    render(<Chat />);

    const inputField: HTMLInputElement = screen.getByTestId("input-element");

    fireEvent.change(inputField, { target: { value: "Test input" } });
    fireEvent.click(screen.getByText("Generate"));

    await waitFor(() => {
      const messages = screen.getAllByTestId("message-element");
      expect(messages).toHaveLength(2);
    });
  });
});

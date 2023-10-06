/**
 * @jest-environment jsdom
 */

import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ImageGeneration from "@/app/image-generation/page";
import { describe } from "node:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mock = new MockAdapter(axios);

mock
  .onPost("/api/imagebot")
  .reply(200, [
    { url: "https://example.com/image1.jpg" },
    { url: "https://example.com/image2.jpg" },
  ]);

describe("Image Generation component", () => {
  it("renders the ImageGeneration component", () => {
    render(<ImageGeneration />);
  });

  it("updates input field value", () => {
    render(<ImageGeneration />);
    const inputField: HTMLInputElement = screen.getByPlaceholderText(
      "A picture of a cat doing computer science"
    );
    fireEvent.change(inputField, { target: { value: "Test input" } });
    expect(inputField.value).toBe("Test input");
  });

  it("disables the button during loading", () => {
    render(<ImageGeneration />);
    const button = screen.getByText("Generate");
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("displays images after form submission", async () => {
    render(<ImageGeneration />);
    const inputField: HTMLInputElement = screen.getByPlaceholderText(
      "A picture of a cat doing computer science"
    );

    fireEvent.change(inputField, { target: { value: "Test input" } });
    fireEvent.click(screen.getByText("Generate"));

    await waitFor(() => {
      const images = screen.getAllByAltText("generated image");
      expect(images).toHaveLength(2);
    });
  });
});

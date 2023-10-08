import { ChatCompletionRequestMessage } from "openai";
import { create } from "zustand";

export interface Prompt {
  prompt: ChatCompletionRequestMessage;
  response?: ChatCompletionRequestMessage;
  role?: string;
  content?: string;
}

interface CodeStore {
  prompts: Prompt[];
  addPrompt: (prompts: Prompt[]) => void;
  setPrompts: () => void;
  clearPrompts: () => void;
  savePromptsToLocalStorage: (prompts: Prompt[]) => void;
}

const useCodeStore = create<CodeStore>((set) => ({
  prompts: [],
  addPrompt: (prompts) => {
    set((state) => ({
      prompts: [...state.prompts, ...prompts],
    }));
  },
  setPrompts: () => {
    const prompts = localStorage.getItem("codePrompts");

    if (prompts) {
      const parsedPrompts = JSON.parse(prompts);
      set({ prompts: parsedPrompts });
    }
  },
  clearPrompts: () => {
    set({ prompts: [] });

    localStorage.removeItem("codePrompts");
  },
  savePromptsToLocalStorage: (prompts) => {
    localStorage.setItem("codePrompts", JSON.stringify(prompts));
  },
}));

export default useCodeStore;

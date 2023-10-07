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
  clearPrompts: () => void;
  savePromptsToLocalStorage: () => void;
}

const useCodeStore = create<CodeStore>((set) => ({
  prompts: [],
  addPrompt: (prompts) => {
    set((state) => ({
      prompts: [...state.prompts, ...prompts],
    }));
  },
  clearPrompts: () => {
    set({ prompts: [] });

    localStorage.removeItem("codePrompts");
  },
  savePromptsToLocalStorage: () => {
    const storedPrompts = localStorage.getItem("codePrompts");

    const existingPrompts = storedPrompts ? JSON.parse(storedPrompts) : [];

    const prompts = [...existingPrompts, ...useCodeStore.getState().prompts];

    localStorage.setItem("codePrompts", JSON.stringify(prompts));
  },
}));

export default useCodeStore;

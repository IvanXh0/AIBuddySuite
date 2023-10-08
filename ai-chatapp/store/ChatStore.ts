import { ChatCompletionRequestMessage } from "openai";
import { create } from "zustand";

export interface Prompt {
  prompt: ChatCompletionRequestMessage;
  response?: ChatCompletionRequestMessage;
  role?: string;
  content?: string;
}

interface ChatStore {
  prompts: Prompt[];
  addPrompt: (prompts: Prompt[]) => void;
  setPrompts: () => void;
  clearPrompts: () => void;
  savePromptsToLocalStorage: (prompts: Prompt[]) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  prompts: [],
  addPrompt: (prompts) => {
    set((state) => ({
      prompts: [...state.prompts, ...prompts],
    }));
  },
  clearPrompts: () => {
    set({ prompts: [] });

    localStorage.removeItem("chatPrompts");
  },
  setPrompts: () => {
    const prompts = localStorage.getItem("chatPrompts");

    if (prompts) {
      const parsedPrompts = JSON.parse(prompts);

      set({ prompts: parsedPrompts });
    }
  },
  savePromptsToLocalStorage: (prompts) => {
    localStorage.setItem("chatPrompts", JSON.stringify(prompts));
  },
}));

export default useChatStore;

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
  clearPrompts: () => void;
  savePromptsToLocalStorage: () => void;
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
  savePromptsToLocalStorage: () => {
    const storedPrompts = localStorage.getItem("chatPrompts");

    const existingPrompts = storedPrompts ? JSON.parse(storedPrompts) : [];

    const prompts = [...existingPrompts, ...useChatStore.getState().prompts];

    localStorage.setItem("chatPrompts", JSON.stringify(prompts));
  },
}));

export default useChatStore;

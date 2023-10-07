import { ChatCompletionRequestMessage } from "openai";
import { create } from "zustand";

export interface Prompt {
  imageUrl: string;
}

interface ImageStore {
  prompts: Prompt[];
  addPrompt: (prompts: Prompt[]) => void;
  clearPrompts: () => void;
  savePromptsToLocalStorage: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  prompts: [],
  addPrompt: (prompts) => {
    set((state) => ({
      prompts: [...state.prompts, ...prompts],
    }));
  },
  clearPrompts: () => {
    set({ prompts: [] });

    localStorage.removeItem("imagePrompts");
  },
  savePromptsToLocalStorage: () => {
    const prompts = useImageStore.getState().prompts;

    localStorage.setItem("imagePrompts", JSON.stringify(prompts));
  },
}));

export default useImageStore;

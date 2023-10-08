import { create } from "zustand";

interface ImageStore {
  prompts: string[];
  addPrompt: (prompts: string[]) => void;
  setPrompts: () => void;
  clearPrompts: () => void;
  savePromptsToLocalStorage: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  prompts: [],
  addPrompt: (prompt) => {
    set((state) => ({
      prompts: [...state.prompts, ...prompt],
    }));
  },
  setPrompts: () => {
    const prompts = localStorage.getItem("imagePrompts");

    if (prompts) {
      const parsedPrompts = JSON.parse(prompts);

      set({ prompts: parsedPrompts });
    }
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

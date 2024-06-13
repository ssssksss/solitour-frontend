import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  title: string;
  location: string;
  category: string;
  content: string;
  tips: string[];
}

interface EditorActions {
  initialize: () => void;
  setTitle: (title: string) => void;
  setLocation: (location: string) => void;
  setCategory: (category: string) => void;
  setContent: (content: string) => void;
  changeTip: (index: number, tip: string) => void;
  addTip: () => void;
  removeTip: (target: number) => void;
}

type EditorStoreType = StateCreator<EditorState & EditorActions>;

const initialState: EditorState = {
  title: "",
  location: "",
  category: "",
  content: "",
  tips: [""],
};

const editorStore: EditorStoreType = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setTitle: (title: string) => set({ title: title }),
  setLocation: (location: string) => set({ location: location }),
  setCategory: (category: string) => set({ category: category }),
  setContent: (content: string) => set({ content: content }),
  changeTip: (index: number, tip: string) =>
    set((state) => {
      const tips = [...state.tips];
      tips[index] = tip;
      return {
        tips: tips,
      };
    }),
  addTip: () => set((state) => ({ tips: [...state.tips, ""] })),
  removeTip: (target: number) =>
    set((state) => ({
      tips: state.tips.filter((tip, index) => {
        index !== target;
      }),
    })),
});

const useEditorStore = create<EditorState & EditorActions>()(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export default useEditorStore;

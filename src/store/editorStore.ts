import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  title: string;
  location: string;
  category: string;
  subCategory: string;
  images: string[];
  content: string;
  tips: string[];
}

interface EditorActions {
  initialize: () => void;
  changeField: (key: string, value: string) => void;
  changeTip: (index: number, tip: string) => void;
  changeImage: (index: number, image: string) => void;
  addTip: () => void;
  removeTip: () => void;
  addImage: () => void;
}

type EditorStoreType = StateCreator<EditorState & EditorActions>;

const initialState: EditorState = {
  title: "",
  location: "",
  category: "",
  subCategory: "",
  images: [""],
  content: "",
  tips: [""],
};

const editorStore: EditorStoreType = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  changeField: (key: string, value: string) => set({ [key]: value }),
  changeTip: (index: number, tip: string) =>
    set((state) => {
      const tips = [...state.tips];
      tips[index] = tip;
      return {
        tips: tips,
      };
    }),
  changeImage: (index: number, image: string) =>
    set((state) => {
      const images = [...state.images];
      images[index] = image;
      return {
        images: images,
      };
    }),
  addTip: () => set((state) => ({ tips: [...state.tips, ""] })),
  removeTip: () =>
    set((state) => ({ tips: state.tips.slice(0, state.tips.length - 1) })),
  addImage: () => set((state) => ({ images: [...state.images, ""] })),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export default useEditorStore;

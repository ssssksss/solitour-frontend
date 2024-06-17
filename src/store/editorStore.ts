import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  title: string;
  location: string;
  category: string;
  subCategory: string;
  images: string[];
  mainImageIndex: number;
  content: string;
  hashtags: string[];
  tips: string[];
}

interface EditorActions {
  initialize: () => void;
  changeField: (key: string, value: string) => void;
  changeImage: (index: number, image: string) => void;
  changeMainImageIndex: (index: number) => void;
  changeHashtag: (index: number, hashtag: string) => void;
  changeTip: (index: number, tip: string) => void;
  addImage: () => void;
  addHashtag: () => void;
  addTip: () => void;
  removeImage: (index: number) => void;
  removeTip: () => void;
}

type EditorStoreType = StateCreator<EditorState & EditorActions>;

const initialState: EditorState = {
  title: "",
  location: "",
  category: "",
  subCategory: "",
  images: [""],
  mainImageIndex: 0,
  content: "",
  hashtags: [""],
  tips: [""],
};

const editorStore: EditorStoreType = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  changeField: (key: string, value: string) => set({ [key]: value }),
  changeImage: (index: number, image: string) =>
    set((state) => {
      const images = [...state.images];
      images[index] = image;
      return {
        images: images,
      };
    }),
  changeMainImageIndex: (index: number) => set({ mainImageIndex: index }),
  changeHashtag: (index: number, hashtag: string) =>
    set((state) => {
      const hashtags = [...state.hashtags];
      hashtags[index] = hashtag;
      return {
        hashtags: hashtags,
      };
    }),
  changeTip: (index: number, tip: string) =>
    set((state) => {
      const tips = [...state.tips];
      tips[index] = tip;
      return {
        tips: tips,
      };
    }),
  addImage: () => set((state) => ({ images: [...state.images, ""] })),
  addHashtag: () => set((state) => ({ hashtags: [...state.hashtags, ""] })),
  addTip: () => set((state) => ({ tips: [...state.tips, ""] })),
  removeImage: (index: number) =>
    set((state) => ({ images: state.images.filter((_, i) => index !== i) })),
  removeTip: () =>
    set((state) => ({ tips: state.tips.slice(0, state.tips.length - 1) })),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export default useEditorStore;

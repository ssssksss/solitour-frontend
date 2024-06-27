import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  title: string;
  address: string; // 도로명주소
  province: number;
  city: number;
  placeId: string; // 장소 id
  placeName: string; // 장소명
  placeXAxis: string; // 경도 (longitude)
  placeYAxis: string; // 위도 (latitude)
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
  changeTip: (index: number, tip: string) => void;
  addImage: () => void;
  addHashtag: (hashtag: string) => void;
  addTip: () => void;
  resetPlaceInfo: () => void;
  removeImage: (index: number) => void;
  removeHashtag: (index: number) => void;
  removeTip: () => void;
}

type EditorStoreType = StateCreator<EditorState & EditorActions>;

const initialState: EditorState = {
  title: "",
  address: "",
  province: 0,
  city: 0,
  placeId: "",
  placeXAxis: "", // "126.9786567"
  placeYAxis: "", // "37.566826"
  placeName: "",
  category: "",
  subCategory: "",
  images: [""],
  mainImageIndex: 0,
  content: "",
  hashtags: [],
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
  changeTip: (index: number, tip: string) =>
    set((state) => {
      const tips = [...state.tips];
      tips[index] = tip;
      return {
        tips: tips,
      };
    }),
  addImage: () => set((state) => ({ images: [...state.images, ""] })),
  addHashtag: (hashtag: string) =>
    set((state) => {
      if (!state.hashtags.includes(hashtag) && hashtag !== "") {
        return { hashtags: [...state.hashtags, hashtag] };
      } else {
        return { hashtags: state.hashtags };
      }
    }),
  addTip: () => set((state) => ({ tips: [...state.tips, ""] })),
  resetPlaceInfo: () =>
    set({
      address: "",
      placeId: "",
      placeXAxis: "",
      placeYAxis: "",
      placeName: "",
    }),
  removeImage: (index: number) =>
    set((state) => ({ images: state.images.filter((_, i) => index !== i) })),
  removeHashtag: (index: number) =>
    set((state) => ({
      hashtags: state.hashtags.filter((_, i) => index !== i),
    })),
  removeTip: () =>
    set((state) => ({ tips: state.tips.slice(0, state.tips.length - 1) })),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export type useEditorStoreType = EditorState & EditorActions;

export default useEditorStore;

import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface EditorState {
  title: string;
  address: string; // 도로명주소
  province: string;
  city: string;
  placeId: string; // 장소 id
  placeName: string; // 장소명
  placeXAxis: string; // 경도 (longitude)
  placeYAxis: string; // 위도 (latitude)
  categoryId: number;
  categoryName: string;
  images: string[];
  deletedImages: string[];
  mainImageIndex: number;
  content: string;
  contentLength: number;
  hashtags: string[];
  tips: string[];
}

// 2. 액션 인터페이스 정의
interface EditorActions {
  initialize: () => void;
  setEditor: (data: Partial<EditorState>) => void;
  changeImage: (index: number, image: string) => void;
  changeTip: (index: number, tip: string) => void;
  addImage: () => void;
  addHashtag: (hashtag: string) => void;
  resetPlaceInfo: () => void;
}

// 3. 초기 상태 정의
const initialState: EditorState = {
  title: "",
  address: "",
  province: "",
  city: "",
  placeId: "",
  placeXAxis: "", // "126.9786567"
  placeYAxis: "", // "37.566826"
  placeName: "",
  categoryId: 0,
  categoryName: "",
  images: [""],
  deletedImages: [],
  mainImageIndex: 0,
  content: "",
  contentLength: 0,
  hashtags: [],
  tips: [""],
};

// 4. 상태 및 액션 생성
const editorStore: StateCreator<EditorState & EditorActions> = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setEditor: (data: Partial<EditorState>) => set(() => ({ ...data })),
  changeImage: (index: number, image: string) =>
    set((state) => {
      const images = [...state.images];
      images[index] = image;
      return {
        images: images,
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
  addImage: () =>
    set((state) => ({
      images: [...state.images, ""],
    })),
  addHashtag: (hashtag: string) =>
    set((state) => {
      if (!state.hashtags.includes(hashtag) && hashtag.trim() !== "") {
        return { hashtags: [...state.hashtags, hashtag.trim()] };
      } else {
        return { hashtags: state.hashtags };
      }
    }),
  resetPlaceInfo: () =>
    set({
      province: "",
      city: "",
      address: "",
      placeId: "",
      placeXAxis: "",
      placeYAxis: "",
      placeName: "",
    }),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export type useEditorStoreType = EditorState & EditorActions;

export default useEditorStore;

import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface EditorState {
  imageLoading: boolean;
  images: string[];
  mainImageIndex: number;
}

// 2. 액션 인터페이스 정의
interface EditorActions {
  initialize: () => void;
  setEditor: (data: Partial<EditorState>) => void;
  changeImage: (index: number, image: string) => void;
  addImage: () => void;
}

// 3. 초기 상태 정의
const initialState: EditorState = {
  imageLoading: false,
  images: [""],
  mainImageIndex: 0,
};

// 4. 상태 및 액션 생성
const editorStore: StateCreator<EditorState & EditorActions> = (set) => ({
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
  addImage: () =>
    set((state) => ({
      images: [...state.images, ""],
    })),
});

const useEditorStore = create<EditorState & EditorActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(editorStore) : editorStore,
);

export type useEditorStoreType = EditorState & EditorActions;

export default useEditorStore;

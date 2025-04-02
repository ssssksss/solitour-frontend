import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface InformationEditorState {
  imageLoading: boolean;
  imageList: string[];
  mainImageIndex: number;
}

// 2. 액션 인터페이스 정의
interface InformationEditorAction {
  initialize: () => void;
  setInformationEditorState: (data: Partial<InformationEditorState>) => void;
  changeImage: (index: number, image: string) => void;
  addImage: () => void;
}

// 3. 초기 상태 정의
const initialState: InformationEditorState = {
  imageLoading: false,
  imageList: [""],
  mainImageIndex: 0,
};

type InformationEditorStoreType = InformationEditorState &
  InformationEditorAction;

// 4. 상태 및 액션 생성
const informationEditorStore: StateCreator<InformationEditorStoreType> = (
  set,
) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setInformationEditorState: (data: Partial<InformationEditorState>) =>
    set(() => ({ ...data })),
  changeImage: (index: number, image: string) =>
    set((state) => {
      const images = [...state.imageList];
      images[index] = image;
      return {
        imageList: images,
      };
    }),
  addImage: () =>
    set((state) => ({
      imageList: [...state.imageList, ""],
    })),
});

/* eslint-disable indent */
export const useInformationEditorStore = create<InformationEditorStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(
        informationEditorStore,
      ) as StateCreator<InformationEditorStoreType>)
    : informationEditorStore,
);
/* eslint-enable indent */

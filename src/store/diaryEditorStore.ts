import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface DiaryEditorState {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  days: number;
  currentDay: number;
  placeName: string[];
  address: string[];
  image: string;
  moodLevels: number[];
  contents: string[];
}

// 2. 액션 인터페이스 정의
interface DiaryEditorActions {
  initialize: () => void;
  setDiaryEditor: (data: Partial<DiaryEditorState>) => void;
  changeAddress: (index: number, placeName: string, address: string) => void;
  changeMoodLevel: (index: number, value: number) => void;
  changeContent: (index: number, value: string) => void;
}

// 3. 초기 상태 정의
const initialState: DiaryEditorState = {
  title: "",
  startDate: null,
  endDate: null,
  days: 0,
  currentDay: 1,
  placeName: [""],
  address: [""],
  image: "",
  moodLevels: [],
  contents: [],
};

// 4. 상태 및 액션 생성
const diaryEditorStore: StateCreator<DiaryEditorState & DiaryEditorActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setDiaryEditor: (data: Partial<DiaryEditorState>) => set(() => ({ ...data })),
  changeAddress: (index: number, placeName: string, address: string) =>
    set((state) => ({
      placeName: state.placeName.map((value, idx) =>
        idx === index ? placeName : value,
      ),
      address: state.address.map((value, idx) =>
        idx === index ? address : value,
      ),
    })),
  changeMoodLevel: (index: number, value: number) =>
    set((state) => ({
      moodLevels: state.moodLevels.map((moodLevel, idx) =>
        idx === index ? value : moodLevel,
      ),
    })),
  changeContent: (index: number, value: string) =>
    set((state) => ({
      contents: state.contents.map((content, idx) =>
        idx === index ? value : content,
      ),
    })),
});

const useDiaryEditorStore = create<
  DiaryEditorState & DiaryEditorActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(diaryEditorStore)
    : diaryEditorStore,
);

export type useDiaryEditorStoreType = DiaryEditorState & DiaryEditorActions;

export default useDiaryEditorStore;

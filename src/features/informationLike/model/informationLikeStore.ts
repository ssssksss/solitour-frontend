import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

// 상태 인터페이스 정의
interface InformationLikeState {
  likeCount: number;
  isLike: boolean;
}

// 액션 인터페이스 정의
interface InformationLikeAction {
  initialize: () => void;
  setInformationLikeState: (data: Partial<InformationLikeState>) => void;
}

// 초기 상태 정의
const initialState: InformationLikeState = {
  likeCount: 0,
  isLike: false,
};

type InformationLikeStoreType = InformationLikeState & InformationLikeAction;

// 상태 및 액션 생성
const informationLikeStore: StateCreator<InformationLikeStoreType> = (set) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setInformationLikeState: (data: Partial<InformationLikeState>) =>
    set(() => ({ ...data })),
});

export const useInformationLikeStore = create<InformationLikeStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(informationLikeStore) as StateCreator<InformationLikeStoreType>)
    : informationLikeStore,
);

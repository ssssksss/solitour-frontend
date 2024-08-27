import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

// 상태 인터페이스 정의
interface InformationLikeState {
  likeCount: number;
  isLiked: boolean;
}

// 액션 인터페이스 정의
interface InformationLikeActions {
  initialize: () => void;
  setInformationLike: (data: Partial<InformationLikeState>) => void;
}

// 초기 상태 정의
const initialState: InformationLikeState = {
  likeCount: 0,
  isLiked: false,
};

// 상태 및 액션 생성
const InformationLikeStore: StateCreator<
  InformationLikeState & InformationLikeActions
> = (set, get) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setInformationLike: (data: Partial<InformationLikeState>) =>
    set(() => ({ ...data })),
});

const useInformationLikeStore = create<
  InformationLikeState & InformationLikeActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(InformationLikeStore)
    : InformationLikeStore,
);

export type useInformationLikeStoreType = InformationLikeState &
  InformationLikeActions;

export default useInformationLikeStore;

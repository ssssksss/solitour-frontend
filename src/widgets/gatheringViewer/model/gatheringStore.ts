import { gatheringApplicantsResponse } from "@/entities/gathering";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface GatheringState {
  currentParticipants: number;
  gatheringApplicantsResponses: gatheringApplicantsResponse[];
  isFinish: boolean;
  deadline: string | null;
  personCount: number;
}

// 2. 액션 인터페이스 정의
interface GatheringAction {
  initialize: () => void;
  setGatheringState: (data: Partial<GatheringState>) => void;
}

// 3. 초기 상태 정의
const initialState: GatheringState = {
  currentParticipants: 0,
  gatheringApplicantsResponses: [],
  isFinish: false,
  personCount: 0,
  deadline: null,
};

type GatheringStoreType = GatheringState & GatheringAction;

// 4. 상태 및 액션 생성
const gatheringStore: StateCreator<GatheringStoreType> = (set) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      currentParticipants: 0,
      gatheringApplicantsResponses: [],
    }),
  setGatheringState: (data) =>
    set(() => ({
      ...data,
    })),
});

export const useGatheringStore = create<GatheringStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(gatheringStore) as StateCreator<GatheringStoreType>)
    : gatheringStore,
);

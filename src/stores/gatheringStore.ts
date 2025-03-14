import { gatheringApplicantsResponsesDto } from "@/entities/gathering/model/GatheringDto";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface GatheringState {
  currentParticipants: number;
  gatheringApplicantsResponses: gatheringApplicantsResponsesDto[];
  isFinish: boolean;
  deadline: string | null;
  personCount: number;
}

// 2. 액션 인터페이스 정의
interface GatheringActions {
  initialize: () => void;
  setGathering: (data: Partial<GatheringState>) => void;
}

// 3. 초기 상태 정의
const initialState: GatheringState = {
  currentParticipants: 0,
  gatheringApplicantsResponses: [],
  isFinish: false,
  personCount: 0,
  deadline: null,
};

// 4. 상태 및 액션 생성
const gatheringStore: StateCreator<GatheringState & GatheringActions> = (
  set,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      currentParticipants: 0,
      gatheringApplicantsResponses: [],
    }),
  setGathering: (data) =>
    set(() => ({
      ...data,
    })),
});

const useGatheringStore = create<GatheringState & GatheringActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(gatheringStore)
    : gatheringStore,
);

export type useGatheringStoreType = GatheringState & GatheringActions;

export default useGatheringStore;

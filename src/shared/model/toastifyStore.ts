import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface ToastifyState {
  type: "success" | "error" | "warning" | "info" | "default";
  message: string;
}

// 2. 액션 인터페이스 정의
interface ToastifyAction {
  initialize: () => void;
  setToastifyState: (data: Partial<ToastifyState>) => void;
}

// 3. 초기 상태 정의
const initialState: ToastifyState = { type: "default", message: "" };

type ToastifyStoreType = ToastifyState & ToastifyAction;

// 4. 상태 및 액션 생성
const toastifyStore: StateCreator<ToastifyStoreType> = (set) => ({
  ...initialState,
  initialize: () => set({ ...initialState }),
  setToastifyState: (data) => set(() => ({ ...data })),
});

export const useToastifyStore = create<ToastifyStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(toastifyStore) as StateCreator<ToastifyStoreType>)
    : toastifyStore,
);

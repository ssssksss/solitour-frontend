import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface ToastifyStoreState {
  type: "success" | "error" | "warning" | "info" | "default";
  message: string;
}

// 2. 액션 인터페이스 정의
interface ToastifyStoreActions {
  initialize: () => void;
  setToastify: (data: Partial<ToastifyStoreState>) => void;
}

// 3. 초기 상태 정의
const initialState: ToastifyStoreState = { type: "success", message: "" };

type ToastifyStoreType = ToastifyStoreState & ToastifyStoreActions;

// 4. 상태 및 액션 생성
const toastifyStore: StateCreator<ToastifyStoreState & ToastifyStoreActions> = (
  set,
) => ({
  ...initialState,
  initialize: () => set({ ...initialState, type: "default", message: "" }),
  setToastify: (data) => set(() => ({ ...data })),
});

const useToastifyStore = create<ToastifyStoreState & ToastifyStoreActions>(
  process.env.NODE_ENV === "development"
    ? (devtools(toastifyStore) as StateCreator<ToastifyStoreType>)
    : toastifyStore,
);

export default useToastifyStore;

import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface AuthState {
  id: number;
  userStatus: string; // "활성화" | "휴먼" | "삭제" | "관리자" | "";
  nickname: string;
  name: string;
  age: number; // 연도
  sex: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: string;
}

// 2. 액션 인터페이스 정의
interface AuthActions {
  initialize: () => void;
  setUser: (data: Partial<AuthState>) => void;
}

// 3. 초기 상태 정의
const initialState: AuthState = {
  id: NaN,
  userStatus: "",
  nickname: "",
  name: "",
  age: 0,
  sex: "",
  email: "",
  phoneNumber: "",
  isAdmin: false,
  createdAt: "",
};

// 4. 상태 및 액션 생성
const authStore: StateCreator<AuthState & AuthActions> = (set, get) => ({
  ...initialState,
  initialize: () => set(initialState),
  setUser: (data) =>
    set(() => ({
      ...data,
    })),
});

const useAuthStore = create<AuthState & AuthActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(authStore) : authStore,
);

export type useAuthStoreType = AuthState & AuthActions;

export default useAuthStore;

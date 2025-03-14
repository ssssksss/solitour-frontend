import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface UserState {
  age: number; // 연도
  email: string;
  id: number;
  isAdmin: boolean;
  nickname: string;
  phoneNumber: string;
  sex: string; // "male, female"
  userImage: {
    id: number;
    address: string;
    createdDate: string; // "2024-07-12",
  };
  userStatus: string; // "활성화" | "휴먼" | "삭제" | "관리자" | "";
}

// 2. 액션 인터페이스 정의
interface UserAction {
  initialize: () => void;
  setUser: (data: Partial<UserState>) => void;
}

// 3. 초기 상태 정의
const initialState: UserState = {
  id: 0,
  userStatus: "",
  nickname: "",
  age: 0,
  sex: "",
  email: "",
  phoneNumber: "",
  isAdmin: false,
  userImage: {
    id: 0,
    address: "",
    createdDate: "",
  },
};

type UserStoreType = UserState & UserAction;

// 4. 상태 및 액션 생성
const userStore: StateCreator<UserStoreType> = (set) => ({
  ...initialState,
  initialize: () => set({ ...initialState, id: -1 }),
  setUser: (data) => set(() => ({ ...data })),
});

export const useUserStore = create<UserStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(userStore) as StateCreator<UserStoreType>)
    : userStore,
);

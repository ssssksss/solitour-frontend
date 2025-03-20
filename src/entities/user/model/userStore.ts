import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface UserState {
  id: number;
  userStatus: string;
  userImage: {
    id: number;
    address: string;
    createdDate: string;
  };
  nickname: string;
  age: number | null;
  sex: "male" | "female" | null;
  email: string;
  phoneNumber: string | null;
  isAdmin: boolean;
}

// 2. 액션 인터페이스 정의
interface UserAction {
  initialize: () => void;
  setUserState: (data: Partial<UserState>) => void;
}

// 3. 초기 상태 정의
const initialState: UserState = {
  id: 0,
  userStatus: "",
  userImage: {
    id: 0,
    address: "",
    createdDate: "",
  },
  nickname: "",
  age: 0,
  sex: null,
  email: "",
  phoneNumber: "",
  isAdmin: false,
};

type UserStoreType = UserState & UserAction;

// 4. 상태 및 액션 생성
const userStore: StateCreator<UserStoreType> = (set) => ({
  ...initialState,
  initialize: () => set({ ...initialState, id: -1 }),
  setUserState: (data) => set(() => ({ ...data })),
});

export const useUserStore = create<UserStoreType>(
  process.env.NODE_ENV === "development"
    ? (devtools(userStore) as StateCreator<UserStoreType>)
    : userStore,
);

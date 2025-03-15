export interface User {
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
  createdAt: Date;
  provider: string;
}

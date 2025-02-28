// Request 요청 결과 Dto
interface UserImage {
  id: number;
  address: string;
  createdDate: string;
}

export interface UserResponseDto {
  id: number;
  userStatus: string;
  userImage: UserImage;
  nickname: string;
  age: number;
  sex: string | null;
  email: string;
  provider: string;
  phoneNumber: string | null;
  createdAt: string;
  isAdmin: boolean;
}

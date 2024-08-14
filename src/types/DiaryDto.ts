/**
 * 일기 작성 요청 DTO
 */
export interface CreateDiaryRequestDto {
  userId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  address: string;
  diaryDays: {
    moodLevel: number;
    content: string;
  }[];
}

/**
 * 일기 작성 응답 DTO
 */
export interface CreateDiaryResponseDto {
  id: number;
}

/**
 * 일기 상세 조회 응답 DTO
 */
export interface GetDiaryResponseDto {
  diaryId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  address: string;
  diaryDays: {
    moodLevel: number;
    content: string;
  }[];
}

/**
 * 일기 목록 조회 응답 DTO
 */
export interface GetDiaryListResponseDto {
  diaryId: number;
  image: string;
  title: string;
  startDate: Date;
  endDate: Date;
  address: string;
  diaryDays: { moodLevel: number; content: string }[];
}

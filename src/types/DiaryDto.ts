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
 * 일기 조회 응답 DTO
 */
export interface GetDiaryResponseDto {
  title: string;
  startDate: Date;
  endDate: Date;
  address: string;
  moodLevels: number[];
  contents: string[];
}

// TODO: 수정 필요
// Request 요청 결과 DTO
export interface DiaryResponseDto {
  title: string;
  period: string;
  image: string;
  moodLevel: number;
  description: string;
}

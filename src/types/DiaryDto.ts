/**
 * 일기 작성 요청 Dto
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
 * 일기 작성 응답 Dto
 */
export interface CreateDiaryResponseDto {
  id: number;
}

// TODO: 수정 필요
// Request 요청 결과 Dto
export interface DiaryResponseDto {
  title: string;
  period: string;
  image: string;
  moodLevel: number;
  description: string;
}

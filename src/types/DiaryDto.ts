// Request 요청 Dto
export interface DiaryRequestDto {}

// Request 요청 결과 Dto
export interface DiaryResponseDto {
  title: string;
  period: string;
  image: string;
  moodLevel: number;
  description: string;
}

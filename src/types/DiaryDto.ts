/**
 * 일기 작성 요청 DTO
 */
export interface CreateDiaryRequestDto {
  title: string;
  titleImage: string;
  startDatetime: Date;
  endDatetime: Date;
  diaryDayRequests: {
    content: string;
    feelingStatus: string;
    place: string;
  }[];
}

/**
 * 일기 상세 조회 응답 DTO
 */
export interface GetDiaryResponseDto {
  diaryContentResponse: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDateTime: Date;
    diaryDayContentResponses: {
      content: string;
      feelingStatus: string;
      place: string;
    }[];
  };
}

/**
 * 일기 목록 조회 응답 DTO
 */
export interface GetDiaryListResponseDto {
  diaryContentResponse: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        place: string;
      }[];
    };
  }[];
}

/**
 * 일기 수정 요청 DTO
 */
export interface UpdateDiaryRequestDto {
  title: string;
  startDate: Date;
  endDate: Date;
  placeName: string;
  address: string;
  diaryDays: {
    moodLevel: number;
    content: string;
  }[];
}

/**
 * 일기 수정 응답 DTO
 */
export interface UpdateDiaryResponseDto {
  id: number;
}

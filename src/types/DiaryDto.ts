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
    diaryDayContentImages: string;
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
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        diaryDayContentImages: string;
        place: string;
      }[];
    };
  };
}

/**
 * 일기 목록 조회 응답 DTO
 */
export interface GetDiaryListResponseDto {
  content: {
    diaryId: number;
    title: string;
    titleImage: string;
    startDatetime: Date;
    endDatetime: Date;
    diaryDayContentResponses: {
      diaryDayContentDetail: {
        content: string;
        feelingStatus: string;
        contentImage: string;
        place: string;
      }[];
    };
  }[];
  page: {
    totalPages: number;
  };
}

/**
 * 일기 수정 요청 DTO
 */
export interface UpdateDiaryRequestDto {
  title: string;
  deleteTitleImage: string;
  saveTitleImage: string;
  startDatetime: Date;
  endDatetime: Date;
  diaryDayRequests: {
    content: string;
    feelingStatus: string;
    deleteImagesUrl: string;
    saveImagesUrl: string;
    place: string;
  }[];
}

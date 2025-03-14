export interface Diary {
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
}

export interface DiaryForm {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  address: string;
  image: string;
  moodLevels: number;
  contents: string;
}

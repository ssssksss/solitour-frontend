export interface GatheringRequestDto {}

export interface GatheringResponseDto {
  id: number;
  category: string;
  bookmark: boolean;
  title: string;
  username: string;
  date: Date;
  location: string;
  time: string;
  current: number;
  total: number;
  qualification: string;
  likes: number;
  views: number;
}

export interface TopGatheringResponseDto {
  id: number;
  title: string;
}

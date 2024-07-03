// Request 요청 Dto
export interface InformationRequestDto {
  userId: number;
  informationTitle: string;
  informationAddress: string;
  province: string;
  city: string;
  placeId: string;
  placeXAxis: string;
  placeYAxis: string;
  placeName: string;
  category: string;
  subCategory: string;
  thumbnailImage: File;
  contentImages?: File[];
  informationContent: string;
  hashtags: string[];
  tips: string[];
}

// Request 요청 결과 Dto
export interface InformationResponseDto {}

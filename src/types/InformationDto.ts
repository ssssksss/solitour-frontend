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
export interface InformationResponseDto {
  id: number;
  title: string;
  address: string;
  createdDate: Date;
  viewCount: number;
  content: string;
  tips: string[];
  userPostingResponse: {
    id: number;
    name: string;
  };
  tagResponses: Array<Readonly<{ id: number; name: string }>>;
  placeResponse: {
    id: number;
    searchId: string;
    name: string;
    xaxis: number;
    yaxis: number;
    address: string;
  };
  zoneCategoryResponse: {
    id: number;
    parentZoneCategory: {
      id: number;
      parentZoneCategory: string | null;
      name: string;
    };
    name: string;
  };
  imageResponses: Array<Readonly<{ imageStatus: string; address: string }>>;
}

export interface TopInformationResponseDto {
  id: number;
  title: string;
}

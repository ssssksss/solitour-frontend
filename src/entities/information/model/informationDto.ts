/**
 * 정보 등록 요청 DTO
 */
export interface InformationCreateRequestDto {
  informationTitle: string;
  informationAddress: string;
  informationContent: string;
  informationTips: string;
  placeRegisterRequest: {
    searchId: string;
    name: string;
    xAxis: string;
    yAxis: string;
    address: string;
  };
  categoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  thumbNailImageUrl: string;
  contentImagesUrl: string[];
  tagRegisterRequests: { name: string }[];
}

/**
 * 정보 수정 요청 DTO
 */
export interface InformationUpdateRequestDto {
  title: string;
  address: string;
  content: string;
  tips: string;
  placeModifyRequest: {
    searchId: string;
    name: string;
    xAxis: string;
    yAxis: string;
    address: string;
  };
  categoryId: number;
  zoneCategoryNameParent: string;
  zoneCategoryNameChild: string;
  newThumbNailUrl: { address: string } | null;
  newThumbNailFromContent: { address: string } | null;
  moveThumbNailToContent: { address: string } | null;
  newContentImagesUrl: { address: string }[];
  deleteImagesUrl: { address: string }[];
  tagRegisterRequests: { name: string }[];
}

/**
 * (정보 등록)/(정보 수정) 결과 DTO
 */
export interface InformationRegisterResponseDto {
  id: number;
}

/**
 * 정보 목록 조회 결과 DTO
 */
export interface InformationListResponseDto {
  content: {
    informationId: number;
    title: string;
    zoneCategoryParentName: string;
    zoneCategoryChildName: string;
    categoryName: string;
    viewCount: number;
    isBookMark: boolean;
    thumbNailImage: string;
    likeCount: number;
    isLike: boolean;
  }[];
  page: {
    totalPages: number;
  };
}

/**
 * 정보 상세 조회 결과 DTO
 */
export interface InformationDetailResponseDto {
  title: string;
  address: string;
  createdDate: Date;
  viewCount: number;
  content: string;
  tip: string;
  userPostingResponse: { id: number; nickname: string };
  tagResponses: { name: string }[];
  placeResponse: {
    searchId: number;
    name: string;
    xaxis: number;
    yaxis: number;
    address: string;
  };
  zoneCategoryResponse: {
    parentZoneCategory: {
      parentZoneCategory: null;
      name: string;
    };
    name: string;
  };
  categoryResponse: {
    id: number;
    parentCategory: {
      id: number;
      parentCategory: null;
      name: string;
    };
    name: string;
  };
  imageResponses: { imageStatus: string; address: string }[];
  likeCount: number;
  userImage: string;
  isLike: boolean;
  recommendInformation: {
    informationId: number;
    title: string;
    zoneCategoryParentName: string;
    zoneCategoryChildName: string;
    categoryName: string;
    viewCount: number;
    isBookMark: boolean;
    isLike: boolean;
    thumbNailImage: string;
    likeCount: number;
  }[];
}

/**
 * 정보 Top 5 조회 결과 DTO
 */
export interface TopInformationResponseDto {
  id: number;
  title: string;
}

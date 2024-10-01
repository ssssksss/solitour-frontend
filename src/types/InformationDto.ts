/**
 * 정보 등록 요청 DTO
 */
export interface CreateInformationRequestDto {
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
export interface UpdateInformationRequestDto {
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
  content: Array<{
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
  }>;
  page: {
    totalPages: number;
  };
}

/**
 * 정보 상세 조회 결과 DTO
 */
export interface InformationDetailDto {
  title: string;
  address: string;
  createdDate: Date;
  viewCount: number;
  content: string;
  tip: string;
  userPostingResponse: { id: number; nickname: string };
  tagResponses: Array<Readonly<{ name: string }>>;
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
  imageResponses: Array<Readonly<{ imageStatus: string; address: string }>>;
  likeCount: number;
  userImage: string;
  isLike: boolean;
  recommendInformation: Array<
    Readonly<{
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
    }>
  >;
}

/**
 * 정보 Top 5 조회 결과 DTO
 */
export interface TopInformationResponseDto {
  id: number;
  title: string;
}

/**
 * Best 여행 정보 조회 결과 DTO
 */
export interface BestInformationResponseDto {
  informationId: number; // 정보 아이디
  title: string; // 제목
  zoneCategoryParentName: string; // 부모 지역 카테고리 이름
  zoneCategoryChildName: string; // 자식 지역 카테고리 이름
  parentCategoryName: string; // 부모 카테고리 이름
  viewCount: number; // 조회수
  isBookMark: boolean; // 북마크 했는지 여부
  isLike: boolean;
  thumbNailImage: string; // 썸네일 이미지 주소
  likeCount: number; // 좋아요 수
}

/**
 * 정보 댓글 조회 결과 DTO
 */
export interface InformationCommentResponseDto {
  userImage: string;
  nickname: string;
  createdDate: Date;
  content: string;
}

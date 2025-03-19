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

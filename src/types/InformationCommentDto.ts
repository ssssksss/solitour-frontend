/**
 * @description 정보 댓글 등록 요청 DTO
 */
export interface CreateInformationCommentRequestDto {
  comment: string;
}

/**
 * @description 정보 댓글 수정 요청 DTO
 */
export interface UpdateInformationCommentRequestDto {
  comment: string;
}

/**
 * @description 정보 댓글 조회 DTO
 */
export interface InformationCommentResponseDto {
  commentId: number;
  userId: number;
  userNickname: string;
  userProfile: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @description 정보 댓글 목록 조회 DTO
 */
export interface InformationCommentListResponseDto {
  content: InformationCommentResponseDto[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

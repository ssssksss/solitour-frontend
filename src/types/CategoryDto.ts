/**
 * 카테고리 목록 조회 Dto
 */
export interface CategoryResponseDto {
  id: number;
  name: string;
  childrenCategories: Array<
    Readonly<{
      id: number;
      parentCategory: { id: number; parentCategory: null; name: string };
      name: string;
    }>
  >;
}

export interface GatheringCategory {
  id: number;
  name: string;
  childrenCategories: {
    id: number;
    parentCategory: { id: number; parentCategory: null; name: string };
    name: string;
  }[];
}

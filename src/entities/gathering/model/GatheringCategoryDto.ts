interface ParentCategory {
  id: number;
  parentCategory: ParentCategory | null;
  name: string;
}

interface ChildCategory {
  id: number;
  parentCategory: ParentCategory;
  name: string;
}

interface Category {
  id: number;
  name: string;
  childrenCategories: ChildCategory[];
}

export type GatheringCategoryListType = Category[];

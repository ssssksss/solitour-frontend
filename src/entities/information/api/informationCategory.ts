interface InformationCategory {
  id: number;
  name: string;
  childrenCategories: {
    id: number;
    parentCategory: { id: number; parentCategory: null; name: string };
    name: string;
  }[];
}

export async function getInformationCategoryList() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    next: { revalidate: 60, tags: ["informationCategoryList"] },
  });

  return response.json() as Promise<InformationCategory[]>;
}

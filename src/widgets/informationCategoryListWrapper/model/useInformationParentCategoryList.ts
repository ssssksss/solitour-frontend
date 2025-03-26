"use client";

export const useInformationParentCategoryList = () => {
  const handleParentCategoryClick = (parentCategoryId: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");
    url.searchParams.set("parentCategoryId", parentCategoryId.toString());
    url.searchParams.delete("childCategoryId");
    window.history.pushState(null, "", url.toString());
  };

  return { handleParentCategoryClick };
};

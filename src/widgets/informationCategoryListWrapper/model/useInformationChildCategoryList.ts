"use client";

export const useInformationChildCategoryList = () => {
  const handleChildCategoryClick = (childCategoryId: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");

    if (childCategoryId === 0) {
      url.searchParams.delete("childCategoryId");
    } else {
      url.searchParams.set("childCategoryId", childCategoryId.toString());
    }

    window.history.pushState(null, "", url.toString());
  };

  return { handleChildCategoryClick };
};

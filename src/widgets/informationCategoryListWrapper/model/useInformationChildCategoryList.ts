"use client";

import { useRouter } from "next/navigation";

export const useInformationChildCategoryList = () => {
  const router = useRouter();

  const handleChildCategoryClick = (childCategoryId: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");

    if (childCategoryId === 0) {
      url.searchParams.delete("childCategoryId");
    } else {
      url.searchParams.set("childCategoryId", childCategoryId.toString());
    }

    router.push(url.href, { scroll: false });
  };

  return { handleChildCategoryClick };
};

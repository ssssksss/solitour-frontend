"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useInformationFilterModal = (closeModal: () => void) => {
  const searchParams = useSearchParams();
  const parentCategoryId = searchParams.get("parentCategoryId");
  const childCategoryId = searchParams.get("childCategoryId");
  const [place, setPlace] = useState<string | null>(searchParams.get("place"));
  const order = searchParams.get("order") ?? "latest";
  const tagName = searchParams.get("tagName");
  const search = searchParams.get("search");
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(
      [
        `${pathname}?page=1&`,
        `parentCategoryId=${parentCategoryId}`,
        `${childCategoryId !== null ? `&childCategoryId=${childCategoryId}` : ""}`,
        `${place !== null ? `&place=${place}` : ""}`,
        `&order=${order}`,
        `${tagName !== null ? `&tagName=${tagName}` : ""}`,
        `${search !== null ? `&search=${search}` : ""}`,
      ].join(""),
      {
        scroll: false,
      },
    );
    closeModal();
  };

  return { place, setPlace, handleClick };
};

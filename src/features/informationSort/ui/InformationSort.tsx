"use client";

import { Dropdown } from "@/shared/ui/dropdown";
import { useInformationSort } from "../model/useInformationSort";

const OPTIONS = [
  {
    value: "",
    name: "최신순",
  },
  {
    value: "likes",
    name: "좋아요순",
  },
  {
    value: "views",
    name: "조회순",
  },
];

export const InformationSort = () => {
  const { sort, handleSortClick } = useInformationSort();

  return (
    <Dropdown
      options={OPTIONS}
      dropdownHandler={handleSortClick}
      value={sort}
      defaultValue={sort}
      dropdownContainerStyle={{
        w: "w-[3.5rem]",
        style: "",
      }}
      dropdownOptionStyle={{
        w: "w-[8rem]",
        style: "mt-[2rem] rounded-xl",
        transformX: "translateX(calc(3.5rem - 100%))",
      }}
    />
  );
};

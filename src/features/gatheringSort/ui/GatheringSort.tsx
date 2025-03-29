"use client";

import { Dropdown } from "@/shared/ui/dropdown";
import { useGatheringSort } from "../model/useGatheringSort";

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

export const GatheringSort = () => {
  const { sort, handleSortClick } = useGatheringSort();

  return (
    <Dropdown
      options={OPTIONS}
      dropdownHandler={handleSortClick}
      value={sort}
      defaultValue={sort}
      dropdownContainerStyle={{
        w: "w-14",
        style: "",
      }}
      dropdownOptionStyle={{
        w: "w-32",
        style: "mt-8 rounded-xl",
        transformX: "translateX(calc(3.5rem - 100%))",
      }}
    />
  );
};

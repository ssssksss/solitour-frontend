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
  const { loading, sort, handleSortClick } = useGatheringSort();

  if (loading) {
    return (
      <div className="relative flex h-[2rem] w-[3rem] shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );
  }

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

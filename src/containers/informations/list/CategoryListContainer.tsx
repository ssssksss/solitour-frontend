"use client";

import CategoryList from "@/components/informations/list/CategoryList";
import { useState } from "react";

interface Props {
  category: string;
  subCategory: string;
}

const CategoryListContainer = ({ category, subCategory }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <CategoryList
      category={category}
      subCategory={subCategory}
      isModal={isModal}
      closeModal={() => setIsModal(false)}
      openModal={() => setIsModal(true)}
    />
  );
};

export default CategoryListContainer;

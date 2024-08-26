"use client";

import ListTemplate from "@/components/home/ListTemplate";
import useDragScroll from "@/hooks/useDragScroll";

type MyProps = {
  titles: string[];
  description: string;
  children: React.ReactNode;
  category: "정보" | "모임";
};

const ListTemplateContainer = ({
  titles,
  description,
  children,
  category,
}: MyProps) => {
  const scrollHook = useDragScroll();
  const path = {
    정보: "/informations/list?page=1&parentCategoryId=1",
    모임: "/gathering",
  };

  return (
    <ListTemplate
      titles={titles}
      description={description}
      scrollHook={scrollHook}
      path={path[category]}
    >
      {children}
    </ListTemplate>
  );
};

export default ListTemplateContainer;

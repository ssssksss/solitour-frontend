"use client";

import ListTemplate from "@/components/home/ListTemplate";
import useDragScroll from "@/hooks/useDragScroll";

type MyProps = {
  titles: string[];
  description: string;
  children: React.ReactNode;
};

const ListTemplateContainer = ({ titles, description, children }: MyProps) => {
  const scrollHook = useDragScroll();

  return (
    <ListTemplate
      titles={titles}
      description={description}
      scrollHook={scrollHook}
    >
      {children}
    </ListTemplate>
  );
};

export default ListTemplateContainer;

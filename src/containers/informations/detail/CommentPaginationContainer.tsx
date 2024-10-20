"use client";

import CommentPagination from "@/components/informations/detail/CommentPagination";
import { useState } from "react";

const CommentPaginationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <CommentPagination
      currentPage={currentPage}
      leftPage={0}
      rightPage={1}
      totalPages={1}
      pageList={[1]}
    />
  );
};

export default CommentPaginationContainer;

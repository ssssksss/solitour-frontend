"use client";

import { Notice } from "@/entities/notice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSupportNoticeList = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const [loading, setLoading] = useState(true);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [viewedNoticeList, setViewedNoticeList] = useState<number[]>([]);

  const handleNoticeClick = (id: number) => {
    const viewedNotices = JSON.parse(
      localStorage.getItem("viewedNotices") || "[]",
    );
    if (!viewedNotices.includes(id)) {
      viewedNotices.push(id);
      localStorage.setItem("viewedNotices", JSON.stringify(viewedNotices));
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `/api/support/notice?page=${searchParams.get("page") ? Number(searchParams.get("page")) : 1}`,
      );
      const data = await response.json();
      setNoticeList(data.content);
      setLoading(false);
    })();

    setViewedNoticeList(
      JSON.parse(localStorage.getItem("viewedNotices") || "[]"),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    noticeList,
    totalNotices: noticeList.length,
    viewedNoticeList,
    currentPage,
    handleNoticeClick,
  };
};

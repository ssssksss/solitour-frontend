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

  const getNoticeList = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/support/notice?page=${page}`);
    const data = await response.json();
    setNoticeList(data.content);
    setLoading(false);
  };

  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    getNoticeList(page);
    window.history.pushState({}, "", url.toString());
  };

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
    getNoticeList(currentPage);
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
    pageHandler,
    handleNoticeClick,
  };
};

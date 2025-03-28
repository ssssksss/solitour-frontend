"use client";

import { getNoticeList, Notice } from "@/entities/notice";
import { useToastifyStore } from "@/shared/model";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSupportNoticeList = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [viewedNoticeList, setViewedNoticeList] = useState<number[]>([]);
  const { setToastifyState } = useToastifyStore();

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
      try {
        setLoading(true);

        const page = Number(searchParams.get("page"));
        if (page < 1 || !Number.isSafeInteger(page)) {
          setNoticeList([]);
          return;
        }

        const data = await getNoticeList(page);
        setNoticeList(data.content);
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "공지사항을 불러오는 데 실패했습니다.",
        });
      } finally {
        setLoading(false);
      }
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
    currentPage: Number(searchParams.get("page") ?? 1),
    handleNoticeClick,
  };
};

"use client"

import Pagination from "@/components/common/Pagination";
import SupportNoticeList from "@/components/support/SupportNoticeList";
import { NoticeType } from "@/types/NoticeDto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ISupportNoticeContainer {
}

const Skeleton = () => (
  <div className="flex w-full flex-col space-y-4 pb-8">
    {Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col gap-y-2 rounded-lg border border-gray-200 p-4 shadow-sm bg-gray-100 animate-pulse"
      >
        <div className="w-24 h-4 bg-gray-300 rounded-lg mb-2"></div>
        <div className="w-48 h-6 bg-gray-300 rounded-lg mb-2"></div>
        <div className="w-32 h-4 bg-gray-300 rounded-lg"></div>
      </div>
    ))}
  </div>
);

const SupportNoticeContainer = (props: ISupportNoticeContainer) => {

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const [elements, setElements] = useState<NoticeType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewedNotices, setViewedNotices] = useState([]);

  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    fetchNotice(page);
    window.history.pushState({}, "", url.toString());
  };

  const fetchNotice = async (page: number) => {
    setLoading(true);
    const response = await fetch(`/api/support/notice?page=${page}`);
    const data = await response.json();
    setElements(data.content);
    setTotalPages(data.page.totalPages);
    setLoading(false);
  };

  const onClickNotice = (id: number) => {
    const viewedNotices = JSON.parse(
      localStorage.getItem("viewedNotices") || "[]",
    );
    if (!viewedNotices.includes(id)) {
      viewedNotices.push(id);
      localStorage.setItem("viewedNotices", JSON.stringify(viewedNotices));
    }
  }

  useEffect(() => {
    fetchNotice(currentPage);
    setViewedNotices(JSON.parse(localStorage.getItem("viewedNotices") || "[]"));
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <SupportNoticeList
          data={elements}
          viewedNotices={viewedNotices}
          onClickNotice={onClickNotice}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageHandler={pageHandler}
      />
    </>
  );
};
export default SupportNoticeContainer

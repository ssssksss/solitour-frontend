"use client";

import Pagination from "@/components/common/Pagination";
import SupportNoticeList from "@/components/support/SupportNoticeList";
import { NoticeType } from "@/types/NoticeDto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ISupportNoticeContainer {}

const Skeleton = () => (
  <div className="flex w-full flex-col space-y-4 pb-8">
    {Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="flex animate-pulse flex-col gap-y-2 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm"
      >
        <div className="mb-2 h-4 w-24 rounded-lg bg-gray-300"></div>
        <div className="mb-2 h-6 w-48 rounded-lg bg-gray-300"></div>
        <div className="h-4 w-32 rounded-lg bg-gray-300"></div>
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
  const [totalElements, setTotalElements] = useState(0);

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
    setTotalElements(data.page.totalElements);
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
  };

  useEffect(() => {
    fetchNotice(currentPage);
    setViewedNotices(JSON.parse(localStorage.getItem("viewedNotices") || "[]"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          loading={loading}
          totalElements={totalElements}
          currentPage={currentPage}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 10)}
        pageHandler={pageHandler}
      />
    </>
  );
};
export default SupportNoticeContainer;

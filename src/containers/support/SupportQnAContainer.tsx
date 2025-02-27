import Pagination from "@/components/common/Pagination";
import SupportQnAList from "@/components/support/SupportQnAList";
import useAuthStore from "@/stores/authStore";
import { QnAListElementType } from "@/types/QnADto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SupportQnAContainer = () => {
  const [totalElements, setTotalElements] = useState(0);
  const [elements, setElements] = useState<QnAListElementType[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const authStore = useAuthStore();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    setCurrentPage(page);
    getQnAList(page);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  const getQnAList = async (page: number) => {
    if (isNaN(page) || page < 1) {
      // 페이지가 숫자가 아닌 경우, 에러 페이지로 이동
      window.location.href = "/error"; // 원하는 에러 페이지로 리다이렉트
      return;
    }

    const response = await fetchWithAuth(`/api/support/qna?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = await response.json();
    setTotalElements(data.page.totalElements);
    setElements(data.content);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getQnAList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col">
      <SupportQnAList
        elements={elements}
        loading={loading}
        userId={authStore.id}
      />
      {authStore.id > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.floor(totalElements / 10) + 1}
          pageHandler={pageHandler}
        />
      )}
    </div>
  );
};
export default SupportQnAContainer;

"use client";

import AddUserInformationForm from "@/components/auth/AddUserInformationForm";
import CategoryList from "@/components/common/CategoryList";
import { Modal } from "@/components/common/modal/Modal";
import Pagination from "@/components/common/Pagination";
import MyPageGatheringList from "@/components/mypage/MyPageGatheringList";
import useModalState from "@/hooks/useModalState";
import useAuthStore from "@/stores/authStore";
import { Gathering } from "@/types/GatheringDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// value 변경하지 말것 api주소와 연결되어있음
const categories = [
  {
    name: "내가 만든 모임",
    value: "host",
  },
  {
    name: "내가 신청한 모임",
    value: "applicant",
  },
  {
    name: "북마크",
    value: "bookmark",
  },
];

const MyPageGatheringContainer = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );
  const router = useRouter();
  const modalState = useModalState();
  const [elements, setElements] = useState<Gathering[]>([]);
  const authStore = useAuthStore();
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    window.history.pushState({}, "", url.toString());
  };
  const onClickCategoryHandler = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("page");
    params.set("category", value);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
    setActiveCategory(value);
    setCurrentPage(1);
  };

  const checkAccessGathering = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (authStore.id > 0 && (!authStore.sex || !authStore.age)) {
      e.preventDefault();
      modalState.openModal();
    }
    if (authStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const category = params.get("category") || "";
    setActiveCategory(category);

    if (searchParams.get("category") != category) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      const res = await fetchWithAuth(
        `/api/mypage/gathering?category=${category}&page=${currentPage - 1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        setElements([]);
        setTotalElements(0);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setElements(data.content);
      setTotalElements(data.page.totalElements);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams, currentPage]);

  return (
    <div className="w-full">
      <Modal modalState={modalState}>
        <AddUserInformationForm />
      </Modal>
      <CategoryList
        categories={categories}
        onClickHandler={onClickCategoryHandler}
        activeCategory={activeCategory}
      />
      <MyPageGatheringList
        elements={elements}
        isLoading={isLoading}
        checkAccessGathering={checkAccessGathering}
        isAccessGathering={
          !!authStore.sex && !!authStore.age && authStore.id > 0
        }
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 6)}
        pageHandler={pageHandler}
      />
    </div>
  );
};
export default MyPageGatheringContainer;

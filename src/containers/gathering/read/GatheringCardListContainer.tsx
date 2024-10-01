"use client";

import AddUserInformationForm from "@/components/auth/AddUserInformationForm";
import { Modal } from "@/components/common/modal/Modal";
import Pagination from "@/components/common/Pagination";
import GatheringCardList from "@/components/gathering/read/GatheringCardList";
import GatheringItemSkeleton from "@/components/skeleton/common/GatheringItemSkeleton";
import useModalState from "@/hooks/useModalState";
import useAuthStore from "@/store/authStore";
import { Gathering } from "@/types/GatheringDto";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SkeletonGatheringList = () => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <GatheringItemSkeleton key={index} />
      ))}
    </div>
  );
};

const GatheringCardListContainer = () => {
  const searchParams = useSearchParams();
  const [totalElements, setTotalElements] = useState(1);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const authStore = useAuthStore();
  const router = useRouter();
  const modalState = useModalState();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
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
    const temp = async () => {
      try {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // validateQueryParams(params); // 프론트에서 url 검증 용도

        // 페이지 숫자인지 여부와 1보다 큰지 여부
        let page = params.get("page");
        let pageNumber =
          isNaN(Number(page)) || Number(page) <= 1 ? 0 : Number(page) - 1;
        params.set("page", pageNumber + "");
        url.search = params.toString();

        const response = await fetch("/api/gathering" + url.search, {
          cache: "no-store",
        });

        if (!response.ok) {
          setElements([]);
          setTotalElements(0);
          setCurrentPage(0);
          router.push("/not-found");
          // throw new Error(response.statusText);
          return;
        }

        const data = await response.json();
        setElements(data.content);
        setTotalElements(data.page.totalElements);
        setCurrentPage(data.page.number + 1);
      } finally {
        setLoading(false);
      }
    };
    temp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <SkeletonGatheringList />
      ) : (
        <>
          <Modal
            modalState={modalState}
          >
            <AddUserInformationForm />
          </Modal>
          <GatheringCardList
            data={elements}
            checkAccessGathering={checkAccessGathering}
            isAccessGathering={
              !!authStore.sex && !!authStore.age && authStore.id > 0
            }
          />
          {elements.length != 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalElements / 12)}
              pageHandler={pageHandler}
            />
          )}
        </>
      )}
    </>
  );
};
export default GatheringCardListContainer;

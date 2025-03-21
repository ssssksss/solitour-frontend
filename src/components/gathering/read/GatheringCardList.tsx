"use client";

import GatheringItem from "../../common/GatheringItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { LottieNotFound } from "@/shared/ui/lottie";
import { useUserStore } from "@/entities/user";
import { useModalState } from "@/shared/lib/hooks";
import { Pagination } from "@/shared/ui/pagination";
import { GatheringItemSkeleton } from "@/features/gathering";
import { Gathering } from "@/entities/gathering/model/GatheringDto";
import { AddUserInformationForm } from "@/features/auth";

const SkeletonGatheringList = () => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <GatheringItemSkeleton key={index} />
      ))}
    </div>
  );
};

const GatheringCardList = () => {
  const searchParams = useSearchParams();
  const [totalElements, setTotalElements] = useState(1);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const userStore = useUserStore();
  const router = useRouter();
  const modalState = useModalState();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

  const checkAccessGathering = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (userStore.id > 0 && (!userStore.sex || !userStore.age)) {
      e.preventDefault();
      modalState.openModal();
    }
    if (userStore.id < 1) {
      e.preventDefault();
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    (async () => {
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
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div>
      {loading ? (
        <SkeletonGatheringList />
      ) : (
        <>
          <Modal modalState={modalState}>
            <AddUserInformationForm />
          </Modal>
          {elements.length == 0 ? (
            <div className={"flex w-full flex-col items-center"}>
              <LottieNotFound text="찾는 내용이 없습니다." />
            </div>
          ) : (
            <div
              onClick={(e) => checkAccessGathering(e)}
              className="mt-6 grid h-auto w-full justify-items-center gap-5 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3"
            >
              {elements?.map((i) => (
                <GatheringItem
                  key={i.gatheringId}
                  data={i}
                  isAccessGathering={
                    !!userStore.sex && !!userStore.age && userStore.id > 0
                  }
                />
              ))}
            </div>
          )}
          {elements.length != 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalElements / 12)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GatheringCardList;

"use client";

import {
  getInformationList,
  getInformationListByTagName,
  InformationList,
} from "@/entities/information";
import { useToastifyStore } from "@/shared/model";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useInformationList = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = Number(searchParams.get("page") ?? 1);
  const [informationList, setInformationList] =
    useState<InformationList | null>(null);
  const { setToastifyState } = useToastifyStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (currentPage < 1 || !Number.isSafeInteger(currentPage)) {
          setInformationList(null);
          return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set("page", (currentPage - 1).toString());

        if (searchParams.get("tagName")) {
          const data = await getInformationListByTagName(url.search);
          setInformationList(data);
        } else {
          const data = await getInformationList(url.search);
          setInformationList(data);
        }
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "정보 목록 조회에 실패했습니다.",
        });
        setInformationList(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return { loading, currentPage, informationList };
};

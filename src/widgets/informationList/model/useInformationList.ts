"use client";

import {
  getInformationList,
  getInformationListByTagName,
  InformationList,
} from "@/entities/information";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useInformationList = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [informationList, setInformationList] =
    useState<InformationList | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const page = Number(searchParams.get("page"));
        if (page < 1 || !Number.isSafeInteger(page)) {
          setInformationList(null);
          return;
        }
        setCurrentPage(page);

        const url = new URL(window.location.href);
        url.searchParams.set("page", (page - 1).toString());

        if (searchParams.get("tagName")) {
          const data = await getInformationListByTagName(url.search);
          setInformationList(data);
        } else {
          const data = await getInformationList(url.search);
          setInformationList(data);
        }
      } catch (error) {
        setInformationList(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  return { loading, currentPage, informationList };
};

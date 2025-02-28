"use client";

import sanitizeOption from "@/constants/common/sanitizeOption";
import {
  CreateInformationRequestDto,
  InformationRegisterResponseDto,
} from "@/types/InformationDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";
import useAuthStore from "@/stores/authStore";
import useEditorStore from "@/stores/editorStore";
import { useForm } from "react-hook-form";
import { InformationCreateFormSchema } from "@/lib/zod/schema/InformationCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useDragScroll from "@/hooks/useDragScroll";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import useModalBackHandler from "@/hooks/useModalBackHandler";

export const useInformationCreateEditor = () => {
  const imagesHook = useDragScroll();
  const { id } = useAuthStore();
  const editorStore = useEditorStore();
  const initialize = editorStore.initialize;
  const inputTagRef = useRef<HTMLInputElement>(null);
  const inputTipRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const methods = useForm<{
    userId: number;
    informationTitle: string;
    informationAddress: string;
    province: string;
    city: string;
    placeId: string;
    placeXAxis: string;
    placeYAxis: string;
    placeName: string;
    categoryId: number;
    categoryName: string;
    thumbnailImageUrl: string;
    contentImagesUrl: string[];
    informationContent: string;
    hashtags: string[];
    tips: string[];
  }>({
    resolver: zodResolver(InformationCreateFormSchema),
    defaultValues: {
      userId: id,
      informationTitle: "",
      informationAddress: "",
      province: "",
      city: "",
      placeId: "",
      placeXAxis: "",
      placeYAxis: "",
      placeName: "",
      categoryId: 0,
      categoryName: "",
      thumbnailImageUrl: "",
      contentImagesUrl: [""],
      informationContent: "",
      hashtags: [],
      tips: [],
    },
    mode: "onChange",
  });

  const openLocationModal = () => {
    methods.setValue("province", "");
    methods.setValue("city", "");
    methods.setValue("informationAddress", "");
    methods.setValue("placeId", "");
    methods.setValue("placeXAxis", "");
    methods.setValue("placeYAxis", "");
    methods.setValue("placeName", "");
    methods.watch();
    setLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    window.history.back();
    setLocationModalVisible(false);
  };

  const openCategoryModal = () => {
    methods.setValue("categoryId", 0);
    setCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    window.history.back();
    setCategoryModalVisible(false);
  };

  const handleHashTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const hashtag = inputTagRef.current?.value.trim() ?? "";
      if (hashtag.length < 2) {
        return;
      }

      const hashtags = methods.getValues("hashtags");
      if (!hashtags.includes(hashtag)) {
        hashtags.push(hashtag);
      }
      methods.setValue("hashtags", hashtags);
      methods.trigger("hashtags");
      (inputTagRef.current as HTMLInputElement).value = "";
    }
  };

  const handleTipChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tip = inputTipRef.current?.value.trim() ?? "";
      if (tip === "") {
        return;
      }

      const tips = methods.getValues("tips");
      tips.push(tip);
      methods.setValue("tips", tips);
      methods.trigger("tips");
      (inputTipRef.current as HTMLInputElement).value = "";
    }
  };

  const handleSubmit = async () => {
    if (editorStore.images.filter((image) => image !== "").length === 0) {
      alert("최소 한 장의 사진을 추가해 주세요.");
      return;
    }

    methods.setValue(
      "thumbnailImageUrl",
      editorStore.images[editorStore.mainImageIndex],
    );
    methods.setValue(
      "contentImagesUrl",
      editorStore.images.filter(
        (url, index) => index !== editorStore.mainImageIndex && url !== "",
      ),
    );

    await methods.trigger();
    if (!methods.formState.isValid) {
      methods.trigger();
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    const {
      informationTitle,
      informationAddress,
      informationContent,
      tips,
      placeId,
      placeName,
      placeXAxis,
      placeYAxis,
      categoryId,
      province,
      city,
      thumbnailImageUrl,
      contentImagesUrl,
      hashtags,
    } = methods.getValues();

    const data: CreateInformationRequestDto = {
      informationTitle: informationTitle,
      informationAddress: informationAddress,
      informationContent: sanitizeHtml(informationContent, sanitizeOption),
      informationTips: tips.join(";"),
      placeRegisterRequest: {
        searchId: placeId,
        name: placeName,
        xAxis: placeXAxis,
        yAxis: placeYAxis,
        address: informationAddress,
      },
      categoryId: categoryId,
      zoneCategoryNameParent: province,
      zoneCategoryNameChild: city,
      thumbNailImageUrl: thumbnailImageUrl,
      contentImagesUrl: contentImagesUrl,
      tagRegisterRequests: hashtags.map((tag) => ({ name: tag })),
    };

    setLoading(true);

    const response = await fetchWithAuth("/api/informations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 등록에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    const result: InformationRegisterResponseDto = await response.json();
    router.push(`/informations/${result.id}`);
    router.refresh();
  };

  usePreventBodyScroll(locationModalVisible);
  usePreventBodyScroll(categoryModalVisible);
  useModalBackHandler(locationModalVisible, () =>
    setLocationModalVisible(false),
  );
  useModalBackHandler(categoryModalVisible, () =>
    setCategoryModalVisible(false),
  );

  // 로그인을 하지 않은 사용자의 경우 로그인 페이지로 리다이렉트.
  // 로그아웃 시 로그인 페이지로 이동.
  useEffect(() => {
    if (id === -1) {
      router.replace("/auth/signin");
    }
  }, [id, router]);

  useEffect(() => {
    // 아래 코드는 tips이 제대로 입력되지 않는 목적의 코드입니다.
    // 해당 코드가 없는 경우 한글 입력 시 한 글자만 입력되는 오류가 발생합니다.
    methods.setValue("tips", []);
    methods.watch();

    return () => {
      initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    text: "등록",
    methods,
    imagesHook,
    loading,
    locationModalVisible,
    categoryModalVisible,
    inputTagRef,
    inputTipRef,
    editorStore,
    openLocationModal,
    closeLocationModal,
    openCategoryModal,
    closeCategoryModal,
    handleHashTagChange,
    handleTipChange,
    handleSubmit,
  };
};

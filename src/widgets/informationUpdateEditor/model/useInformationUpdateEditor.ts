"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sanitizeHtml from "sanitize-html";
import { useModalBackHandler, usePreventBodyScroll } from "@/shared/lib/hooks";
import { SANITIZE_OPTION } from "@/shared/config";
import { useUserStore } from "@/entities/user";
import {
  InformationDetailResponse,
  InformationRegisterResponseDto,
  InformationUpdateRequestDto,
} from "@/entities/information";
import {
  InformationUpdateFormSchema,
  useInformationEditorStore,
} from "@/features/informationEditor";
import { fetchWithAuth } from "@/shared/api";

export const useInformationUpdateEditor = (
  informationId: number,
  data: InformationDetailResponse,
) => {
  const { id } = useUserStore();
  const { imageList, mainImageIndex, initialize, setInformationEditorState } =
    useInformationEditorStore();
  const inputTagRef = useRef<HTMLInputElement>(null);
  const inputTipRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState("");
  const [originalContentUrl, setOriginalContentUrl] = useState<string[]>([]);
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
    newThumbNailUrl: string | null;
    newThumbNailFromContent: string | null;
    moveThumbNailToContent: string | null;
    newContentImagesUrl: string[];
    deleteImagesUrl: string[];
    informationContent: string;
    hashtags: string[];
    tips: string[];
  }>({
    resolver: zodResolver(InformationUpdateFormSchema),
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
      newThumbNailUrl: null,
      newThumbNailFromContent: null,
      moveThumbNailToContent: null,
      newContentImagesUrl: Array<string>(0),
      deleteImagesUrl: Array<string>(0),
      informationContent: "",
      hashtags: Array<string>(0),
      tips: [""],
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
    if (imageList.filter((image) => image !== "").length === 0) {
      alert("최소 한 장의 사진을 추가해 주세요.");
      return;
    }

    const thumbnailUrl = imageList[mainImageIndex];
    const contentUrl = imageList.filter(
      (imageUrl, index) => index !== mainImageIndex && imageUrl !== "",
    );

    // 썸네일 이미지가 변경되지 않은 경우
    if (originalThumbnailUrl === thumbnailUrl) {
      methods.setValue("newThumbNailUrl", null);
      methods.setValue("newThumbNailFromContent", null);
      methods.setValue("moveThumbNailToContent", null);
    } else {
      // 기존 본문 이미지가 썸네일 이미지로 변경되는 경우
      if (originalContentUrl.includes(thumbnailUrl)) {
        methods.setValue("newThumbNailUrl", null);
        methods.setValue("newThumbNailFromContent", thumbnailUrl);
      }
      // 새로운 썸네일 이미지를 사용하는 경우
      else {
        methods.setValue("newThumbNailUrl", thumbnailUrl);
        methods.setValue("newThumbNailFromContent", null);
      }

      // 기존 썸네일 이미지가 본문으로 이동하는 경우
      if (contentUrl.includes(originalThumbnailUrl)) {
        methods.setValue("moveThumbNailToContent", originalThumbnailUrl);
      }
      // 기존 썸네일 이미지를 삭제하는 경우
      else {
        methods.setValue("moveThumbNailToContent", null);
      }
    }

    // 새로운 본문 이미지 등록
    methods.setValue(
      "newContentImagesUrl",
      contentUrl.filter(
        (url) =>
          url !== originalThumbnailUrl && !originalContentUrl.includes(url),
      ),
    );

    // 삭제할 이미지 등록
    methods.setValue(
      "deleteImagesUrl",
      [originalThumbnailUrl, ...originalContentUrl].filter(
        (url) => url !== thumbnailUrl && !contentUrl.includes(url),
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
      newThumbNailUrl,
      newThumbNailFromContent,
      moveThumbNailToContent,
      newContentImagesUrl,
      deleteImagesUrl,
      hashtags,
    } = methods.getValues();

    const data: InformationUpdateRequestDto = {
      title: informationTitle,
      address: informationAddress,
      content: sanitizeHtml(informationContent, SANITIZE_OPTION),
      tips: tips.join(";"),
      placeModifyRequest: {
        searchId: placeId,
        name: placeName,
        xAxis: placeXAxis,
        yAxis: placeYAxis,
        address: informationAddress,
      },
      categoryId: categoryId,
      zoneCategoryNameParent: province,
      zoneCategoryNameChild: city,
      newThumbNailUrl:
        newThumbNailUrl === null ? null : { address: newThumbNailUrl },
      newThumbNailFromContent:
        newThumbNailFromContent === null
          ? null
          : { address: newThumbNailFromContent },
      moveThumbNailToContent:
        moveThumbNailToContent === null
          ? null
          : { address: moveThumbNailToContent },
      newContentImagesUrl: newContentImagesUrl.map((url) => ({ address: url })),
      deleteImagesUrl: deleteImagesUrl.map((url) => ({ address: url })),
      tagRegisterRequests: hashtags.map((tag) => ({
        name: tag,
      })),
    };

    setLoading(true);

    const response = await fetchWithAuth(`/api/informations/${informationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 수정에 실패하였습니다.");
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

  // 수정 페이지에 들어왔을 때 수정할 정보 글 데이터를 가져옴.
  // 화면에서 벗어났을 때 form값을 모두 초기화함.
  useEffect(() => {
    methods.setValue("informationTitle", data.title);
    methods.setValue("informationAddress", data.address);
    methods.setValue(
      "province",
      data.zoneCategoryResponse.parentZoneCategory.name,
    );
    methods.setValue("city", data.zoneCategoryResponse.name);
    methods.setValue("placeId", data.placeResponse.searchId.toString());
    methods.setValue("placeXAxis", data.placeResponse.xaxis.toString());
    methods.setValue("placeYAxis", data.placeResponse.yaxis.toString());
    methods.setValue("placeName", data.placeResponse.name);
    methods.setValue("categoryId", data.categoryResponse.id);
    methods.setValue(
      "categoryName",
      `${data.categoryResponse.parentCategory.name} - ${data.categoryResponse.name}`,
    );
    methods.setValue("informationContent", data.content);
    methods.setValue(
      "hashtags",
      data.tagResponses.map((tag) => tag.name),
    );
    methods.setValue("tips", data.tip.split(";"));
    methods.trigger();

    setInformationEditorState({
      imageList: [...data.imageResponses.map((value) => value.address), ""],
      mainImageIndex: data.imageResponses.findIndex(
        (value) => value.imageStatus === "썸네일",
      ),
    });

    setOriginalThumbnailUrl(
      data.imageResponses.find((value) => value.imageStatus === "썸네일")
        ?.address ?? "",
    );
    setOriginalContentUrl(
      data.imageResponses
        .filter((value) => value.imageStatus !== "썸네일")
        .map((value) => value.address),
    );

    return () => {
      initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialize]);

  return {
    methods,
    loading,
    locationModalVisible,
    categoryModalVisible,
    inputTagRef,
    inputTipRef,
    openLocationModal,
    closeLocationModal,
    openCategoryModal,
    closeCategoryModal,
    handleHashTagChange,
    handleTipChange,
    handleSubmit,
  };
};

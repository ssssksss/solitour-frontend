"use client";

import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SANITIZE_OPTION } from "@/shared/config";
import { useUserStore } from "@/entities/user";
import {
  createInformation,
  InformationCreateRequest,
} from "@/entities/information";
import { useInformationEditorStore } from "@/features/informationEditor";
import { InformationCreateFormSchema } from "./InformationCreateFormSchema";
import { useToastifyStore } from "@/shared/model";

export const useInformationCreateEditor = () => {
  const { id } = useUserStore();
  const { setToastifyState } = useToastifyStore();
  const { imageList, mainImageIndex, initialize } = useInformationEditorStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (imageList.filter((image) => image !== "").length === 0) {
      alert("최소 한 장의 사진을 추가해 주세요.");
      return;
    }

    methods.setValue("thumbnailImageUrl", imageList[mainImageIndex]);
    methods.setValue(
      "contentImagesUrl",
      imageList.filter(
        (imageUrl, index) => index !== mainImageIndex && imageUrl !== "",
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

    const data: InformationCreateRequest = {
      informationTitle: informationTitle,
      informationAddress: informationAddress,
      informationContent: sanitizeHtml(informationContent, SANITIZE_OPTION),
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

    try {
      setLoading(true);
      const response = await createInformation(data);
      router.replace(`/informations/${response.id}`);
    } catch (error) {
      setToastifyState({ type: "error", message: "정보 등록에 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // 로그인을 하지 않은 사용자의 경우 로그인 페이지로 리다이렉트.
  // 로그아웃 시 로그인 페이지로 이동.
  useEffect(() => {
    if (id === -1) {
      router.replace("/auth/signin");
    }
  }, [id, router]);

  useEffect(() => {
    // 아래 코드는 tips이 제대로 입력되지 않는 문제 방지 목적의 코드입니다.
    // 해당 코드가 없는 경우 한글 입력 시 한 글자만 입력되는 오류가 발생합니다.
    methods.setValue("tips", []);
    methods.watch();

    return () => {
      initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    methods,
    loading,
    handleSubmit,
  };
};

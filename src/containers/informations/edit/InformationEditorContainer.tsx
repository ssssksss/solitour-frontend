"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useDragScroll from "@/hooks/useDragScroll";
import { InformationCreateFormSchema } from "@/lib/zod/schema/InformationCreateFormSchema";
import useAuthStore from "@/store/authStore";
import useEditorStore from "@/store/editorStore";
import {
  InformationDetailDto,
  InformationRegisterResponseDto,
} from "@/types/InformationDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  informationId: number;
  data: InformationDetailDto;
}

const InformationEditorContainer = ({ informationId, data }: Props) => {
  const imagesHook = useDragScroll();
  const hashtagsHook = useDragScroll();
  const { id } = useAuthStore();
  const editorStore = useEditorStore();
  const initialize = editorStore.initialize;
  const [hashtag, setHashtag] = useState<string>("");
  const router = useRouter();

  // 장소 선택 모달창이 보이는지 여부
  const [locationModal, setLocationModal] = useState<boolean>(false);

  // 카테고리 선택 모달창이 보이는지 여부
  const [categoryModal, setCategoryModal] = useState<boolean>(false);

  const showLocationModal = () => {
    editorStore.resetPlaceInfo();
    setLocationModal(true);
  };

  const closeLocationModal = () => {
    setLocationModal(false);
  };

  const showCategoryModal = () => {
    editorStore.setEditor({ categoryId: 0 });
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const onSubmit = async () => {
    // Validate from fields using Zod
    const validatedFields = InformationCreateFormSchema.safeParse({
      userId: id,
      informationTitle: editorStore.title,
      informationAddress: editorStore.address,
      province: editorStore.province,
      city: editorStore.city,
      placeId: editorStore.placeId,
      placeXAxis: editorStore.placeXAxis,
      placeYAxis: editorStore.placeYAxis,
      placeName: editorStore.placeName,
      categoryId: editorStore.categoryId,
      thumbnailImage: editorStore.imageFiles[editorStore.mainImageIndex],
      contentImages: editorStore.imageFiles.filter(
        (_value, index) => index !== editorStore.mainImageIndex,
      ),
      informationContent: editorStore.content,
      hashtags: editorStore.hashtags,
      tips: editorStore.tips,
    });

    // If validation fails, return errors early. Otherwise, continue;
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            informationTitle: validatedFields.data.informationTitle,
            informationAddress: validatedFields.data.informationAddress,
            informationContent: validatedFields.data.informationContent,
            informationTips: validatedFields.data.tips.join(";"),
            userId: id,
            placeRegisterRequest: {
              searchId: validatedFields.data.placeId,
              name: validatedFields.data.placeName,
              xAxis: validatedFields.data.placeXAxis,
              yAxis: validatedFields.data.placeYAxis,
              address: validatedFields.data.informationAddress,
            },
            categoryId: validatedFields.data.categoryId,
            zoneCategoryNameParent: validatedFields.data.province,
            zoneCategoryNameChild: validatedFields.data.city,
            tagRegisterRequests: validatedFields.data.hashtags.map((tag) => ({
              name: tag,
            })),
          }),
        ],
        {
          type: "application/json",
        },
      ),
    );
    formData.append("thumbNailImage", validatedFields.data.thumbnailImage);
    validatedFields.data.contentImages?.forEach((contentImage) => {
      formData.append("contentImages", contentImage);
    });

    const response = await fetch(`/api/informations/${informationId}`, {
      method: "PUT",
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      alert("정보 수정에 실패하였습니다.");
      throw new Error(response.statusText);
    }

    const result: InformationRegisterResponseDto = await response.json();
    router.push(`/informations/${result.id}`);
    router.refresh();

    alert("정보 수정 작업 중");
  };

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
    editorStore.setEditor({
      title: data.title,
      address: data.address,
      province: data.zoneCategoryResponse.parentZoneCategory.name,
      city: data.zoneCategoryResponse.name,
      placeId: data.placeResponse.searchId.toString(),
      placeName: data.placeResponse.name,
      placeXAxis: data.placeResponse.xaxis.toString(),
      placeYAxis: data.placeResponse.yaxis.toString(),
      categoryId: 0,
      categoryName: "",
      images: [...data.imageResponses.map((value) => value.address), ""],
      imageFiles: [],
      mainImageIndex: data.imageResponses.findIndex(
        (value) => value.imageStatus === "썸네일",
      ),
      content: data.content,
      hashtags: data.tagResponses.map((value) => value.name),
      tips: data.tip.split(";"),
    });

    return () => {
      initialize();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialize]);

  return (
    <InformationEditor
      pathname="수정"
      editorStore={editorStore}
      locationModal={locationModal}
      categoryModal={categoryModal}
      hashtag={hashtag}
      imagesHook={imagesHook}
      hashtagsHook={hashtagsHook}
      onSubmit={onSubmit}
      showLocationModal={showLocationModal}
      closeLocationModal={closeLocationModal}
      showCategoryModal={showCategoryModal}
      closeCategoryModal={closeCategoryModal}
      setHashtag={setHashtag}
    />
  );
};

export default InformationEditorContainer;

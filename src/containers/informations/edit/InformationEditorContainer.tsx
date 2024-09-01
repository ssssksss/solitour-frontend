"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import useDragScroll from "@/hooks/useDragScroll";
import { InformationUpdateFormSchema } from "@/lib/zod/schema/InformationUpdateFormSchema";
import useAuthStore from "@/store/authStore";
import useEditorStore from "@/store/editorStore";
import {
  InformationDetailDto,
  InformationRegisterResponseDto,
  UpdateInformationRequestDto,
} from "@/types/InformationDto";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";

interface Props {
  informationId: number;
  data: InformationDetailDto;
}

const InformationEditorContainer = ({ informationId, data }: Props) => {
  const imagesHook = useDragScroll();
  const { id } = useAuthStore();
  const editorStore = useEditorStore();
  const initialize = editorStore.initialize;
  const inputTagRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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

  const onChangeHashTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const hashtag = inputTagRef.current?.value ?? "";
      if (hashtag === "") {
        return;
      }

      editorStore.addHashtag(hashtag);
      (inputTagRef.current as HTMLInputElement).value = "";
    }
  };

  const onSubmit = async () => {
    // Validate from fields using Zod
    const validatedFields = InformationUpdateFormSchema.safeParse({
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
      deleteImages: editorStore.deletedImages,
      thumbnailImageUrl: editorStore.images[editorStore.mainImageIndex],
      contentImagesUrl: editorStore.images.filter(
        (url, index) => index !== editorStore.mainImageIndex && url !== "",
      ),
      informationContent: sanitizeHtml(editorStore.content, sanitizeOption),
      hashtags: editorStore.hashtags,
      tips: editorStore.tips,
    });

    // If validation fails, return errors early. Otherwise, continue;
    if (!validatedFields.success) {
      console.log(validatedFields.error.issues);
      alert(validatedFields.error.issues[0].message);
      return;
    }

    const data: UpdateInformationRequestDto = {
      title: validatedFields.data.informationTitle,
      address: validatedFields.data.informationAddress,
      content: validatedFields.data.informationContent,
      tips: validatedFields.data.tips.join(";"),
      placeModifyRequest: {
        searchId: validatedFields.data.placeId,
        name: validatedFields.data.placeName,
        xAxis: validatedFields.data.placeXAxis,
        yAxis: validatedFields.data.placeYAxis,
        address: validatedFields.data.informationAddress,
      },
      categoryId: validatedFields.data.categoryId,
      zoneCategoryNameParent: validatedFields.data.province,
      zoneCategoryNameChild: validatedFields.data.city,
      deleteImages: validatedFields.data.deleteImages.map((deletedImage) => ({
        address: deletedImage,
      })),
      thumbNailUrl: validatedFields.data.thumbnailImageUrl,
      contentImagesUrl: validatedFields.data.contentImagesUrl,
      tagRegisterRequests: validatedFields.data.hashtags.map((tag) => ({
        name: tag,
      })),
    };

    setLoading(true);

    const response = await fetch(`/api/informations/${informationId}`, {
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
      deletedImages: [],
      images: [...data.imageResponses.map((value) => value.address), ""],
      mainImageIndex: data.imageResponses.findIndex(
        (value) => value.imageStatus === "썸네일",
      ),
      content: data.content,
      contentLength: data.content.length, // TODO
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
      inputTagRef={inputTagRef}
      imagesHook={imagesHook}
      loading={loading}
      onSubmit={onSubmit}
      showLocationModal={showLocationModal}
      closeLocationModal={closeLocationModal}
      showCategoryModal={showCategoryModal}
      closeCategoryModal={closeCategoryModal}
      onChangeHashTagHandler={onChangeHashTagHandler}
    />
  );
};

export default InformationEditorContainer;

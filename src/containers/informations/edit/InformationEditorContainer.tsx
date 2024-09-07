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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
  const [originalThumbnailUrl, setOriginalThumbnailUrl] = useState<string>("");
  const [originalContentUrl, setOriginalContentUrl] = useState<string[]>([]);

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
    contentLength: number;
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
      contentLength: 0,
      hashtags: Array<string>(0),
      tips: [""],
    },
    mode: "onChange",
  });

  // 장소 선택 모달창이 보이는지 여부
  const [locationModal, setLocationModal] = useState<boolean>(false);

  // 카테고리 선택 모달창이 보이는지 여부
  const [categoryModal, setCategoryModal] = useState<boolean>(false);

  const showLocationModal = () => {
    methods.setValue("province", "");
    methods.setValue("city", "");
    methods.setValue("informationAddress", "");
    methods.setValue("placeId", "");
    methods.setValue("placeXAxis", "");
    methods.setValue("placeYAxis", "");
    methods.setValue("placeName", "");
    methods.watch();
    setLocationModal(true);
  };

  const closeLocationModal = () => {
    setLocationModal(false);
  };

  const showCategoryModal = () => {
    methods.setValue("categoryId", 0);
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const onChangeHashTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const onSubmit = async () => {
    if (editorStore.images.filter((image) => image !== "").length === 0) {
      alert("최소 한 장의 사진을 추가해 주세요.");
      return;
    }

    const thumbnailUrl = editorStore.images[editorStore.mainImageIndex];
    const contentUrl = editorStore.images.filter(
      (url, index) => index !== editorStore.mainImageIndex && url !== "",
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

    const data: UpdateInformationRequestDto = {
      title: informationTitle,
      address: informationAddress,
      content: informationContent,
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
    methods.setValue("informationContent", data.content);
    methods.setValue(
      "hashtags",
      data.tagResponses.map((tag) => tag.name),
    );
    methods.setValue("tips", data.tip.split(";"));
    methods.watch();

    editorStore.setEditor({
      images: [...data.imageResponses.map((value) => value.address), ""],
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

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};

export default InformationEditorContainer;

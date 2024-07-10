"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useDragScroll from "@/hooks/useDragScroll";
import { InformationCreateFormSchema } from "@/lib/zod/schema/InformationCreateFormSchema";
import useEditorStore from "@/store/editorStore";
import { useEffect, useState } from "react";

interface Props {
  id: number;
}

const InformationEditorContainer = ({ id }: Props) => {
  const imagesHook = useDragScroll();
  const hashtagsHook = useDragScroll();
  const editorStore = useEditorStore();
  const initialize = editorStore.initialize;
  const [hashtag, setHashtag] = useState<string>("");

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
    editorStore.resetCategoryInfo();
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const onSubmit = async () => {
    // Validate from fields using Zod
    const validatedFields = InformationCreateFormSchema.safeParse({
      userId: 1, // TODO: 실제 로그인 정보 입력할 것.
      informationTitle: editorStore.title,
      informationAddress: editorStore.address,
      province: editorStore.province,
      city: editorStore.city,
      placeId: editorStore.placeId,
      placeXAxis: editorStore.placeXAxis,
      placeYAxis: editorStore.placeYAxis,
      placeName: editorStore.placeName,
      category: editorStore.category,
      subCategory: editorStore.subCategory,
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
    formData.append("userId", validatedFields.data.userId.toString());
    formData.append("informationTitle", validatedFields.data.informationTitle);
    formData.append(
      "informationAddress",
      validatedFields.data.informationAddress,
    );
    formData.append("province", validatedFields.data.province);
    formData.append("city", validatedFields.data.city);
    formData.append("placeId", validatedFields.data.placeId);
    formData.append("placeXAxis", validatedFields.data.placeXAxis);
    formData.append("placeYAxis", validatedFields.data.placeYAxis);
    formData.append("placeName", validatedFields.data.placeName);
    formData.append("category", validatedFields.data.category);
    formData.append("subCategory", validatedFields.data.subCategory);
    formData.append("thumbnailImage", validatedFields.data.thumbnailImage);
    validatedFields.data.contentImages?.forEach((contentImage) => {
      formData.append("contentImages", contentImage);
    });
    formData.append(
      "informationContent",
      validatedFields.data.informationContent,
    );
    validatedFields.data.hashtags.forEach((hashtag) => {
      formData.append("hashtags", hashtag);
    });
    validatedFields.data.tips.forEach((tip) => {
      formData.append("informationTips", tip);
    });

    // headers: {
    //   "Content-Type": "multipart/form-data"
    // }
    // 위의 코드를 빼야 정상적으로 작동함.
    const response = await fetch(`/api/informations/${id}`, {
      method: "PUT",
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to update data.");
    }

    alert("테스트 성공");
    return;
  };

  // 페이지에 들어왔을 때 수정할 정보 글 데이터를 가져옴.
  useEffect(() => {
    const getInformation = async (id: number) => {
      const response = await fetch(`/api/informations/${id}`, {
        method: "GET",
        cache: "force-cache",
        next: { tags: [`getInformation/${id}`] },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();

      console.log(data);
      console.log(data.informationTitle);

      // TODO: 수정 필요
      editorStore.title = data.informationTitle;
      editorStore.content = data.informationContent;
      setHashtag("테스트 태그");
    };

    getInformation(id);
  }, [editorStore, id]);

  // 화면에서 벗어났을 때 form값을 모두 초기화함.
  useEffect(() => {
    return () => {
      initialize();
    };
  }, [initialize]);

  return (
    <InformationEditor
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

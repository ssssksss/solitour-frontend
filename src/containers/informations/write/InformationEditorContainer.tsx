"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useDragScroll from "@/hooks/useDragScroll";
import useEditorStore from "@/store/editorStore";
import { useEffect, useRef, useState } from "react";

const InformationEditorContainer = () => {
  const { resetPlaceInfo } = useEditorStore();
  const imagesHook = useDragScroll();
  const hashtagsHook = useDragScroll();

  // 장소 선택 모달창이 보이는지 여부
  const [locationModal, setLocationModal] = useState<boolean>(false);

  // 카테고리 선택 모달창이 보이는지 여부
  const [categoryModal, setCategoryModal] = useState<boolean>(false);

  const [hashtag, setHashtag] = useState<string>("");

  const showLocationModal = () => {
    resetPlaceInfo();
    setLocationModal(true);
  };

  const closeLocationModal = () => {
    setLocationModal(false);
  };

  const showCategoryModal = () => {
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const onSubmit = () => {
    alert("Submit");
  };

  const editorStore = useEditorStore();
  const initialize = editorStore.initialize;

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

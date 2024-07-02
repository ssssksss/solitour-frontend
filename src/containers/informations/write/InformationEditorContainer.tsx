"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useDragScroll from "@/hooks/useDragScroll";
import useEditorStore from "@/store/editorStore";
import { useEffect, useState } from "react";

const InformationEditorContainer = () => {
  const { resetPlaceInfo, resetCategoryInfo } = useEditorStore();
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
    resetPlaceInfo();
    setLocationModal(true);
  };

  const closeLocationModal = () => {
    setLocationModal(false);
  };

  const showCategoryModal = () => {
    resetCategoryInfo();
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const onSubmit = async () => {
    if (editorStore.title === "") {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (editorStore.placeName === "") {
      alert("장소를 입력해 주세요");
      return;
    }

    if (editorStore.category === "") {
      alert("카테고리를 선택해 주세요.");
      return;
    }

    if (editorStore.imageFiles.length === 0) {
      alert("최소 1장의 사진을 추가해 주세요.");
      return;
    }

    if (editorStore.content === "") {
      alert("내용을 입력해 주세요.");
      return;
    }

    if (editorStore.hashtags.length === 0) {
      alert("최소 하나의 해시태그를 입력해 주세요.");
      return;
    }

    if (editorStore.tips.filter((value) => value !== "").length === 0) {
      alert("최소 하나의 Tip을 입력해 주세요.");
      return;
    }

    editorStore.write();
    /*
    const response = await fetch("http://localhost:3000/api/informations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "1111" }),
      cache: "no-store",
    });

    const data = await response.json();
    alert(data);
    */
  };

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

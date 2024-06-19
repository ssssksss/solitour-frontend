"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useEditorStore from "@/store/editorStore";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

const InformationEditorContainer = () => {
  const listRef = useRef<HTMLDivElement>(null);

  // 장소 선택 모달창이 보이는지 여부
  const [locationModal, setLocationModal] = useState<boolean>(false);

  // 카테고리 선택 모달창이 보이는지 여부
  const [categoryModal, setCategoryModal] = useState<boolean>(false);

  const [hashtag, setHashtag] = useState<string>("");

  // element를 드래그하고 있는지 여부
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 드래그 시작 시점의 스크롤 포지션이 포함된 x축 좌표값
  const [totalX, setTotalX] = useState<number>(0);

  const showLocationModal = () => {
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

  // 마우스 드래그 시작
  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const x = e.clientX;
    if (listRef.current && "scrollLeft" in listRef.current) {
      setTotalX(x + listRef.current.scrollLeft);
    }
  };

  // 마우스 드래그 동작 중
  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) {
      return;
    }

    const scrollLeft = totalX - e.clientX;
    if (listRef.current && "scrollLeft" in listRef.current) {
      // 스크롤 발생
      listRef.current.scrollLeft = scrollLeft;
    }
  };

  // 마우스 드래그 종료
  const onDragEnd = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) {
      return;
    }

    if (!listRef.current) {
      return;
    }

    setIsDragging(false);
  };

  // 터치 드래그 시작
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const x = e.touches[0].pageX;
    if (listRef.current && "scrollLeft" in listRef.current) {
      setTotalX(x + listRef.current.scrollLeft);
    }
  };

  // 터치 드래그 동작 중
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) {
      return;
    }

    const scrollLeft = totalX - e.touches[0].pageX;
    if (listRef.current && "scrollLeft" in listRef.current) {
      // 스크롤 발생
      listRef.current.scrollLeft = scrollLeft;
    }
  };

  // 터치 드래그 종료
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) {
      return;
    }

    if (!listRef.current) {
      return;
    }

    setIsDragging(false);
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
      listRef={listRef}
      hashtag={hashtag}
      onSubmit={onSubmit}
      showLocationModal={showLocationModal}
      closeLocationModal={closeLocationModal}
      showCategoryModal={showCategoryModal}
      closeCategoryModal={closeCategoryModal}
      setHashtag={setHashtag}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    />
  );
};

export default InformationEditorContainer;

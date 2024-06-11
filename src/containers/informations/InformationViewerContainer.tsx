"use client";

import InformationViewer from "@/components/informations/InformationViewer";
import { MouseEvent, TouchEvent, useRef, useState } from "react";

type MyProps = {
  category: string;
  id: number;
};

const InformationViewerContainer = ({ category, id }: MyProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  // element를 드래그하고 있는지 여부 확인
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 드래그 시작 시점의 스크롤 포지션이 포함된 x축 좌표값
  const [totalX, setTotalX] = useState<number>(0);

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

  const onChangeImage = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <InformationViewer
      category={category}
      id={id}
      listRef={listRef}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      mainImageIndex={mainImageIndex}
      setMainImageIndex={setMainImageIndex}
    />
  );
};

export default InformationViewerContainer;

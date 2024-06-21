'use client'

import MyProfile from "@/components/mypage/MyProfile";
import { ChangeEvent, useRef, useState } from "react";

const MyProfileContainer = () => {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("/");

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const file = e.dataTransfer.files?.[0];
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
    setIsDragging(false);
  };
  const onChangeImageUploadInputHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
  };

  // TODO : 디폴트 이미지로 돌아가는 방법에 대해서도 코드 작성이 필요하다. 나중에 서버에 이미지 업로드 될 때 같이 변경해서 변경할 예정

  return (
    <MyProfile
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      imageUploadRef={imageUploadRef}
      imageUrl={imageUrl}
      onChangeImageUploadInputHandler={onChangeImageUploadInputHandler}
    />
  );
};
export default MyProfileContainer;

"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { useState } from "react";

const DiaryEditorContainer = () => {
  const [placeModal, setPlaceModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const onChange = (value: string) => {
    setContent(value);
  };

  return (
    <DiaryEditor
      content={content}
      placeModal={placeModal}
      onChange={onChange}
      showPlaceModal={() => setPlaceModal(true)}
      closePlaceModal={() => setPlaceModal(false)}
    />
  );
};

export default DiaryEditorContainer;

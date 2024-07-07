"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import { useState } from "react";

const DiaryEditorContainer = () => {
  const [content, setContent] = useState<string>("");

  const onChange = (value: string) => {
    setContent(value);
  };

  return <DiaryEditor content={content} onChange={onChange} />;
};

export default DiaryEditorContainer;

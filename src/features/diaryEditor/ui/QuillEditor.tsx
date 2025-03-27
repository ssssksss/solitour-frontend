"use client";

import "react-quill-new/dist/quill.snow.css";
import "./quillEditor.css";
import ReactQuill from "react-quill-new";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { useQuillEditor } from "../model/useQuillEditor";
import { useFormContext } from "react-hook-form";

export const QuillEditor = () => {
  const formContext = useFormContext();
  const { loading, quillRef, modules, content } = useQuillEditor();

  return (
    <div className="relative flex flex-col">
      <HashSpinner loading={loading} />
      <ReactQuill
        className="quillEditor"
        ref={quillRef}
        theme="snow"
        placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
        onChange={(value) => formContext.setValue("contents", value)}
        defaultValue={content}
        modules={modules}
      />
    </div>
  );
};

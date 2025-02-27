"use client";

import "react-quill-new/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import ReactQuill from "react-quill-new";
import HashSpinner from "@/components/common/HashSpinner";
import { useQuillEditor } from "@/hooks/diary/useQuillEditor";

const QuillEditor = () => {
  const { loading, quillRef, modules, content, handleContentChange } =
    useQuillEditor();

  return (
    <div className="relative flex flex-col">
      <HashSpinner loading={loading} />
      <ReactQuill
        className="quillEditor"
        ref={quillRef}
        theme="snow"
        placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
        onChange={handleContentChange}
        value={content}
        modules={modules}
      />
    </div>
  );
};

export default QuillEditor;

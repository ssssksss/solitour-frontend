"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import QuillEditorSkeleton from "@/components/skeleton/diary/write/QuillEditorSkeleton";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

// react-quill은 서버 사이드 렌더링을 지원하지 않기 때문에
// 클라이언트 사이드에서 모듈을 불러오도록 설정한다.
// 이를 통해 "document is not found" 에러를 방지할 수 있다.
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <QuillEditorSkeleton />,
});

const QuillEditor = ({ content, onChange }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
      onChange={(value) => onChange(value)}
      value={content}
      modules={{
        // 더 많은 옵션은 다음 링크를 참고할 것.
        // https://quilljs.com/docs/modules/toolbar
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }, { font: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["bold", "italic", "underline", "strike"],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["blockquote", "code-block", "link", "image", "video"],
        ],
      }}
    />
  );
};

export default QuillEditor;

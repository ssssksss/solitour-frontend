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
const ReactQuill = dynamic(
  async () => {
    const { ImageResize } = await import("quill-image-resize-module-ts");
    const { default: RQ } = await import("react-quill");
    RQ.Quill.register("modules/imageResize", ImageResize);
    return RQ;
  },
  {
    ssr: false,
    loading: () => <QuillEditorSkeleton />,
  },
);

const QuillEditor = ({ content, onChange }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
      onChange={(value, delta, source, editor) => {
        // 사용자 입력에 대해 한 번만 업데이트되도록 제한
        // Notice: 현재 키보드 입력 시 source가 "user"인 업데이트와 source가 "api"인 업데이트가 연속으로
        //         이루어지고 있습니다. 해당 문제를 해결하기 위해 source가 "user"인 업데이트만 적용되도록
        //         제한하였습니다.
        if (source === "user") {
          console.log(value);
          onChange(value);
        }
      }}
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
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
          handleStyles: {
            backgroundColor: "#00B488",
            border: "none",
            // other camelCase styles for size display
          },
        },
      }}
    />
  );
};

export default QuillEditor;

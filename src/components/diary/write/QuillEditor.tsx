import "react-quill/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import ReactQuill from "react-quill";
import { RefObject } from "react";

interface Props {
  quillRef: RefObject<ReactQuill>;
  modules: {};
  content: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({ quillRef, modules, content, onChange }: Props) => {
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
      onChange={(value, delta, source, editor) => {
        // 사용자 입력에 대해 한 번만 업데이트되도록 제한
        // Notice: 현재 키보드 입력 시 source가 "user"인 업데이트와 source가 "api"인 업데이트가 연속으로
        //         이루어지고 있습니다. 해당 문제를 해결하기 위해 source가 "user"인 업데이트만 적용되도록
        //         제한하였습니다.
        if (source === "user") {
          onChange(value);
        }
      }}
      value={content}
      modules={modules}
    />
  );
};

export default QuillEditor;

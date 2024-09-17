import "react-quill/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import ReactQuill from "react-quill";
import { RefObject } from "react";
import HashSpinner from "@/components/common/HashSpinner";

interface Props {
  loading: boolean;
  quillRef: RefObject<ReactQuill>;
  modules: {};
  content: string;
  onChange: (value: string) => void;
}

const QuillEditor = ({
  loading,
  quillRef,
  modules,
  content,
  onChange,
}: Props) => {
  return (
    <div className="relative flex flex-col">
      <HashSpinner loading={loading} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
        onChange={(value) => onChange(value)}
        value={content}
        modules={modules}
      />
    </div>
  );
};

export default QuillEditor;

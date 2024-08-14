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
      onChange={(value) => onChange(value)}
      value={content}
      modules={modules}
    />
  );
};

export default QuillEditor;

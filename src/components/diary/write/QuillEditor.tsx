import "react-quill/dist/quill.snow.css";
import "@/styles/quillEditor.css";
import ReactQuill from "react-quill";
import { RefObject } from "react";
import HashSpinner from "@/components/common/HashSpinner";
import { FaRegImage } from "react-icons/fa6";

interface Props {
  loading: boolean;
  quillRef: RefObject<ReactQuill>;
  modules: {};
  content: string;
  onChange: (value: string) => void;
  temp: number;
}

const QuillEditor = ({
  loading,
  quillRef,
  modules,
  content,
  onChange,
  temp,
}: Props) => {
  return (
    <div className="relative flex flex-col">
      <HashSpinner loading={loading} />
      <div className="-mb-2 mt-8 flex flex-row items-center gap-2 text-sm font-medium text-gray1">
        <FaRegImage />
        <p>Day1에 최소 1장의 이미지를 등록해 주세요.</p>
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="여행은 어땠나요? 자유롭게 기록하고 싶은 것들을 작성해보세요."
        onChange={(value, delta, source, editor) => {
          // TODO
          console.log(`day: ${temp}`);
          console.log(value);
          console.log(delta);
          console.log(source);
          console.log(editor);

          if (source === "api" && value === "<p><br></p>") {
            return;
          }
          onChange(value);
        }}
        value={content}
        modules={modules}
      />
    </div>
  );
};

export default QuillEditor;

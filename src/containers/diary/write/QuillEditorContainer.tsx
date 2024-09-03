"use client";

import QuillEditor from "@/components/diary/write/QuillEditor";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";

const QuillEditorContainer = () => {
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const quillRef = useRef<ReactQuill>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formContext = useFormContext();

  const imageHandler = () => {
    // Step 1. 이미지 파일을 첨부할 수 있는 input을 생성합니다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // Step 2. 이미지 핸들러 실행 시, input 클릭 이벤트를 발생시킵니다.
    input.click();

    // Step 3. change 이벤트가 발생했을 때의 이미지 처리 로직을 적용합니다.
    input.addEventListener("change", async () => {
      if (input.files && quillRef.current) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("id", authStore.id.toString());
        formData.append("image", file);
        formData.append("type", "DIARY");

        setLoading(true);

        const response = await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
          cache: "no-store",
        });

        setLoading(false);

        if (!response.ok) {
          alert("이미지 처리 중 오류가 발생하였습니다.");
          throw new Error(response.statusText);
        }

        const result: { fileUrl: string } = await response.json();
        const url = result.fileUrl;

        const Image = Quill.import("formats/image");
        Image.sanitize = (url: string) => url;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        if (range) {
          editor.insertEmbed(range.index, "image", url);
          editor.setSelection(range.index + 1, 1);
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      // 더 많은 옵션은 다음 링크를 참고할 것.
      // https://quilljs.com/docs/modules/toolbar
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }, { font: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["bold", "italic", "underline", "strike"],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image", "video"],
        ],
        handlers: { image: imageHandler },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuillEditor
      loading={loading}
      quillRef={quillRef}
      modules={modules}
      content={
        formContext.getValues("contents")[diaryEditorStore.currentDay - 1]
      }
      onChange={(value: string) => {
        const contents: string[] = formContext.getValues("contents");
        contents[diaryEditorStore.currentDay - 1] = value;
        formContext.setValue("contents", contents);
        formContext.trigger();
      }}
    />
  );
};

export default QuillEditorContainer;

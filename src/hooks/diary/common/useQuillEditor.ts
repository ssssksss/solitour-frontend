"use client";

import useAuthStore from "@/stores/authStore";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill-new";
import { ImageResize } from "quill-image-resize-module-ts";
import ImageDropAndPaste, { ImageData } from "quill-image-drop-and-paste";

export const useQuillEditor = () => {
  const authStore = useAuthStore();
  const quillRef = useRef<ReactQuill>(null);
  const [loading, setLoading] = useState(false);
  const formContext = useFormContext();

  const handleContentChange = (value: string) => {
    formContext.setValue("contents", value);
    formContext.trigger("contents");
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("id", authStore.id.toString());
    formData.append("image", file);
    formData.append("type", "DIARY");

    setLoading(true);

    const response = await fetchWithAuth("/api/image/upload", {
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

    const Image: any = Quill.import("formats/image");
    Image.sanitize = (url: string) => url;

    const editor = quillRef.current!.getEditor();
    const range = editor.getSelection();

    if (range) {
      editor.insertEmbed(range.index, "image", url);
      editor.setSelection(range.index + 1, 1);

      // 이미지가 DOM에 추가된 후 이미지에 스타일을 적용하기 위해 setTimeout을 사용합니다.
      setTimeout(() => {
        const imageElement = document.querySelector(`img[src="${url}"]`);
        if (imageElement) {
          (imageElement as HTMLElement).style.borderRadius = "1rem";
          handleContentChange(quillRef.current!.getEditorContents().toString());
        }
      }, 100);
    }
  };

  const imageHandler = () => {
    // Step 1. 이미지 파일을 첨부할 수 있는 input을 생성합니다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    // Step 2. 이미지 핸들러 실행 시, input 클릭 이벤트를 발생시킵니다.
    input.click();

    // Step 3. change 이벤트가 발생했을 때의 이미지 처리 로직을 적용합니다.
    input.addEventListener("change", () => {
      if (input.files && quillRef.current) {
        const file = input.files[0];
        uploadImage(file);
      }
    });
  };

  /**
   *
   * @param imageDataUrl image's dataURL
   * @param type image's mime type
   * @param imageData provided more functions to handle the image
   * - imageData.toBlob() {function} - convert image to a BLOB Object
   * - imageData.toFile(filename?: string) {function} - convert image to a File Object. filename is optional, it will generate a random name if the original image didn't have a name.
   * - imageData.minify(options) {function)- minify the image, return a promise
   *   - options.maxWidth {number} - specify the max width of the image, default is 800
   *   - options.maxHeight {number} - specify the max height of the image, default is 800
   *   - options.quality {number} - specify the quality of the image, default is 0.8
   */
  const imageDropAndPasteHandler = async (
    imageDataUrl: string,
    type: string,
    imageData: ImageData,
  ) => {
    const file = imageData.toFile();
    if (file && quillRef.current) {
      uploadImage(file);
    }
  };

  const modules = useMemo(() => {
    ReactQuill.Quill.register("modules/imageResize", ImageResize);
    ReactQuill.Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);

    return {
      // 더 많은 옵션은 다음 링크를 참고할 것.
      // https://quilljs.com/docs/modules/toolbar
      toolbar: {
        container: [
          [{ color: [] }, { background: [] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image", "video"],
        ],
        handlers: { image: imageHandler },
      },
      imageResize: {
        modules: ["Resize", "DisplaySize", "Toolbar"],
        handleStyles: {
          backgroundColor: "#00B488",
          border: "none",
          // other camelCase styles for size display
        },
      },
      imageDropAndPaste: {
        // add an custom image handler
        handler: imageDropAndPasteHandler,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".quillEditor")
        ?.querySelectorAll("img")
        .forEach((img) => {
          img.style.borderRadius = "1rem";
        });
      handleContentChange(quillRef.current!.getEditorContents().toString());
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    quillRef,
    modules,
    content: formContext.getValues("content"),
    handleContentChange,
  };
};

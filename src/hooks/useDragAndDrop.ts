import { ChangeEvent, useCallback, useState } from "react";

interface UseDragAndDropProps {
  imageUpload: (imageDataUrl: string) => void;
}
export const useDragAndDrop = ({ imageUpload }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const onDropOrInputEvent = async (
    e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
  ) => {
    let file;
    if ("target" in e && e.target instanceof HTMLInputElement) {
      file = e.target.files?.[0];
    }

    if ("dataTransfer" in e) {
      e.preventDefault();
      e.stopPropagation();
      file = e.dataTransfer.files?.[0];
    }
    if (!file) {
      alert("파일이 없습니다!");
      return;
      }
    const imageDataUrl = await readFile(file);
    imageUpload(imageDataUrl);
    if ("target" in e && e.target instanceof HTMLInputElement) {
          e.target.value = ""
    }
    setIsDragging(false);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  return {
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
  };
};



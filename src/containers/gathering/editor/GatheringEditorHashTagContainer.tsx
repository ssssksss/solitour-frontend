import GatheringEditorHashTag from "@/components/gathering/editor/GatheringEditorHashTag";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const GatheringEditorHashTagContainer = () => {
  const formContext = useFormContext();
  const [tags, setTags] = useState<string[]>([]);
  const inputTagRef = useRef<HTMLInputElement>(null);

  // 태그 클릭해서 지울 때
  const deleteTagHandler = (tagName: string) => {
    setTags((prev) => prev.filter((i: string) => i !== tagName));
  };

  // 태그 입력시 ,나 Enter로 태그블록 만들어 주는 기능
  const onChangeHashTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tempTag = (inputTagRef.current as HTMLInputElement).value
        .replace(/,$/, "")
        .trim();
      if (tempTag === "") return;
      setTags((prev) => Array.from(new Set([...prev, tempTag])));
      (inputTagRef.current as HTMLInputElement).value = "";
      formContext.setValue("hashtags", Array.from(new Set([...tags, tempTag])));
      formContext.trigger("hashtags");
    }
  };

  return (
    <>
      <GatheringEditorHashTag
        onChangeHashTagHandler={onChangeHashTagHandler}
        deleteTagHandler={deleteTagHandler}
        tags={tags}
        inputTagRef={inputTagRef}
      />
    </>
  );
};

export default GatheringEditorHashTagContainer;

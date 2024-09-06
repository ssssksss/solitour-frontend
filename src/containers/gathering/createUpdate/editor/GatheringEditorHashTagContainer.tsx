import GatheringEditorHashTag from "@/components/gathering/createUpdate/editor/GatheringEditorHashTag";
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
const onChangeHashTagHandler = (
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.MouseEvent<HTMLButtonElement>,
) => {
  // Enter 키가 눌렸을 때의 처리
  if ("key" in e && e.key === "Enter") {
    const tempTag = (inputTagRef.current as HTMLInputElement).value
      .replace(/,$/, "")
      .trim();
    if (tempTag === "") return;
    setTags((prev) => Array.from(new Set([...prev, tempTag])));
    (inputTagRef.current as HTMLInputElement).value = "";
    formContext.setValue("hashtags", Array.from(new Set([...tags, tempTag])));
    formContext.trigger("hashtags");
  }

  // 특정 버튼이 클릭되었을 때의 처리
  if ("type" in e && e.type === "click") {
    // 예: 특정 버튼의 id가 'addTagButton'인 경우
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

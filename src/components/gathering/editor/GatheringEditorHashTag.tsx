import ItemTag from "@/components/informations/common/ItemTag";

interface IGatheringEditorHashTag {
  onChangeHashTagHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteTagHandler: (tag: string) => void;
  tags: string[];
  inputTagRef: React.RefObject<HTMLInputElement>;
}
const GatheringEditorHashTag = ({
  onChangeHashTagHandler,
  deleteTagHandler,
  tags, 
  inputTagRef,
}: IGatheringEditorHashTag) => {
  return (
    <article className={"flex w-full flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem] max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-y-3"}>
        <div className={"relative flex-shrink-0"}>
          <span className={"w-[3.5rem] text-lg font-semibold"}>해시태그</span>
        </div>
        <div className="relative w-full">
        <input
          placeholder="엔터를 입력하면 태그로 추가됩니다. 태그 클릭시 제거"
          className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          onKeyUp={onChangeHashTagHandler}
          onKeyDown={(e) => {
            if (tags.length > 10) {
              e.preventDefault();
            }
            if (
              e.key === " " ||
              e.key === "#" ||
              (inputTagRef.current as HTMLInputElement).value.length >= 15
            ) {
              e.preventDefault();
            }
          }}
          ref={inputTagRef}
          />
          {
            tags.length > 9 &&
            <div className="absolute b-0 text-sm text-red-600 pl-4"> 해시태그는 최대 10개입니다. </div>
          }
          </div>
      </div>
      <div className="flex min-h-8 flex-row flex-wrap items-center gap-1">
        {tags.map((i) => (
          <ItemTag
            key={i}
            tag={i}
            borderColor="border-main"
            textColor="text-main"
            removable={true}
            onClick={() => deleteTagHandler(i)}
            cursorPointer={true}
          />
        ))}
      </div>
    </article>
  );
};
export default GatheringEditorHashTag
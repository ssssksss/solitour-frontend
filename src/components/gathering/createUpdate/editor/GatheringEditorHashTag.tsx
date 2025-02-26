import ItemTag from "@/components/informations/common/ItemTag";

interface IGatheringEditorHashTag {
  onChangeHashTagHandler: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  deleteTagHandler: (tag: string) => void;
  tags: string[];
  inputTagRef: React.RefObject<HTMLInputElement | null>;
}
const GatheringEditorHashTag = ({
  onChangeHashTagHandler,
  deleteTagHandler,
  tags,
  inputTagRef,
}: IGatheringEditorHashTag) => {
  return (
    <article className={"flex w-full flex-col gap-[2rem]"}>
      <div
        className={
          "flex w-full items-center gap-x-[0.625rem] max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-y-3"
        }
      >
        <div
          className={"relative w-[2.75rem] flex-shrink-0 text-lg font-semibold"}
        >
          태그
        </div>
        <div className="relative w-full">
          <input
            placeholder="태그로 키워드를 써보세요! (2 ~ 15자)"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] pr-[3rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]" // 오른쪽 padding 추가
            onKeyUp={onChangeHashTagHandler}
            disabled={tags.length > 9}
            maxLength={15}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "#") {
                e.preventDefault();
              }
            }}
            ref={inputTagRef}
          />
          {tags.length > 9 && (
            <div className="b-0 absolute pl-4 text-sm text-red-600">
              해시태그는 최대 10개입니다.
            </div>
          )}
          {/* <button
            onClick={(e) => onChangeHashTagHandler(e)}
            className="absolute right-[0.75rem] top-[50%] translate-y-[-50%] rounded-full bg-main px-3 py-1 text-white"
          >
            버튼
          </button> */}
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
export default GatheringEditorHashTag;

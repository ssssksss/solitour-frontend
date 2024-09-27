import { useFormContext } from "react-hook-form";
import { v4 as uuid } from "uuid";

interface IGatheringContent {
  onChangeInputTagHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteTagHandler: (tag: string) => void;
  tags: string[]; // Add this prop
  inputTagRef: React.RefObject<HTMLInputElement>; // Add this prop
}

const GatheringContent = ({
  onChangeInputTagHandler,
  deleteTagHandler,
  tags, // Add this prop
  inputTagRef, // Add this prop
}: IGatheringContent) => {
  const formContext = useFormContext();

  return (
    <>
      <article className={"flex flex-col gap-[2rem]"}>
        <div className={"flex w-full items-center gap-x-[2rem]"}>
          <div className={"relative w-[7rem] flex-shrink-0"}>
            <span className={"w-[3.5rem] text-lg font-semibold"}>제목</span>
            <span className="absolute top-[-.5rem] text-lg text-main">*</span>
          </div>
          <input
            placeholder="제목을 입력하세요"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            {...formContext.register("title")}
          />
        </div>
        <textarea
          className={
            "min-h-[17.5rem] resize-none rounded-[1rem] p-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
          placeholder={
            "어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          }
          {...formContext.register("content")}
          onChange={(e) => {
            formContext.setValue("content", e.target.value);
            formContext.trigger("content");
          }}
          maxLength={500}
        />
        <div className={"flex w-full justify-end"}>
          <span
            className={`${formContext.getValues("content").length >= 500 && "text-red-600"}`}
          >
            {formContext.getValues("content").length} / 500
          </span>
        </div>
      </article>
      <article className={"flex flex-col gap-[2rem]"}>
        <div className={"flex w-full items-center gap-x-[2rem]"}>
          <div className={"relative w-[7rem] flex-shrink-0"}>
            <span className={"w-[3.5rem] text-lg font-semibold"}>해시태그</span>
          </div>
          <input
            placeholder="#해시태그로 키워드를 써보세요!"
            className="h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            onKeyUp={onChangeInputTagHandler}
            onKeyDown={(e) => {
              if (
                e.key === "#" ||
                (inputTagRef.current as HTMLInputElement).value.length >= 15
              ) {
                e.preventDefault();
              }
            }}
            ref={inputTagRef}
          />
        </div>
        <div>
          <span className="px-2 text-sm text-gray-400">
            (엔터를 입력하면 태그로 추가됩니다. 태그 클릭시 제거)
          </span>
        </div>
        <div
          className={
            "flex min-h-[5rem] flex-wrap gap-[.25rem] rounded-[1rem] p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
        >
          {tags.map((tag) => (
            <button
              key={uuid()}
              className={
                "flex h-[3rem] min-w-[5rem] items-center justify-center gap-[.125rem] rounded-lg bg-main px-1 text-white"
              }
              onClick={() => deleteTagHandler(tag)}
            >
              <span> # </span>
              <span> {tag} </span>
            </button>
          ))}
        </div>
      </article>
    </>
  );
};

export default GatheringContent;

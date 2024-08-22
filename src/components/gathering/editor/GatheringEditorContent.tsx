import { useFormContext } from "react-hook-form";

interface IGatheringEditorContent {

}
const GatheringEditorContent = (props: IGatheringEditorContent) => {
  const formContext = useFormContext();
  return (
    <article className={"flex w-full flex-col gap-[2rem]"}>
      <div className="w-full relative">
        <textarea
          className={
            "min-h-[17.5rem] w-full resize-none rounded-[1rem] p-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
          placeholder={
            "어떤 모임을 만들어볼까요? 모임 정보 및 목표를 작성해 새로운 솔리들과 함께해보세요."
          }
          {...formContext.register("content")}
          onChange={(e) => {
            formContext.setValue("content", e.target.value);
            formContext.trigger();
          }}
          maxLength={500}
        />
        {
          // TODO : 추후에 글자가 1개도 입력되지 않은 경우 에러 표시하려고 남겨놓는 자리
          // <div className="absolute b-0 pl-7 text-sm text-red-600"> 에러자리 </div>
        }
      </div>
      <div className={"flex w-full justify-end"}>
        <span
          className={`${formContext.getValues("content").length >= 500 && "text-red-600"}`}
        >
          {formContext.getValues("content").length} / 500
        </span>
      </div>
    </article>
  );
};
export default GatheringEditorContent
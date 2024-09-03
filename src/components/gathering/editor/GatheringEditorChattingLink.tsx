import { useFormContext } from "react-hook-form";

const GatheringEditorChattingLink = () => {
  const formContext = useFormContext();

  return (
    <div className="relative flex w-full flex-shrink-0 items-center">
      <div className={"relative w-[9.5rem] flex-shrink-0"}>
        <span className={"text-lg font-semibold"}>제목</span>
      </div>
      <div className="relative w-full">
        <input
          placeholder="참여 인원과 소통을 위해 오픈 채팅 링크를 추가해주세요."
          maxLength={100}
          className={`h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.title
              ? "outline-red-500"
              // : formContext.getValues("chattingLink")
              //   ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
          {...formContext.register("chattingLink")}
          onChange={(e) => {
            formContext.setValue("chattingLink", e.target.value);
            formContext.trigger("chattingLink");
          }}
        />
        {formContext.formState.errors.title && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.title.message as String}
          </span>
        )}
      </div>
    </div>
  );
};

export default GatheringEditorChattingLink;

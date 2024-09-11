import { useFormContext } from "react-hook-form";

const GatheringEditorChattingLink = () => {
  const formContext = useFormContext();

  return (
    <div className="relative flex w-full flex-shrink-0 items-center gap-[0.625rem]">
      <div className={"relative w-[2.75rem] flex-shrink-0 text-lg font-semibold"}>
        링크
      </div>
      <div className="relative w-full">
        <input
          placeholder="참여 인원과 소통을 위해 오픈 채팅 링크를 추가해주세요."
          maxLength={255}
          className={`h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.openChattingUrl
              ? "outline-red-500"
              : // : formContext.getValues("openChattingUrl")
                //   ? "outline-main"
                "outline-[#E3E3E3]"
          }`}
          {...formContext.register("openChattingUrl")}
          onChange={(e) => {
            formContext.setValue("openChattingUrl", e.target.value);
            formContext.trigger("openChattingUrl");
          }}
        />
        {formContext.formState.errors.openChattingUrl && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.openChattingUrl.message as String}
          </span>
        )}
      </div>
    </div>
  );
};

export default GatheringEditorChattingLink;

import { useFormContext } from "react-hook-form";

interface FormValues {
  title: string;
}

const GatheringEditorTitle = () => {
  const formContext = useFormContext();

  return (
    <div className="relative flex w-full max-w-[35.375rem] flex-shrink-0 items-center gap-x-[1.75rem] max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-3">
      <div className="relative w-[2.625rem] flex-shrink-0">
        <span className="w-[3.5rem] text-lg font-semibold">제목</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <input
          placeholder="제목을 입력하세요(최대50자)"
          maxLength={50} // 최대 50자 입력 가능
          className={`h-[3.25rem] w-full max-w-[35.375rem] rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] max-[360px]:pl-5 ${
            formContext.formState.errors.title
              ? "outline-red-500"
              : formContext.getValues("title")
                ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
          {...formContext.register("title")}
          onChange={(e) => {
            formContext.setValue("title", e.target.value);
            formContext.trigger("title");
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

export default GatheringEditorTitle;

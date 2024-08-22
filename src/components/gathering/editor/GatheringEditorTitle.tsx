import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
}

const GatheringEditorTitle = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange", // 실시간 검사를 위해 onChange 모드 설정
  });

  return (
    <div className="relative flex w-full flex-shrink-0 items-center gap-x-[1.75rem]">
      <div className="relative w-[2.625rem] flex-shrink-0">
        <span className="w-[3.5rem] text-lg font-semibold">제목</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <input
          placeholder="제목을 입력하세요"
          maxLength={50} // 최대 50자 입력 가능
          className={`h-[3.25rem] w-full rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] ${
            errors.title ? "outline-red-500" : "outline-[#E3E3E3]"
          }`}
          {...register("title", {
            required: "제목은 필수 항목입니다.",
          })}
        />
        {errors.title && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {errors.title.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default GatheringEditorTitle;

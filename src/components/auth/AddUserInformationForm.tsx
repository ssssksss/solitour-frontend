"use client";

import { IModalComponent } from "@/types/ModalState";
import ModalTemplate from "../common/modal/ModalTemplate";
import { useAddUserInformationForm } from "@/hooks/auth/useAddUserInformationForm";

const AddUserInformationForm = (props: IModalComponent) => {
  const { methods, handleInputChange, handleSubmit } =
    useAddUserInformationForm(props);

  return (
    <ModalTemplate className="max-w-[31.25rem] px-[3.5rem]">
      {props.closeButtonComponent}
      <h2 className="text-[1.625rem] font-bold text-black">
        안녕하세요 솔리투어입니다
      </h2>
      <p className="mt-[0.625rem] max-w-[15.875rem] text-center text-gray1">
        신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
      </p>
      <div className="mt-[1.25rem] flex w-full flex-col gap-y-[2.375rem] rounded-[1.125rem] bg-[#F7F7F7] px-[2.25rem] pb-[1.875rem] pt-[1.5rem]">
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 이름 </h3>
          <input
            type={"text"}
            className="mt-3 h-10 w-full rounded-[1.5rem] px-3 text-center text-main outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#f0f0f0] focus:outline-main"
            placeholder="이름을 입력해주세요"
            maxLength={10}
            {...methods.register("name")}
          />
        </article>
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 성별 </h3>
          <div className={"mt-3 flex h-10 w-full gap-x-3"}>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${methods.getValues("sex") == "male" ? "bg-lightGreen font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => {
                methods.setValue("sex", "male");
                methods.trigger();
              }}
            >
              남성
            </button>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${methods.getValues("sex") == "female" ? "bg-lightGreen font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => {
                methods.setValue("sex", "female");
                methods.trigger();
              }}
            >
              여성
            </button>
          </div>
        </article>
        <article className="flex flex-col">
          <h3 className="flex items-center gap-x-2 text-[1.125rem] font-bold text-black">
            연도(나이)
            <span className="flex items-center text-gray2">
              {new Date().getFullYear() - 58} ~ {new Date().getFullYear() - 19}
            </span>
          </h3>
          <input
            type="text"
            name="year"
            onChange={handleInputChange}
            placeholder="YYYY"
            maxLength={4}
            className="mt-3 flex h-10 w-full items-center justify-center rounded-[1.5rem] bg-transparent bg-white py-[0.375rem] text-center text-main outline-hidden outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#F0F0F0] focus:outline-main"
          />
        </article>
      </div>
      <p className="mt-[0.875rem] max-w-[18.125rem] text-center text-sm text-gray1">
        정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
        제한될 수 있습니다
      </p>
      <button
        onClick={handleSubmit}
        className={`mt-5 min-h-[4rem] w-full rounded-[1.875rem] text-white ${methods.formState.isValid ? "bg-main" : "bg-gray2"}`}
        disabled={!methods.formState.isValid}
      >
        입력 완료
      </button>
    </ModalTemplate>
  );
};

export default AddUserInformationForm;

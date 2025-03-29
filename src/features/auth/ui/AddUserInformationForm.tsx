"use client";

import { useAddUserInformationForm } from "../model/useAddUserInformationForm";
import { ModalTemplate } from "@/shared/ui/modal";

interface AddUserInformationFormProps {
  closeModal: () => void;
}

export const AddUserInformationForm = ({
  closeModal,
}: AddUserInformationFormProps) => {
  const { methods, handleInputChange, handleSubmit } =
    useAddUserInformationForm(closeModal);

  return (
    <ModalTemplate className="max-w-125 px-14" closeModal={closeModal}>
      <h2 className="text-[1.625rem] font-bold text-black">
        안녕하세요 솔리투어입니다.
      </h2>
      <p className="text-gray1 mt-2.5 max-w-[15.875rem] text-center">
        신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요.
      </p>
      <div className="mt-5 flex w-full flex-col gap-y-[2.375rem] rounded-[1.125rem] bg-[#F7F7F7] px-9 pt-6 pb-7.5">
        <article className="flex flex-col">
          <h3 className="text-lg font-bold text-black">이름</h3>
          <input
            className="text-main focus:outline-main mt-3 h-10 w-full rounded-3xl bg-white px-3 text-center outline -outline-offset-1 outline-[#f0f0f0]"
            {...methods.register("name")}
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={10}
          />
        </article>
        <article className="flex flex-col">
          <h3 className="text-lg font-bold text-black"> 성별 </h3>
          <div className="mt-3 flex h-10 w-full gap-x-3">
            <button
              className={[
                methods.getValues("sex") === "male"
                  ? "bg-lightgreen text-main outline-main font-bold"
                  : "text-gray2 bg-white outline-[#f0f0f0]",
                "h-full w-full rounded-3xl outline -outline-offset-1",
              ].join(" ")}
              onClick={() => {
                methods.setValue("sex", "male");
                methods.trigger();
              }}
            >
              남성
            </button>
            <button
              className={[
                methods.getValues("sex") === "female"
                  ? "bg-lightgreen text-main outline-main font-bold"
                  : "text-gray2 bg-white outline-[#f0f0f0]",
                "h-full w-full rounded-3xl outline -outline-offset-1",
              ].join(" ")}
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
          <h3 className="flex items-center gap-x-2 text-lg font-bold text-black">
            연도(나이)
            <span className="text-gray2 flex items-center">
              {new Date().getFullYear() - 58} ~ {new Date().getFullYear() - 19}
            </span>
          </h3>
          <input
            className="text-main focus:outline-main mt-3 flex h-10 w-full items-center justify-center rounded-3xl bg-white py-1.5 text-center outline-hidden outline -outline-offset-1 outline-[#F0F0F0]"
            type="text"
            name="year"
            onChange={handleInputChange}
            placeholder="YYYY"
            maxLength={4}
          />
        </article>
      </div>
      <p className="text-gray1 mt-3.5 max-w-[18.125rem] text-center text-sm">
        정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
        제한될 수 있습니다
      </p>
      <button
        className={[
          methods.formState.isValid ? "bg-main" : "bg-gray2",
          "mt-5 min-h-16 w-full rounded-[1.875rem] text-white",
        ].join(" ")}
        onClick={handleSubmit}
        disabled={!methods.formState.isValid}
      >
        입력 완료
      </button>
    </ModalTemplate>
  );
};

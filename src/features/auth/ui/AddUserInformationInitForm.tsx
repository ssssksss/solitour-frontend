"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface AddUserInformationInitFormProps {
  handleSubmit: (isAgree: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHomeButtonClick: () => void;
}

export const AddUserInformationInitForm = ({
  handleSubmit,
  handleInputChange,
  handleHomeButtonClick,
}: AddUserInformationInitFormProps) => {
  const formContext = useFormContext();

  return (
    <div className="fixed inset-0 z-[100] flex h-full w-full flex-col items-center justify-center bg-white px-[3.5rem]">
      <section className="scrollbar-hide outline-gray2 flex max-h-[calc(100vh-1rem)] w-full max-w-[50rem] flex-col items-center overflow-y-scroll rounded-[1rem] rounded-b-[1rem] bg-white px-[3.5rem] pt-2 pb-4 outline -outline-offset-1">
        <div className="flex w-full py-2">
          <button
            className="bg-gray3 relative z-50 transform rounded-2xl p-2 transition-transform duration-300"
            onClick={() => handleHomeButtonClick()}
          >
            <Image
              className="aspect-square"
              src="/icons/home-empty-icon.svg"
              alt="home-icon"
              width={24}
              height={24}
            />
          </button>
        </div>
        <h2 className="text-[1.625rem] font-bold text-black">
          안녕하세요 솔리투어입니다
        </h2>
        <p className="text-gray1 mt-[0.625rem] max-w-[15.875rem] text-center">
          신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
        </p>
        <div className="mt-[1.25rem] flex w-full flex-col gap-y-[2.375rem] rounded-[1.125rem] bg-[#ececec] px-9 pt-6 pb-[1.875rem]">
          <article className="flex flex-col">
            <h3 className="text-[1.125rem] font-bold text-black">이름</h3>
            <input
              type="text"
              className="text-main focus:outline-main mt-3 h-12 w-full rounded-3xl px-3 py-2 text-center"
              placeholder="이름을 입력해주세요"
              maxLength={10}
              {...formContext.register("name")}
            />
          </article>
          <article className="flex flex-col">
            <h3 className="text-[1.125rem] font-bold text-black"> 성별 </h3>
            <div className="mt-3 flex h-[3rem] w-full gap-x-3">
              <button
                className={`h-full w-full rounded-[1.5rem] py-4 outline -outline-offset-1 ${formContext.getValues("sex") == "male" ? "bg-lightGreen text-main outline-main font-bold" : "text-gray2 bg-white outline-[#f0f0f0]"}`}
                onClick={() => {
                  formContext.setValue("sex", "male");
                  formContext.trigger();
                }}
              >
                남성
              </button>
              <button
                className={`h-full w-full rounded-[1.5rem] py-4 outline -outline-offset-1 ${formContext.getValues("sex") == "female" ? "bg-lightGreen text-main outline-main font-bold" : "text-gray2 bg-white outline-[#f0f0f0]"}`}
                onClick={() => {
                  formContext.setValue("sex", "female");
                  formContext.trigger();
                }}
              >
                여성
              </button>
            </div>
          </article>
          <article className="flex flex-col">
            <h3 className="flex items-center gap-x-2 text-[1.125rem] font-bold text-black">
              연도(나이)
              <span className="text-gray2 flex items-center">
                {new Date().getFullYear() - 58} ~{" "}
                {new Date().getFullYear() - 19}
              </span>
            </h3>
            <span className="text-gray2 flex items-center">
              현재는 {new Date().getFullYear() - 58} ~
              {new Date().getFullYear() - 19}년생만 모임 서비스를 이용할 수
              있습니다.
            </span>
            <div className="text-main mt-3 flex items-center justify-center rounded-3xl bg-white outline -outline-offset-1 outline-[#F0F0F0]">
              <input
                type="text"
                name="year"
                onChange={handleInputChange}
                placeholder="YYYY"
                maxLength={4}
                className="h-12 w-full bg-transparent py-2 text-center outline-hidden"
              />
            </div>
          </article>
        </div>
        <p className="text-gray1 mt-[0.875rem] max-w-[18.125rem] text-center text-sm">
          정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
          제한될 수 있습니다
        </p>
        <label className="mt-4 flex w-full items-center gap-x-2">
          <input
            className="h-6 w-6"
            type="checkbox"
            checked={formContext.getValues("isCheckTerm")}
            onChange={() => {
              formContext.setValue(
                "isCheckTerm",
                !formContext.getValues("isCheckTerm"),
              );
              formContext.trigger();
            }}
          />
          <span>[필수] 솔리투어 이용약관</span>
          <a
            href="/support?menu=terms#terms-of-service"
            target="_blanket"
            className="hover:text-main ml-auto"
          >
            보기
          </a>
        </label>
        <label className="mt-2 flex w-full items-center gap-x-2">
          <input
            className="h-6 w-6"
            type="checkbox"
            checked={formContext.getValues("isCheckPrivacy")}
            onChange={() => {
              formContext.setValue(
                "isCheckPrivacy",
                !formContext.getValues("isCheckPrivacy"),
              );
              formContext.trigger();
            }}
          />
          <span>[필수] 솔리투어 개인정보 처리방침</span>
          <a
            href="/support?menu=terms#privacy-policy"
            target="_blanket"
            className="hover:text-main ml-auto"
          >
            보기
          </a>
        </label>
        <button
          onClick={() => handleSubmit(true)}
          className={`mt-2 min-h-[3rem] w-full rounded-[1.5rem] ${formContext.formState.isValid && formContext.getValues("isCheckTerm") && formContext.getValues("isCheckPrivacy") ? "bg-main text-white" : "bg-gray3"}`}
          disabled={
            !formContext.formState.isValid ||
            !formContext.getValues("isCheckTerm") ||
            !formContext.getValues("isCheckPrivacy")
          }
        >
          추가 정보 제출
        </button>
        <button
          className={`mt-2 min-h-[3rem] w-full rounded-[1.5rem] ${formContext.getValues("isCheckTerm") && formContext.getValues("isCheckPrivacy") ? "bg-main text-white" : "bg-gray3"}`}
          disabled={
            !formContext.getValues("isCheckTerm") ||
            !formContext.getValues("isCheckPrivacy")
          }
          onClick={() => handleSubmit(false)}
        >
          나중에 등록하기
        </button>
      </section>
    </div>
  );
};

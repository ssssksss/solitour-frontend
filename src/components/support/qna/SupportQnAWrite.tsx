import Breadcrumbs from "@/components/common/Breadcrumb";
import { QNA_DETAIL_WRITE_BREADCRUMB_PATH } from "@/utils/constant/BreadCrumbDirectory";
import Image from "next/image";
import React from "react";

interface ISupportQnAWrite {
  category: string;
  content: string;
  title: string; // New prop
  onCategoryChange: (category: string) => void;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void; // New handler
  onSubmit: () => void;
  onAgreeToTermsCheck: () => void;
  isConsent: boolean;
}

const SupportQnAWrite: React.FC<ISupportQnAWrite> = ({
  category,
  content,
  title, // New prop
  onCategoryChange,
  onContentChange,
  onTitleChange, // New handler
  onSubmit,
  onAgreeToTermsCheck,
  isConsent,
}) => {
  return (
    <div className="flex w-full flex-col px-4 pb-8">
      <Breadcrumbs categories={QNA_DETAIL_WRITE_BREADCRUMB_PATH} />
      <h2 className="text-xl font-bold">질문 등록하기</h2>

      <section className={"flex w-full flex-col gap-[2.375rem]"}>
        {/* 제목 입력 */}
        <div className="relative mt-8 flex w-full flex-shrink-0 items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start">
          <div className={"relative w-[2.625rem] flex-shrink-0"}>
            <span className={"text-lg font-semibold"}>제목</span>
            <span className="absolute top-[-.5rem] text-lg text-main">*</span>
          </div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="제목을 입력하세요."
            className={`h-[3.25rem] w-full rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]`}
          />
        </div>

        {/* 카테고리 선택 */}
        <div className="relative">
          <span
            className={`${category != "" && "hidden"} absolute left-[7.875rem] top-1/2 -translate-y-[calc(50%+0.5rem)] text-lg text-main`}
          >
            *
          </span>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-[3.25rem] w-full cursor-pointer appearance-none rounded-[3rem] pl-[1.75rem] font-bold outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          >
            <option
              className={"relative text-lg font-semibold"}
              value=""
              disabled
            >
              문의 분야 선택
            </option>
            <option value="정보 서비스">정보 서비스</option>
            <option value="모임 서비스">모임 서비스</option>
            <option value="여행일기 서비스">여행일기 서비스</option>
            <option value="인증 및 개인정보">인증 및 개인정보</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 질문 입력 */}
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="질문을 입력하세요..."
          rows={5}
          className="`min-h-[17.5rem] w-full resize-none rounded-[1rem] p-6 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        />

        {/* 동의 버튼 */}
        <div className="flex w-full justify-end">
          <button
            className="flex flex-shrink-0 items-center gap-1 text-sm font-medium text-black"
            onClick={onAgreeToTermsCheck}
          >
            {isConsent ? (
              <Image
                src="/common/check-active-icon.svg"
                alt="location-icon"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/common/check-empty-icon.svg"
                alt="location-icon"
                width={20}
                height={20}
              />
            )}
            <div className="flex w-auto min-w-[5.25rem] items-center justify-start">
              <span className={"text-main text underline"}> 개인정보 수집이용 </span>
              <span> 에 동의합니다. </span>
            </div>
          </button>
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={onSubmit}
          disabled={
            content.trim().length < 1 ||
            category === "" ||
            title.trim().length < 1
          }
          className={`w-full rounded p-2 text-white ${
            content.trim().length < 1 ||
            category === "" ||
            title.trim().length < 1
              ? "bg-gray-400"
              : "bg-main"
          }`}
        >
          제출
        </button>
      </section>
    </div>
  );
};

export default SupportQnAWrite;

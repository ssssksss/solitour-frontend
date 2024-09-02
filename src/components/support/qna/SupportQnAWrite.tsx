import Breadcrumbs from "@/components/common/Breadcrumb";
import { QNA_DETAIL_WRITE_BREADCRUMB_PATH } from "@/utils/constant/BreadCrumbDirectory";
import React from "react";

interface ISupportQnAWrite {
  category: string;
  content: string;
  title: string; // New prop
  onCategoryChange: (category: string) => void;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void; // New handler
  onSubmit: () => void;
}

const SupportQnAWrite: React.FC<ISupportQnAWrite> = ({
  category,
  content,
  title, // New prop
  onCategoryChange,
  onContentChange,
  onTitleChange, // New handler
  onSubmit,
}) => {

  return (
    <div className="flex w-full flex-col px-4">
      <Breadcrumbs categories={QNA_DETAIL_WRITE_BREADCRUMB_PATH} />
      <h2 className="mb-2 text-xl font-bold">질문 작성하기</h2>

      {/* 카테고리 선택 */}
      <label className="mb-2 font-semibold" htmlFor="category">
        카테고리
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="mb-4 w-full rounded border p-2"
      >
        <option value="" disabled>
          선택해주세요
        </option>
        <option value="정보 서비스">정보 서비스</option>
        <option value="모임 서비스">모임 서비스</option>
        <option value="여행일기 서비스">여행일기 서비스</option>
        <option value="인증 및 개인정보">인증 및 개인정보</option>
        <option value="기타">기타</option>
      </select>

      {/* 제목 입력 */}
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="제목을 입력하세요..."
        className="mb-4 w-full rounded border p-2"
      />

      {/* 질문 입력 */}
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="질문을 입력하세요..."
        rows={5}
        className="mb-4 h-[15rem] w-full resize-none rounded border p-2"
      />

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
    </div>
  );
};

export default SupportQnAWrite;

import Breadcrumbs from "@/components/common/Breadcrumb";
import React, { useState } from "react";

interface ISupportQnAWrite {
  onSubmit: (category: string, question: string) => void;
}

const SupportQnAWrite: React.FC<ISupportQnAWrite> = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("general");

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setQuestion(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    if (question.trim()) {
      onSubmit(category, question);
      setQuestion(""); // Clear the input field after submission
      setCategory("general"); // Reset category to default
    }
    };
    
    const categories = [
      { label: "지원&안내", href: "/support" },
      { label: "QnA", href: "/support?menu=qna" },
      { label: "질문 등록하기", href: "" },
    ];

  return (
    <div className="flex w-full flex-col p-4">
      <Breadcrumbs categories={categories} />
      <h2 className="mb-2 text-xl font-bold">질문 작성하기</h2>

      {/* 카테고리 선택 */}
      <label className="mb-2 font-semibold" htmlFor="category">
        카테고리
      </label>
      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="mb-4 w-full rounded border p-2"
      >
        <option value="general">일반</option>
        <option value="technical">기술적</option>
        <option value="billing">청구</option>
        <option value="support">지원</option>
      </select>

      {/* 질문 입력 */}
      <textarea
        value={question}
        onChange={handleQuestionChange}
        placeholder="질문을 입력하세요..."
        rows={5}
        className="mb-4 h-[10rem] w-full resize-none rounded border p-2"
      />

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full rounded bg-main p-2 text-white hover:bg-blue-600"
      >
        제출
      </button>
    </div>
  );
};

export default SupportQnAWrite;

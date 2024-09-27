"use client";

import SupportQnAWrite from "@/components/support/qna/SupportQnAWrite";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ISupportQnAWriteContainer {}

const SupportQnAWriteContainer: React.FC<ISupportQnAWriteContainer> = () => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [isConsent, setIsConsent] = useState(false);

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleTitleChange = (title: string) => {
    // New handler
    setTitle(title);
  };

  const handleSubmit = async () => {
    if (content.trim() && title.trim()) {
      const response = await fetchWithAuth("/api/support/qna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: category,
          content: content,
          title: title,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const qnaId = await response.json();
      router.replace(`/support/qna/detail/${qnaId}`);
    }
  };

  const handleConsentCheck = () => {
    setIsConsent(prev => !prev);
  }

  return (
    <SupportQnAWrite
      category={category}
      content={content}
      title={title} // Pass title to the component
      onCategoryChange={handleCategoryChange}
      onContentChange={handleContentChange}
      onTitleChange={handleTitleChange} // Pass title change handler
      onSubmit={handleSubmit}
      onAgreeToTermsCheck={handleConsentCheck}
      isConsent={isConsent}
    />
  );
};

export default SupportQnAWriteContainer;

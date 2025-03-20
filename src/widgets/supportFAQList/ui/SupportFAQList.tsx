"use client";

import { useState } from "react";
import { FAQList } from "../config/faqList";

export const SupportFAQList = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const handleToggle = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="flex w-full flex-col border-t border-t-black">
      {FAQList.map((faq) => faq.topic).map((topic) => (
        <div
          key={topic}
          className="border-b-gray3 flex w-full flex-col border-b px-5"
        >
          <button
            className="grid h-[4.625rem] w-full grid-cols-[6.0625rem_auto] items-center rounded-md"
            onClick={() => handleToggle(topic)}
          >
            <div className="text-main text-start font-bold"> Q </div>
            <div className="text-start text-lg font-bold">{topic}</div>
          </button>
          <div
            className={[
              expandedTopic === topic ? "max-h-screen gap-y-2 py-2" : "max-h-0",
              "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
            ].join(" ")}
          >
            {FAQList.filter((faq) => faq.topic === topic).map((faq) => (
              <div
                key={faq.topic}
                className="ml-[5.0625rem] rounded-lg border border-gray-200 p-4 shadow-xs transition-shadow duration-300 ease-in-out hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

import { useState } from "react";

interface FAQ {
  topic: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    topic: "반품 및 환불",
    question: "반품 정책은 어떻게 되나요?",
    answer:
      "상품은 수령 후 30일 이내에 반품할 수 있으며, 전액 환불이 가능합니다.",
  },
  {
    topic: "반품 및 환불",
    question: "환불은 얼마나 걸리나요?",
    answer: "환불 처리에는 보통 5-7 영업일이 소요됩니다.",
  },
  {
    topic: "배송",
    question: "배송은 얼마나 걸리나요?",
    answer: "배송은 보통 3-5 영업일이 소요됩니다.",
  },
  {
    topic: "배송",
    question: "국제 배송도 하나요?",
    answer: "네, 많은 국가로 국제 배송이 가능합니다.",
  },
  {
    topic: "주문",
    question: "주문 후 변경할 수 있나요?",
    answer:
      "주문이 완료된 후에는 변경할 수 없습니다. 고객 서비스에 문의해 주세요.",
  },
  {
    topic: "주문",
    question: "주문 추적은 어떻게 하나요?",
    answer:
      "배송 확인 이메일에 포함된 추적 번호를 사용하여 주문을 추적할 수 있습니다.",
  },
  {
    topic: "결제",
    question: "어떤 결제 방법을 지원하나요?",
    answer: "신용카드, 체크카드, PayPal을 지원합니다.",
  },
  {
    topic: "결제",
    question: "할인 코드는 어떻게 사용하나요?",
    answer: "체크아웃 시 할인 코드를 입력하면 할인이 적용됩니다.",
  },
  {
    topic: "계정",
    question: "계정 정보를 업데이트하려면 어떻게 하나요?",
    answer: "계정에 로그인하여 정보를 수정할 수 있습니다.",
  },
  {
    topic: "계정",
    question: "구독을 취소하려면 어떻게 하나요?",
    answer: "계정 설정에서 언제든지 구독을 취소할 수 있습니다.",
  },
  {
    topic: "기술 지원",
    question: "기술 지원이 필요한데 어떻게 하나요?",
    answer:
      "기술 지원팀이 문제 해결을 도와드립니다. 웹사이트의 고객 서비스 페이지에서 문의해 주세요.",
  },
  {
    topic: "기술 지원",
    question: "제품 보증 정책은 어떻게 되나요?",
    answer:
      "대부분의 제품에 대해 1년 보증을 제공합니다. 제품 페이지에서 구체적인 정보를 확인해 주세요.",
  },
  {
    topic: "개인정보",
    question: "개인정보 보호 정책은 어디에 있나요?",
    answer: "웹사이트 하단 또는 '법적 고지' 섹션에서 확인하실 수 있습니다.",
  },
  {
    topic: "개인정보",
    question: "피드백은 어떻게 제공하나요?",
    answer: "문의 양식이나 이메일을 통해 피드백을 제공해 주시면 됩니다.",
  },
  {
    topic: "사이즈",
    question: "사이즈 가이드는 어디에서 확인하나요?",
    answer: "각 제품 페이지에서 상세 사이즈 가이드를 확인할 수 있습니다.",
  },
  {
    topic: "사이즈",
    question: "세일 상품도 반품 가능한가요?",
    answer: "세일 상품은 14일 이내에 매장 적립금으로만 반품 가능합니다.",
  },
  {
    topic: "환경",
    question: "제품이 친환경적인가요?",
    answer: "지속 가능성을 위해 친환경 제품을 제공합니다.",
  },
  {
    topic: "환경",
    question: "기프트 카드를 제공하나요?",
    answer: "전자 기프트 카드를 다양한 금액으로 제공하고 있습니다.",
  },
  {
    topic: "환경",
    question: "로열티 프로그램이 있나요?",
    answer: "구매 시 포인트를 적립할 수 있는 로열티 프로그램이 있습니다.",
  },
  {
    topic: "기타",
    question: "불량 제품을 받았을 때는 어떻게 하나요?",
    answer: "불량 제품에 대한 자세한 사항을 고객 서비스에 문의해 주세요.",
  },
  {
    topic: "기타",
    question: "피드백을 주고 싶어요. 어떻게 해야 하나요?",
    answer:
      "피드백은 웹사이트의 문의 양식 또는 이메일을 통해 제공해 주시면 됩니다.",
  },
];

const SupportFAQ = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const handleToggle = (topic: string) => {
    setExpandedTopic(expandedTopic === topic ? null : topic);
  };

  return (
    <div className="flex w-full flex-col">
      {Array.from(new Set(faqData.map((faq) => faq.topic))).map((topic) => (
        <div key={topic} className="mb-4">
          <button
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-left font-semibold transition-colors duration-300 ease-in-out hover:bg-gray-300"
            onClick={() => handleToggle(topic)}
          >
            {topic}
          </button>
          <div
            className={`mt-2 space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
              expandedTopic === topic ? "max-h-screen" : "max-h-0"
            }`}
          >
            {faqData
              .filter((faq) => faq.topic === topic)
              .map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg"
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

export default SupportFAQ;
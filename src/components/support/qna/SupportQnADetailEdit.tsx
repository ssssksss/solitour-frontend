import Breadcrumbs from "@/components/common/Breadcrumb";
import { format } from "date-fns";
import React, { useState } from "react";

interface ISupportQnADetailEdit {
  // 필요한 props가 있으면 여기에 정의
}

const SupportQnADetailEdit: React.FC<ISupportQnADetailEdit> = (props) => {
  const [responses, setResponses] = useState([
    {
      id: 1,
      state: "question",
      content: "React를 배우는 가장 좋은 방법은 무엇인가요?",
      createdAt: "2024-08-27T10:00:00Z",
    },
    {
      id: 2,
      state: "response",
      content:
        "React를 배우는 가장 좋은 방법은 공식 문서부터 시작하고 작은 프로젝트를 만드는 것입니다. 온라인 튜토리얼과 강의도 도움이 될 수 있습니다.",
      createdAt: "2024-08-27T10:05:00Z",
    },
    {
      id: 3,
      state: "response",
      content:
        "또 다른 좋은 방법은 커뮤니티나 포럼에 참여하여 질문을 하고 프로젝트에 대한 피드백을 받는 것입니다.",
      createdAt: "2024-08-27T10:10:00Z",
    },
    {
      id: 4,
      state: "question",
      content: "React의 상태 관리를 위한 가장 좋은 라이브러리는 무엇인가요?",
      createdAt: "2024-08-27T10:15:00Z",
    },
    {
      id: 5,
      state: "response",
      content:
        "상태 관리를 위해서는 React의 내장 훅인 `useState`와 `useReducer`를 사용할 수 있습니다. 또한, 상태 관리를 더 복잡하게 하고 싶다면 Redux나 Zustand 같은 라이브러리를 고려할 수 있습니다.",
      createdAt: "2024-08-27T10:20:00Z",
    },
    {
      id: 6,
      state: "response",
      content:
        "Redux는 상태 관리를 위한 매우 강력한 라이브러리지만, 설정이 복잡할 수 있습니다. Zustand는 더 간단한 설정으로 상태 관리를 제공하므로 작은 프로젝트나 간단한 상태 관리에 적합할 수 있습니다.",
      createdAt: "2024-08-27T10:25:00Z",
    },
  ]);
  const [newResponse, setNewResponse] = useState<string>("");

  const handleResponseChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewResponse(event.target.value);
  };

  const handleResponseSubmit = () => {
    if (newResponse.trim()) {
      const newEntry = {
        id: responses.length + 1,
        state: "response",
        content: newResponse,
        createdAt: new Date().toISOString(),
      };
      setResponses([...responses, newEntry]);
      setNewResponse(""); // 제출 후 textarea를 비웁니다.
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const categories = [
        { label: "지원&안내", href: "/support" },
        { label: "QnA", href: "/support?menu=qna" },
        { label: "상세", href: "" },
    ];

  return (
      <div className="flex w-full flex-col space-y-4 mt-4">
          <Breadcrumbs categories={categories} />
      <div className="space-y-2 px-4">
        {responses.map((entry) => (
          <div
            key={entry.id}
            className={`flex ${
              entry.state === "question" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="w-full max-w-screen-sm rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">
                {entry.state === "question" ? "질문" : `답변 ${entry.id}`}
              </h2>
              <p className="text-gray-700">{entry.content}</p>
              <p className="mt-2 text-sm text-gray-500 flex justify-end">
                {format(new Date(entry.createdAt), "yyyy-MM-dd hh:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-4 shadow-md">
        <textarea
          value={newResponse}
          onChange={handleResponseChange}
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 p-2"
          placeholder="여기에 응답을 작성하세요..."
        />
        <button
          onClick={handleResponseSubmit}
          className="mt-2 w-full rounded-lg bg-main py-2 text-white"
        >
          응답 제출
        </button>
      </div>
    </div>
  );
};

export default SupportQnADetailEdit;

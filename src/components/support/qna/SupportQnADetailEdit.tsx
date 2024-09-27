import Breadcrumbs from "@/components/common/Breadcrumb";
import { QnADetailType, QnAMessageType } from "@/types/QnADto";
import { QNA_DETAIL_BREADCRUMB_PATH } from "@/utils/constant/BreadCrumbDirectory";
import { format } from "date-fns";
import React from "react";

interface ISupportQnADetailEdit {
  data: QnADetailType;
  userId: number; // 현재 로그인한 사용자의 ID
  changeInputHandler: (value: string) => void;
  questionSubmitHandler: () => void;
  messageList: QnAMessageType[];
  qnaCloseHandler: () => void;
}

const SupportQnADetailEdit: React.FC<ISupportQnADetailEdit> = ({
  data,
  userId,
  changeInputHandler,
  questionSubmitHandler,
  messageList,
  qnaCloseHandler,
}) => {
  const STATUS: { [key: string]: { name: string; style: string } } = {
    WAIT: {
      name: "답변 대기 중",
      style: "bg-red-100 text-red-700",
    },
    ANSWER: {
      name: "답변 완료",
      style: "bg-green-100 text-green-700",
    },
    CLOSED: {
      name: "답변 종료",
      style: "bg-gray-400 text-black",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-6">
      <Breadcrumbs categories={QNA_DETAIL_BREADCRUMB_PATH(data.id)} />

      <div className="mb-8 rounded-[.25rem] bg-white p-6">
        <div className="mb-4 w-full text-start">
          <h2 className="whitespace-pre-wrap break-words text-4xl font-bold text-main">
            {data.title}
          </h2>
        </div>
        <div className="text-center">
          <span
            className={`rounded-lg px-4 py-1 text-xl font-medium ${STATUS[data.status].style}`}
          >
            {STATUS[data.status].name}
          </span>
        </div>
      </div>

      {userId < 1 ? (
        <div className="mb-8 space-y-6">
          <div className="flex justify-start">
            <div className="w-full max-w-2xl animate-pulse rounded-[2rem] bg-gray-200 p-6 shadow-md">
              <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-lg bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-4 rounded bg-gray-300"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="mt-6 h-3 w-1/2 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full max-w-2xl animate-pulse rounded-[2rem] bg-gray-200 p-6 shadow-md">
              <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-lg bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-4 rounded bg-gray-300"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-300"></div>
              <div className="mt-6 h-3 w-1/2 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 space-y-6">
          {messageList.map((entry) => (
            <div
              key={entry.id}
              className={`flex ${entry.userId === userId ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-md outline outline-[2px] outline-offset-[-2px] ${entry.userId === userId ? "outline-gray-800" : "outline-orange-400"}`}
              >
                <div className="flex aspect-square w-[2rem] items-center justify-center rounded-lg bg-main text-white">
                  {entry.userId === userId ? "Q" : "A"}
                </div>
                <p className="text-gray-700">{entry.content}</p>
                <p className="mt-2 text-right text-sm text-gray-500">
                  {format(new Date(entry.createdAt), "yyyy-MM-dd HH:mm")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.status !== "CLOSED" && (
        <div className="space-y-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-md outline outline-[1px] outline-offset-[-1px] outline-main">
            <textarea
              rows={4}
              className="mb-4 w-full resize-none rounded-lg p-4 focus:outline-none"
              placeholder="여기에 응답을 작성하세요..."
              onChange={(e) => changeInputHandler(e.target.value)}
            />
            <button
              onClick={() => questionSubmitHandler()}
              className="hover:bg-main-dark w-full rounded-lg bg-main py-2 font-semibold text-white transition duration-200"
            >
              응답 제출
            </button>
          </div>
          <button
            onClick={() => {
              qnaCloseHandler();
            }}
            className="w-full rounded-lg bg-gray-600 py-2 font-semibold text-white transition duration-200 hover:bg-gray-700"
          >
            QnA 종료
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportQnADetailEdit;

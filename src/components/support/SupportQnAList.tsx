import { QnAListElementType } from "@/types/QnADto";
import { format } from "date-fns";
import Link from "next/link";

interface ISupportQnAListProps {
  elements: QnAListElementType[];
  loading: boolean;
  userId: number;
}

const STATUS: { [key: string]: { name: string; style: string } } = {
  WAIT: {
    name: "답변 대기중",
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

const SupportQnAList = ({
  elements,
  loading,
  userId,
}: ISupportQnAListProps) => {
  return (
    <div className="flex w-full flex-col">
      {loading ? (
        <>
          <ul className="m-0 min-h-[30rem] list-none p-0">
            {Array.from({ length: 10 }).map((_, index) => (
              <li
                key={index}
                className="relative mb-4 flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-6 w-[4rem] animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {userId > 0 ? (
            <div className={"flex w-full justify-end"}>
              <Link href="/support/qna/write" passHref>
                <button className="mb-4 rounded-lg bg-main px-4 py-2 text-white shadow-md transition-colors duration-300 hover:scale-105">
                  질문 등록하기
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex h-[12rem] w-full items-center justify-center text-lg">
              로그인이 필요합니다.
            </div>
          )}
          <ul className="m-0 min-h-[30rem] list-none p-0">
            {elements?.map((qna) => (
              <Link key={qna.id} href={`/support/qna/detail/${qna.id}`}>
                <li className="relative mb-4 flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <span className="max-w-[calc(100%-4rem)] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
                      {qna.title}
                    </span>
                    <span
                      className={`flex min-w-[5rem] justify-center rounded-md px-2 py-1 text-xs font-semibold shadow-sm ${STATUS[qna.status].style}`}
                    >
                      {STATUS[qna.status].name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {format(new Date(qna.createdAt), "yyyy-MM-dd")}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SupportQnAList;

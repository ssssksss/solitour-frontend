import Link from "next/link";

interface ISupportQnA {
  id: number;
  title: string;
  createdAt: string;
  status: "답변 대기중" | "답변 완료";
}

const qnaList: ISupportQnA[] = [
  {
    id: 1,
    title: "회원가입이 안됩니다.",
    createdAt: "2024-08-26",
    status: "답변 대기중",
  },
  {
    id: 2,
    title: "비밀번호를 잊어버렸어요.",
    createdAt: "2024-08-25",
    status: "답변 완료",
  },
  {
    id: 3,
    title: "결제 오류가 발생했습니다.",
    createdAt: "2024-08-24",
    status: "답변 대기중",
  },
  {
    id: 4,
    title: "배송 조회가 안돼요.",
    createdAt: "2024-08-23",
    status: "답변 완료",
  },
  {
    id: 5,
    title: "제품이 불량입니다.",
    createdAt: "2024-08-22",
    status: "답변 대기중",
  },
  {
    id: 6,
    title: "환불이 지연되고 있어요.",
    createdAt: "2024-08-21",
    status: "답변 완료",
  },
  {
    id: 7,
    title: "주문 내역이 보이지 않아요.",
    createdAt: "2024-08-20",
    status: "답변 대기중",
  },
  {
    id: 8,
    title: "프로모션 코드가 적용되지 않아요.",
    createdAt: "2024-08-19",
    status: "답변 완료",
  },
  {
    id: 9,
    title: "이메일 인증이 안됩니다.",
    createdAt: "2024-08-18",
    status: "답변 대기중",
  },
  {
    id: 10,
    title: "주소 변경이 안돼요.",
    createdAt: "2024-08-17",
    status: "답변 완료",
  },
  {
    id: 11,
    title: "고객센터 연결이 어려워요.",
    createdAt: "2024-08-16",
    status: "답변 대기중",
  },
  {
    id: 12,
    title: "상품 상세 정보가 부족해요.",
    createdAt: "2024-08-15",
    status: "답변 완료",
  },
  {
    id: 13,
    title: "배송이 너무 지연되고 있어요.",
    createdAt: "2024-08-14",
    status: "답변 대기중",
  },
  {
    id: 14,
    title: "상품이 잘못 배송되었습니다.",
    createdAt: "2024-08-13",
    status: "답변 완료",
  },
  {
    id: 15,
    title: "상품이 도착하지 않았습니다.",
    createdAt: "2024-08-12",
    status: "답변 대기중",
  },
  {
    id: 16,
    title: "결제가 이중으로 되었습니다.",
    createdAt: "2024-08-11",
    status: "답변 완료",
  },
  {
    id: 17,
    title: "계정을 삭제하고 싶습니다.",
    createdAt: "2024-08-10",
    status: "답변 대기중",
  },
  {
    id: 18,
    title: "회원 등급이 잘못 적용되었습니다.",
    createdAt: "2024-08-09",
    status: "답변 완료",
  },
  {
    id: 19,
    title: "자동 결제가 되지 않았어요.",
    createdAt: "2024-08-08",
    status: "답변 대기중",
  },
  {
    id: 20,
    title: "포인트가 적립되지 않았습니다.",
    createdAt: "2024-08-07",
    status: "답변 완료",
  },
];

const SupportQnA = () => {
  return (
    <div className="flex w-full flex-col">
      <div className={"flex w-full justify-end"}>
        <Link href="/support/qna/write" passHref>
          <button className="hover:scale-105 mb-4 rounded-lg bg-main px-4 py-2 text-white shadow-md transition-colors duration-300">
            질문 등록하기
          </button>
        </Link>
      </div>
      <ul className="m-0 list-none p-0">
        {qnaList.map((qna) => (
          <Link key={qna.id} href={`/support/qna/detail/${qna.id}`}>
            <li className="relative mb-4 flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="mb-2 flex items-start justify-between">
                <span className="text-lg font-medium">{qna.title}</span>
                <span
                  className={`text-xs font-semibold ${qna.status === "답변 완료" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-md px-2 py-1 shadow-sm`}
                >
                  {qna.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{qna.createdAt}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SupportQnA;
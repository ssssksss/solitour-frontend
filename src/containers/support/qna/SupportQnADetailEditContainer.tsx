"use client"

import SupportQnADetailEdit from "@/components/support/qna/SupportQnADetailEdit";
import useAuthStore from "@/store/authStore";
import useToastifyStore from "@/store/toastifyStore";
import { QnADetailType } from "@/types/QnADto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ISupportQnADetailEditContainer {
  data: QnADetailType;
}
const SupportQnADetailEditContainer = ({data}: ISupportQnADetailEditContainer) => {
  const authStore = useAuthStore();
  const toastifyStore =  useToastifyStore();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [messageList, setMessageList] = useState(data.qnaMessages || []);

  const changeInputHandler = (value: string) => {
    setContent(value);
  }

const questionSubmitHandler = async () => {
  if (!content.trim()) {
    alert("답변 내용을 입력해 주세요.");
    return;
  }

  try {
    const response = await fetchWithAuth(`/api/support/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        qnaId: data.id,
      }),
    });

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "QnA 질문 등록에 실패했습니다."
      })
    }

    toastifyStore.setToastify({
      type: "success",
      message: "QnA 질문 등록에 성공했습니다.",
    });
    router.push("/support?menu=qna");
    

  } catch (error) {
    console.error("답변 등록 중 오류: ", error);
    alert("답변 등록에 실패했습니다. 다시 시도해 주세요.");
  }
  };
 
  const qnaCloseHandler = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/support/qna?id=${data.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("서버에 요청하는 중 오류가 발생했습니다.");
        }

      router.replace("/support?menu=qna");

      } catch (error) {
        console.error("QnA 삭제 중 오류: ", error);
        alert("QnA 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
  }

// 상태값을 늦게 불러와 렌더링이 약간 이상해짐 임시 해결
  return (
    <>
      <SupportQnADetailEdit
        data={data}
        messageList={messageList}
        userId={authStore.id}
        changeInputHandler={changeInputHandler}
        questionSubmitHandler={questionSubmitHandler}
        qnaCloseHandler={qnaCloseHandler}
      />
    </>
  );
};
export default SupportQnADetailEditContainer
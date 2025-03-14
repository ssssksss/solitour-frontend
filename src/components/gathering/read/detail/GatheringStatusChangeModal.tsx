"use client";

import HashSpinner from "@/shared/ui/hashSpinner/HashSpinner";
import ModalTemplate from "@/components/common/modal/ModalTemplate";
import useToastifyStore from "@/stores/toastifyStore";
import { IModalComponent } from "@/types/ModalState";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose } from "react-icons/md";

interface GatheringStatusChangeModalProps extends IModalComponent {
  isFinish: boolean;
}

const GatheringStatusChangeModal = ({
  isFinish,
  ...props
}: GatheringStatusChangeModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const toastifyStore = useToastifyStore();

  const handleRemoveClick = async () => {
    setLoading(true);

    // 모임 제거
    const response = await fetchWithAuth(
      `/api/gathering/finish?isFinish=${isFinish}&id=${params.id}`,
      {
        method: "PUT",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "모임 마감에 실패했습니다.",
      });
      setLoading(false);
      props.closeModal!();
      return;
      // throw new Error(response.statusText);
    }

    router.replace("/gathering");
    router.refresh();
  };

  return (
    <ModalTemplate className="max-h-[20rem] w-full max-w-[28rem]">
      <button
        onClick={props.closeModal}
        className="absolute right-[2rem] top-[2rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
        style={{ zIndex: 200 }}
      >
        <MdClose
          className="bg-red-60 cursor-pointer text-gray2 hover:text-main"
          size={"2.5rem"}
          onClick={props.closeModal}
        />
      </button>
      <HashSpinner loading={loading} />
      <div className="flex h-fit w-96 flex-col items-center justify-center gap-6 rounded-xl bg-white p-6">
        <h1 className="text-3xl">모임을 마감하시겠습니까?</h1>
        <div className="text-gray1">
          {[
            "모임을 마감하시면 추가적으로 인원을 받을 수 없고 검색에서 제외됩니다.",
            "단, 기존 승인된 회원은 조회가 가능합니다.",
          ].map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="h-10 select-none rounded-full bg-main px-8 text-white hover:scale-105"
            onClick={handleRemoveClick}
          >
            삭제
          </button>
          <button
            className="h-10 select-none rounded-full bg-black px-8 text-white hover:scale-105"
            onClick={props.closeModal}
          >
            취소
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default GatheringStatusChangeModal;

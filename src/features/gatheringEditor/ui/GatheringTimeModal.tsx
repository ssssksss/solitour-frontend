"use client";

import Image from "next/image";
import { ModalTemplate } from "@/shared/ui/modal";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useGatheringTimeModal } from "../model/useGatheringTimeModal";

interface GatheringTimeModalProps {
  closeModal: () => void;
}

export const GatheringTimeModal = ({ closeModal }: GatheringTimeModalProps) => {
  const { formContext, startDatetime, setStartDatetime, handleSubmit } =
    useGatheringTimeModal(closeModal);

  return (
    <ModalTemplate
      className="max-h-[22rem] w-[calc(100vw-1rem)] max-w-[30rem]"
      closeModal={closeModal}
    >
      <div className="flex min-h-full flex-col items-center justify-start bg-white">
        <h2 className="w-full text-start text-2xl font-bold text-black">
          시간 선택
        </h2>
        <div className="flex w-full flex-col items-center gap-x-5 max-[440px]:max-w-[18.625rem]">
          <div className="flex w-full justify-center gap-5 py-[4.1875rem] max-[440px]:flex-col max-[440px]:p-[2.875rem_0px_1.6875rem_0px]">
            {/* 날짜 */}
            <article className="flex w-[9.75rem] items-center rounded-[4rem] px-6 py-2 outline -outline-offset-1 outline-[#E3E3E3] max-[440px]:col-span-2 max-[440px]:w-full">
              {format(
                formContext.getValues("scheduleStartDate")
                  ? new Date(formContext.getValues("scheduleStartDate"))
                  : new Date(),
                "yyyy.MM.dd(EE)",
                {
                  locale: ko,
                },
              )}
            </article>
            <div className="flex w-full gap-5 max-[440px]:max-w-[18.625rem]">
              {/* 시 */}
              <article className="relative flex h-11 w-[6.375rem] gap-1.5 max-[440px]:w-full">
                <select
                  name="hour"
                  className="w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline -outline-offset-1 outline-[#E3E3E3] max-[440px]:w-full"
                  onChange={(e) =>
                    setStartDatetime((prev) => ({
                      ...prev,
                      hour: +e.target.value,
                    }))
                  }
                  value={startDatetime.hour}
                >
                  {Array.from({ length: 24 }, (_, i) => i).map((i) => (
                    <option value={i} key={i} defaultChecked={i == 12}>
                      {i}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-10 -translate-y-1/2">
                  <Image
                    src="/icons/dropdown-down-arrow.svg"
                    alt="dropdown-down-arrow"
                    width={8}
                    height={4}
                  />
                </div>
                <div className="flex items-center"> 시 </div>
              </article>
              {/* 분 */}
              <article className="relative flex h-11 w-[6.375rem] gap-1.5 max-[440px]:w-full">
                <select
                  name="minute"
                  className="w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline -outline-offset-1 outline-[#E3E3E3] max-[440px]:w-full"
                  onChange={(e) =>
                    setStartDatetime((prev) => ({
                      ...prev,
                      minute: +e.target.value,
                    }))
                  }
                  value={startDatetime.minute}
                >
                  {Array.from(
                    [...Array(6).fill(0)],
                    (_, index) => index * 10,
                  ).map((i) => (
                    <option
                      value={i}
                      selected={i == 0}
                      key={i}
                      defaultValue={0}
                    >
                      {i}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-10 -translate-y-1/2">
                  <Image
                    src="/icons/dropdown-down-arrow.svg"
                    alt="dropdown-down-arrow"
                    width={8}
                    height={4}
                  />
                </div>
                <div className={"flex items-center"}> 분 </div>
              </article>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="bg-main disabled:bg-gray1 h-[3.375rem] w-full max-w-[18.625rem] shrink-0 rounded-[1.75rem] text-white"
            onClick={() => handleSubmit()}
          >
            적용하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

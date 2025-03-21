import ModalTemplate from "@/shared/ui/modal/ModalTemplate";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

interface GatheringTimeModalProps {
  closeModal: () => void;
  closeButtonComponent?: ReactNode;
}

const GatheringTimeModal = ({
  closeModal,
  closeButtonComponent,
}: GatheringTimeModalProps) => {
  const formContext = useFormContext();
  const [startDateTime, setStartDateTime] = useState({
    hour: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "HH")
      : new Date().getHours(),
    minute: formContext.getValues("scheduleStartDate")
      ? +format(new Date(formContext.getValues("scheduleStartDate")), "mm")
      : Math.min(50, Math.ceil(new Date().getMinutes() / 10) * 10),
  });

  const submitHandler = () => {
    formContext.setValue(
      "scheduleStartDate",
      format(
        new Date(formContext.getValues("scheduleStartDate")),
        "yyyy-MM-dd ",
      ) +
        (startDateTime.hour + "").padStart(2, "0") +
        ":" +
        (startDateTime.minute + "").padStart(2, "0"),
    );
    formContext.watch();
    formContext.trigger(["scheduleStartDate"]);
    closeModal();
  };

  return (
    <ModalTemplate className="max-h-[22rem] w-[calc(100vw-1rem)] max-w-[30rem]">
      {closeButtonComponent}
      <div className="flex min-h-full flex-col items-center justify-start bg-white">
        <h2 className="w-full text-start text-2xl font-bold text-black">
          시간 선택
        </h2>
        <div className="flex w-full flex-col items-center gap-x-[1.25rem] max-[440px]:max-w-[18.625rem]">
          <div className="flex w-full justify-center gap-[1.25rem] py-[4.1875rem] max-[440px]:flex-col max-[440px]:p-[2.875rem_0px_1.6875rem_0px]">
            {/* 날짜 */}
            <article className="flex w-[9.75rem] items-center rounded-[4rem] px-[1.5rem] py-[.5rem] outline outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:col-span-2 max-[440px]:w-full">
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
            <div className="flex w-full gap-[1.25rem] max-[440px]:max-w-[18.625rem]">
              {/* 시 */}
              <article className="relative flex h-[2.75rem] w-[6.375rem] gap-[6px] max-[440px]:w-full">
                <select
                  name="hour"
                  className="w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:w-full"
                  onChange={(e) =>
                    setStartDateTime((prev) => ({
                      ...prev,
                      hour: +e.target.value,
                    }))
                  }
                  value={startDateTime.hour}
                >
                  {Array.from({ length: 24 }, (_, i) => i).map((i) => (
                    <option value={i} key={i} defaultChecked={i == 12}>
                      {i}
                    </option>
                  ))}
                </select>
                <div className="absolute top-1/2 right-[2.5rem] -translate-y-1/2">
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
              <article className="relative flex h-[2.75rem] w-[6.375rem] gap-[6px] max-[440px]:w-full">
                <select
                  name="minute"
                  className="w-[5.125rem] cursor-pointer appearance-none rounded-[4rem] pl-[1.3125rem] outline outline-offset-[-1px] outline-[#E3E3E3] max-[440px]:w-full"
                  onChange={(e) =>
                    setStartDateTime((prev) => ({
                      ...prev,
                      minute: +e.target.value,
                    }))
                  }
                  value={startDateTime.minute}
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
                <div className="absolute top-1/2 right-[2.5rem] -translate-y-1/2">
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
            onClick={() => submitHandler()}
          >
            적용하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default GatheringTimeModal;

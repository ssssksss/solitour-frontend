"use client";

import { AGE_RANGE, GENDER } from "@/entities/user";
import { ModalTemplate } from "@/shared/ui/modal";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

interface GatheringParticipantsFilterModalProps {
  closeModal: () => void;
}

export const GatheringParticipantsFilterModal = ({
  closeModal,
}: GatheringParticipantsFilterModalProps) => {
  const formContext = useFormContext<GatheringForm>();
  const [peopleCount, setPeopleCount] = useState(
    formContext.getValues("personCount") || 5,
  );
  const [sex, setSex] = useState(formContext.getValues("allowedSex"));
  const [startAge, setStartAge] = useState<number | undefined>(
    formContext.getValues("startAge")
      ? new Date().getFullYear() - formContext.getValues("startAge")
      : 20,
  );
  const [endAge, setEndAge] = useState<number | undefined>(
    formContext.getValues("endAge")
      ? new Date().getFullYear() - formContext.getValues("endAge")
      : 59,
  );
  const [directInput, setDirectInput] = useState(false);

  const submitHandler = () => {
    formContext.setValue(
      "startAge",
      new Date().getFullYear() - (startAge || 0),
    );
    formContext.setValue("endAge", new Date().getFullYear() - (endAge || 0));
    formContext.setValue("personCount", peopleCount);
    formContext.setValue("allowedSex", sex);
    formContext.watch();
    formContext.trigger(["startAge", "endAge", "personCount", "allowedSex"]);
    closeModal();
  };

  const ageHandler = ({
    _startAge,
    _endAge,
  }: {
    _startAge: number;
    _endAge: number;
  }) => {
    setDirectInput(false);
    if ((endAge || 0) + 1 == _startAge) {
      setEndAge(_endAge);
    } else if ((startAge || 0) - 1 == _endAge) {
      setStartAge(_startAge);
    } else {
      setStartAge(_startAge);
      setEndAge(_endAge);
    }
  };

  return (
    <ModalTemplate
      className="max-h-160 w-[calc(100vw-1rem)] max-w-140 p-6"
      closeModal={closeModal}
    >
      <h2 className="h-8 text-2xl font-bold text-black">참여자 선택</h2>
      <section className="flex w-full flex-col gap-y-8 pt-12">
        <article className="flex items-center gap-20">
          <div className="flex h-11 items-center justify-center font-bold text-black">
            인원
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              className={[
                peopleCount <= 2 && "invisible",
                "flex h-11 items-center hover:scale-105",
              ].join(" ")}
              type="button"
              onClick={() =>
                setPeopleCount(peopleCount <= 2 ? 2 : peopleCount - 1)
              }
            >
              <Image
                src="/icons/minus-icon.svg"
                alt="minus-icon"
                width={28}
                height={28}
              />
            </button>
            <p className="w-12 text-center">{peopleCount} 명</p>
            <button
              className={[
                peopleCount >= 10 && "invisible",
                "flex h-11 items-center hover:scale-105",
              ].join(" ")}
              type="button"
              onClick={() =>
                setPeopleCount(peopleCount >= 10 ? 10 : peopleCount + 1)
              }
            >
              <Image
                src="/icons/plus-icon.svg"
                alt="plus-icon"
                width={28}
                height={28}
              />
            </button>
          </div>
        </article>
        <article className="flex w-full flex-col gap-y-4">
          <div className="h-8 text-start font-bold text-black">나이</div>
          <div className="relative flex w-full flex-col gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {Object.entries(AGE_RANGE).map((i) => (
                <button
                  key={i[0]}
                  onClick={() =>
                    ageHandler({
                      _startAge: i[1].startAge,
                      _endAge: i[1].endAge,
                    })
                  }
                  className={[
                    directInput == false &&
                    (startAge || 0) <= i[1].startAge &&
                    (endAge || 0) >= i[1].endAge
                      ? "bg-main text-white"
                      : "outline -outline-offset-1 outline-[#E9EBED]",
                    "text-gray1 hover:bg-main flex shrink-0 items-center rounded-[4rem] px-4 py-2 hover:text-white",
                  ].join(" ")}
                >
                  {i[0]}
                </button>
              ))}
              <button
                className={[
                  directInput
                    ? "bg-main text-white"
                    : "outline -outline-offset-1 outline-[#E9EBED]",
                  "text-gray1 hover:bg-main rounded-[4rem] px-4 py-2 hover:text-white",
                ].join(" ")}
                onClick={() => setDirectInput(true)}
              >
                직접 입력
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="relative flex w-20.5 items-center py-2 pr-2.5 after:content-['세']">
                <input
                  className="w-full text-center text-lg outline-none placeholder:text-sm"
                  placeholder="최소 20"
                  type="text"
                  disabled={!directInput}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                      // ? endAge값을 넘었는가?
                      if (num > (endAge || 0)) {
                        if ((endAge || 0) < 60) {
                          setEndAge(num);
                        }
                      }
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                    }
                    setStartAge(num || undefined);
                  }}
                  value={startAge || undefined}
                />
                <div className="absolute bottom-2 h-[1px] w-20.5 bg-black"></div>
                <div className="text-main absolute -bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center font-semibold">
                  {new Date().getFullYear() - (startAge || 0)} 년생
                </div>
              </div>
              <div> ~ </div>
              <div className="relative flex w-20.5 items-center py-2 pr-2.5 after:content-['세']">
                <input
                  className="w-full pr-2.5 text-center text-lg outline-none placeholder:text-sm"
                  placeholder="최대 59"
                  type="text"
                  max={59}
                  disabled={!directInput}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                      // ? startAge값보다 작은가?
                      if (num < (startAge || 0)) {
                        if (startAge || 0 > 19) {
                          setStartAge(num);
                        }
                      }
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                    }
                    setEndAge(num || undefined);
                  }}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, "");
                  }}
                  value={endAge}
                />
                <div className="absolute bottom-2 h-[1px] w-20.5 bg-black"></div>
                <div className="text-main absolute -bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center font-semibold">
                  {new Date().getFullYear() - (endAge || 0)} 년생
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="flex flex-col gap-y-4 pt-4">
          <div className="h-8 text-start font-bold text-black">성별 제한</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.entries(GENDER).map((i) => (
              <button
                key={i[0]}
                className={[
                  sex == i[0]
                    ? "bg-main text-white"
                    : "text-gray-1 outline -outline-offset-1 outline-[#E9EBED]",
                  "flex items-center rounded-[4rem] px-4 py-2",
                ].join(" ")}
                onClick={() => setSex(i[0])}
              >
                {i[1]}
              </button>
            ))}
          </div>
        </article>
      </section>
      <div className="flex w-full justify-center gap-4 pt-8">
        <button
          className="bg-main disabled:bg-gray1 h-12 w-full max-w-74.5 rounded-[4rem] px-4 py-2 text-white"
          disabled={
            !sex ||
            (startAge || 0) < 20 ||
            (endAge || 0) > 59 ||
            (endAge || 0) < 20
          }
          onClick={() => submitHandler()}
        >
          적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};

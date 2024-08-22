import {
  SETTING_MODAL_AGE,
  SETTING_MODAL_SEX
} from "@/constants/gathering/GatheringConstant";
import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
interface IGatheringParticipantsFilterModalProps {
  closeModal: () => void;
}


const GatheringParticipantsFilterModal = (props: IGatheringParticipantsFilterModalProps) => {
  const formContext = useFormContext();
  const [peopleCount, setPeopleCount] = useState(formContext.getValues("personCount") || 5);
  const [sex, setSex] = useState(formContext.getValues("allowedSex"));
  const [startAge, setStartAge] = useState(formContext.getValues("startAge") ? new Date().getFullYear() - formContext.getValues("startAge") : 20);
  const [endAge, setEndAge] = useState(formContext.getValues("endAge") ? new Date().getFullYear() - formContext.getValues("endAge") : 59);


  const submitHandler = () => {
    formContext.setValue("startAge", new Date().getFullYear() - startAge);
    formContext.setValue("endAge", new Date().getFullYear() - endAge);
    formContext.setValue("personCount", peopleCount);
    formContext.setValue("allowedSex", sex);
    formContext.watch();
    formContext.trigger(["startAge", "endAge", "personCount", "allowedSex"]);
    props.closeModal();
  };

  return (
    <div
      className={
        "relative h-full max-h-[44.5rem] w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}>
        {" "}
        참여자 선택{" "}
      </h2>
      <section className="flex w-full flex-col gap-y-[2rem] pt-[3rem]">
        <article
          className={"flex max-w-[16.25rem] justify-between gap-y-[1rem]"}
        >
          <div className={"h-[2rem] font-bold text-black"}> 인원 </div>
          <div
            className={"flex flex-wrap items-center gap-x-[1rem] gap-y-[.5rem]"}
          >
            <div
              className="flex h-[2rem] items-center"
              onClick={() => {
                setPeopleCount(peopleCount <= 2 ? 2 : peopleCount - 1);
              }}
            >
              {peopleCount > 2 ? (
                <Image
                  src={"/minus-icon.svg"}
                  alt={"minus-icon"}
                  width={20}
                  height={20}
                />
              ) : (
                <div className="aspect-square w-[1.25rem]"> </div>
              )}
            </div>
            <div className="flex h-[2rem] w-[2.5rem] items-center justify-center">
              <div className={"w-[1rem]"}> {peopleCount} </div> 명
            </div>
            <div
              className="flex h-[2rem] items-center"
              onClick={() => {
                setPeopleCount(peopleCount >= 10 ? 10 : peopleCount + 1);
              }}
            >
              {peopleCount < 10 ? (
                <Image
                  src={"/plus-icon.svg"}
                  alt={"plus-icon"}
                  width={20}
                  height={20}
                />
              ) : (
                <div className="aspect-square w-[1.25rem]"> </div>
              )}
            </div>
          </div>
        </article>
        <article className={"flex w-full flex-col gap-y-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 나이 </div>
          <div className="relative flex w-full flex-col gap-[1rem]">
            <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
              {Object.entries(SETTING_MODAL_AGE).map((i) => (
                <button
                  key={i[0]}
                  onClick={() => {
                    setStartAge(i[1].startAge);
                    setEndAge(i[1].endAge);
                  }}
                  className={
                    "flex h-[2rem] flex-shrink-0 items-center rounded-[4rem] px-[1rem] py-[.5rem] text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED] hover:bg-main hover:text-white"
                  }
                >
                  {i[0]}
                </button>
              ))}
            </div>
            <div
              className={
                "flex flex-wrap items-center gap-x-[1rem] gap-y-[.5rem]"
              }
            >
              <div
                className={
                  "relative flex w-[5.125rem] py-[.5rem] pr-[0.625rem] after:content-['세']"
                }
              >
                <input
                  placeholder="최소 20"
                  min={20}
                  max={59}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                      // ? endAge값을 넘었는가?
                      if (num > endAge) {
                        if (endAge < 60) {
                          setEndAge(num);
                        }
                      }
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                    }
                    setStartAge(num);
                  }}
                  value={startAge}
                  className="w-full text-center"
                />
                <div
                  className={"absolute bottom-2 h-[1px] w-[5.125rem] bg-black"}
                ></div>
                <div
                  className={
                    "absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main"
                  }
                >
                  {new Date().getFullYear() - startAge} 년생
                </div>
              </div>
              <div> ~ </div>
              <div
                className={
                  "relative flex w-[5.125rem] py-[.5rem] pr-[0.625rem] after:content-['세']"
                }
              >
                <input
                  placeholder="최대 59"
                  min={20}
                  max={59}
                  onChange={(e) => {
                    let num = Number(e.target.value);
                    if (e.target.value.length > 1) {
                      // ? 최소 나이값보다 작은가?
                      if (num < 20) num = 20;
                      // ? startAge값보다 작은가?
                      if (num < startAge) {
                        if (startAge > 19) {
                          setStartAge(num);
                        }
                      }
                      // ? 최대값을 넘었는가?
                      if (num > 59) {
                        num = 59;
                      }
                    }
                    setEndAge(num);
                  }}
                  value={endAge}
                  className="w-full pr-[0.625rem] text-center"
                />
                <div
                  className={"absolute bottom-2 h-[1px] w-[5.125rem] bg-black"}
                ></div>
                <div
                  className={
                    "absolute bottom-[-1.5rem] left-[50%] flex w-full translate-x-[-50%] justify-center font-semibold text-main"
                  }
                >
                  {new Date().getFullYear() - endAge} 년생
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className={"flex flex-col gap-y-[1rem] pt-[1rem]"}>
          <div className={"h-[2rem] font-bold text-black"}> 성별 제한 </div>
          <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
            {Object.entries(SETTING_MODAL_SEX).map((i) => (
              <button
                key={i[0]}
                onClick={() => setSex(i[0])}
                className={`${
                  sex == i[0] ? "bg-main text-white" : "text-gray1"
                } flex h-[2rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[1]}
              </button>
            ))}
          </div>
        </article>
      </section>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          className={`h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1`}
          disabled={!sex}
          onClick={() => submitHandler()}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringParticipantsFilterModal;

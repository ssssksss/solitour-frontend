import {
  SETTING_MODAL_SEX
} from "@/constants/gathering/GatheringConstant";
import "@/styles/reactDataRange.css";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IGatheringParticipantsFilterModalProps {
  closeModal: () => void;
}


const GatheringParticipantsFilterModal = (props: IGatheringParticipantsFilterModalProps) => {
  const formContext = useFormContext();
  const [peopleCount, setPeopleCount] = useState(formContext.getValues("personCount") || 6);
  const [sex, setSex] = useState(formContext.getValues("allowedSex"));
  const [startAge, setStartAge] = useState(formContext.getValues("startAge") ? new Date().getFullYear() - formContext.getValues("startAge") : 20);
  const [endAge, setEndAge] = useState(formContext.getValues("endAge") ? new Date().getFullYear() - formContext.getValues("endAge") : 59);
  const [values, setValues] = useState([startAge, endAge]);
  const markerPositions = [20, 25, 30, 35, 40, 45, 50, 55, 59];

const onClickDecreaseMinAge = () => {
  let temp = Math.max(20, startAge - 1);
  if (temp <= endAge) {
    setStartAge(temp);
    setValues((prev) => [temp, prev[1]]);
  }
};

const onClickImproveMinAge = () => {
  let temp = Math.min(endAge, startAge + 1);
  setStartAge(temp);
  setValues((prev) => [temp, prev[1]]);
};

const onClickDecreaseMaxAge = () => {
  let temp = Math.max(startAge, endAge - 1);
  setEndAge(temp);
  setValues((prev) => [prev[0], temp]);
};

const onClickImproveMaxAge = () => {
  let temp = Math.min(59, endAge + 1);
  if (temp >= startAge) {
    setEndAge(temp);
    setValues((prev) => [prev[0], temp]);
  }
};

  const handleChange = (newValues: number[] | number) => {
    const valuesArray = newValues as number[];
    setValues(valuesArray);
    setStartAge(valuesArray[0]);
    setEndAge(valuesArray[1]);
  };

  const handleMarkerClick = (age: number) => {
    const distanceToStart = Math.abs(startAge - age);
    const distanceToEnd = Math.abs(endAge - age);

    if (distanceToStart < distanceToEnd) {
      // Update startAge if it's closer to the clicked age
      const newStartAge = age;
      setStartAge(newStartAge);
      setValues([newStartAge, endAge]);
    } else {
      // Update endAge if it's closer to the clicked age
      const newEndAge = age;
      setEndAge(newEndAge);
      setValues([startAge, newEndAge]);
    }
  };

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
        "relative h-full max-h-[44rem] w-[calc(100vw-1rem)] max-w-[40rem] overflow-y-auto rounded-2xl bg-white p-[1rem] scrollbar-hide"
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
      <h2 className={"h-[2rem] pt-[3rem] text-2xl font-bold text-black"}>
        참여자 선택
      </h2>
      <section className="flex w-full flex-col gap-y-[4rem] pt-[3rem]">
        <article className={"flex w-full flex-col gap-x-4"}>
          <div
            className={
              "flex h-[2rem] items-center gap-x-2 font-bold text-black"
            }
          >
            <div className={"min-w-fit text-xl"}> 인원 </div>
            <div className="flex h-[2rem] w-full items-center justify-end">
              <div className={"w-[2rem]"}>{peopleCount}</div> 명
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-x-[1rem] gap-y-[1.5rem]">
            <Slider
              min={2}
              max={10}
              value={peopleCount}
              onChange={(value) => setPeopleCount(value)}
              trackStyle={[
                {
                  backgroundColor: "#0d6efd",
                  height: 30,
                },
              ]}
              handleStyle={{
                height: 30,
                width: 30,
                borderRadius: 50,
                borderColor: "#0d6efd00",
                backgroundColor: "#ffffff00",
                transform: "translate(-50%, 8px)",
                opacity: 0,
              }}
              railStyle={{ backgroundColor: "#ddd", height: 32 }}
            />
          </div>
        </article>
        <article className="flex w-full flex-col gap-y-[2rem]">
          <div className="font-bold text-black">
            <span className="text-xl"> 나이 </span>
            <div className="flex w-full justify-between">
              <div>
                <span> {new Date().getFullYear() - startAge} 년생 </span>
                <span> {`(${startAge} 세)`} </span>
              </div>
              <div>
                <span> {new Date().getFullYear() - endAge} 년생 </span>
                <span> {`(${endAge} 세)`} </span>
              </div>
            </div>
            <div className="flex h-[3rem] select-none items-center justify-between gap-x-4 pt-[1rem]">
              <div className="flex w-full rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <button
                  className="flex h-[3rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickDecreaseMinAge()}
                >
                  <Image
                    src={"/calendar-prev-arrow-icon.svg"}
                    alt={"prev-icon"}
                    width={12}
                    height={12}
                  />
                </button>
                <button
                  className="flex h-[3rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickImproveMinAge()}
                >
                  <Image
                    src={"/calendar-next-arrow-icon.svg"}
                    alt={"next-icon"}
                    width={12}
                    height={12}
                  />
                </button>
              </div>
              <div className="flex w-full rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <button
                  className="flex h-[3rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickDecreaseMaxAge()}
                >
                  <Image
                    src={"/calendar-prev-arrow-icon.svg"}
                    alt={"prev-icon"}
                    width={12}
                    height={12}
                  />
                </button>
                <button
                  className="flex h-[3rem] w-full flex-col items-center justify-center"
                  onClick={() => onClickImproveMaxAge()}
                >
                  <Image
                    src={"/calendar-next-arrow-icon.svg"}
                    alt={"next-icon"}
                    width={12}
                    height={12}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex w-full flex-col gap-[1rem] pb-[2rem]">
            <Slider
              range
              min={20}
              max={59}
              value={values}
              onChange={handleChange}
              step={1}
              dotStyle={{ display: "none" }}
              activeDotStyle={{ display: "none" }}
              handleStyle={[
                {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  borderColor: "#0d6efd00",
                  backgroundColor: "#ffffff00",
                  transform: "translate(-50%, 8px)",
                  opacity: 0,
                },
                {
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                  borderColor: "#0d6efd00",
                  backgroundColor: "#ffffff00",
                  transform: "translate(-50%, 8px)",
                  opacity: 0,
                },
              ]}
              trackStyle={[
                {
                  backgroundColor: "#0d6efd",
                  height: 30,
                },
              ]}
              railStyle={{ backgroundColor: "#ddd", height: 32 }}
            />
            <div className="absolute left-0 right-0 top-[5rem] flex justify-between px-4">
              {markerPositions.map((age) => (
                <button
                  key={age}
                  onClick={() => handleMarkerClick(age)}
                  className={
                    "left-[-1rem] top-[-1.5rem] flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full bg-gray2 text-center text-white transition-transform duration-200 hover:bg-main " +
                    `${age >= startAge && age <= endAge && "bg-main"}`
                  }
                  style={{
                    position: "relative",
                    transform: `translateX(${((age - 20) / 39) * 100}%)`,
                  }}
                >
                  <div className="text-md absolute font-medium">{age}</div>
                </button>
              ))}
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
                } flex h-[2.5rem] select-none items-center rounded-[4rem] px-[1.5rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[1]}
              </button>
            ))}
          </div>
        </article>
      </section>
      <div className={"flex w-full justify-center gap-[1rem] pt-[4rem]"}>
        <button
          className={`h-[3rem] min-w-[8rem] select-none rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1`}
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

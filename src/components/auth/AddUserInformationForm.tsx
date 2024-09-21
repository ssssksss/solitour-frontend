"use client"

import { useRef, useState } from "react";

interface IAddUserInformationForm {

}
const AddUserInformationForm = (props: IAddUserInformationForm) => {
  const [sex, setSex] = useState("");
    const [date, setDate] = useState({
      year: "",
      month: "",
      day: "",
    });

    const monthRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);

  // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;

    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "year" && value.length === 4) {
      monthRef.current?.focus();
    }

    if (name === "month" && value.length === 2) {
      dayRef.current?.focus();
    }
  };

  return (
    <section
      className={
        "flex max-w-[31.25rem] max-h-[calc(100vh-1rem)] overflow-y-scroll scrollbar-hide flex-col items-center rounded-b-[1rem] bg-white px-[3.5rem] pb-[2rem] pt-[.5rem]"
      }
    >
      <h2 className="text-[1.625rem] font-bold text-black">
        안녕하세요 솔리투어입니다
      </h2>
      <p className="mt-[0.625rem] max-w-[15.875rem] text-center text-gray1">
        신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
      </p>
      <div className="mt-[1.25rem] flex w-full max-w-[24.25rem] flex-col gap-y-[2.375rem] rounded-[1.125rem] bg-[#F7F7F7] px-[2.25rem] pb-[1.875rem] pt-[1.5rem]">
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 성별 </h3>
          <div className={"mt-3 flex h-10 w-full gap-x-3"}>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${sex == "MALE" ? "font-bold bg-[#F2FAF7] text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => setSex("MALE")}
            >
              남성
            </button>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${sex == "FEMALE" ? "font-bold bg-[#F2FAF7] text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => setSex("FEMALE")}
            >
              여성
            </button>
          </div>
        </article>
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 생년월일 </h3>
          <div className="mt-3 flex h-10 items-center justify-center rounded-[1.5rem] bg-white py-[0.375rem] text-main outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#F0F0F0]">
            <input
              type="text"
              name="year"
              value={date.year}
              onChange={handleInputChange}
              placeholder="YYYY"
              maxLength={4}
              min={1965}
              className="w-[2.5rem] bg-transparent text-center outline-none"
              />
            <span className="">.</span>
            <input
              type="text"
              name="month"
              value={date.month}
              onChange={handleInputChange}
              placeholder="MM"
              maxLength={2}
              ref={monthRef}
              className="w-[1.675rem] bg-transparent text-center outline-none"
              />
            <span className="">.</span>
            <input
              type="text"
              name="day"
              value={date.day}
              onChange={handleInputChange}
              placeholder="DD"
              maxLength={2}
              ref={dayRef}
              className="w-[1.375rem] bg-transparent text-center outline-none"
            />
          </div>
        </article>
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 이름 </h3>
          <input
            type={"text"}
            className={"mt-3 h-10 w-full rounded-[1.5rem] px-3"}
            placeholder="이름을 입력해주세요"
          />
        </article>
      </div>
      <p className="mt-[0.875rem] max-w-[18.125rem] text-center text-sm text-gray1">
        정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
        제한될 수 있습니다
      </p>
      <button
        className={"mt-5 min-h-[4rem] w-full rounded-[1.5rem] bg-main text-white"}
      >
        입력 완료
      </button>
    </section>
  );
};
export default AddUserInformationForm
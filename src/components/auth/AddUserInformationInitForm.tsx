"use client"

import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

interface IAddUserInformationInitForm {
  kakaoLogin: () => void;
  addUserInformationSubmit: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const AddUserInformationInitForm = ({kakaoLogin, addUserInformationSubmit, handleInputChange}: IAddUserInformationInitForm) => {

   const formContext = useFormContext();

return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center bg-white flex-col px-[3.5rem]"
      style={{ zIndex: "100" }}
  >


     <section
       className={
         "flex max-h-[calc(100vh-1rem)] w-full flex-col items-center overflow-y-scroll rounded-b-[1rem] bg-white px-[3.5rem] pb-[2rem] pt-[.5rem] scrollbar-hide outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-gray2 rounded-[1rem]"
       }
     >
  <div className="flex w-full py-4">
        <Link
        href={"/"}
        className="relative bg-gray p-2 bg-[#F7F7F7] rounded-[1rem] z-50 scale-100 transform transition-transform duration-300"
      >
        {/* <MdClose
          className="cursor-pointer text-gray2 hover:text-main"
          size={"2.5rem"}
        /> */}
        <Image
          className="aspect-square"
          src="/home/home-icon.svg"
          alt="home-icon"
          width={24}
          height={24}
        />
      </Link>
    </div>
       <h2 className="text-[1.625rem] font-bold text-black">
         안녕하세요 솔리투어입니다
       </h2>
       <p className="mt-[0.625rem] max-w-[15.875rem] text-center text-gray1">
         신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
       </p>
       <div className="mt-[1.25rem] flex w-full flex-col gap-y-[2.375rem] rounded-[1.125rem] bg-[#F7F7F7] px-[2.25rem] pb-[1.875rem] pt-[1.5rem]">
         <article className="flex flex-col">
           <h3 className="text-[1.125rem] font-bold text-black"> 이름 </h3>
           <input
             type={"text"}
             className={`mt-3 h-[3rem] py-2 w-full rounded-[1.5rem] px-3 text-center text-main focus:outline-main`}
             placeholder="이름을 입력해주세요"
             maxLength={10}
             {...formContext.register("name")}
           />
         </article>
         <article className="flex flex-col">
           <h3 className="text-[1.125rem] font-bold text-black"> 성별 </h3>
           <div className={"mt-3 flex w-full gap-x-3 h-[3rem]"}>
             <button
               className={`h-full w-full py-4 rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${formContext.getValues("sex") == "male" ? "bg-[#F2FAF7] font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
               onClick={() => {
                 formContext.setValue("sex", "male");
                 formContext.trigger();
               }}
             >
               남성
             </button>
             <button
               className={`h-full w-full py-4 rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${formContext.getValues("sex") == "female" ? "bg-[#F2FAF7] font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
               onClick={() => {
                 formContext.setValue("sex", "female");
                 formContext.trigger();
               }}
             >
               여성
             </button>
           </div>
         </article>
         <article className="flex flex-col">
          <h3 className="flex items-center gap-x-2 text-[1.125rem] font-bold text-black"> 연도(나이) </h3>
          <span className="text-gray2 flex items-center"> 현재는  {new Date().getFullYear() - 58} ~ {new Date().getFullYear() - 19}년생만 모임 서비스를 이용할 수 있습니다. </span>
           <div className="mt-3 flex items-center justify-center rounded-[1.5rem] bg-white text-main outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#F0F0F0]">
             <input
               type="text"
               name="year"
               onChange={handleInputChange}
               placeholder="YYYY"
               maxLength={4}
               className="w-full h-[3rem] bg-transparent text-center outline-none py-2"
             />
           </div>
         </article>
       </div>
       <p className="mt-[0.875rem] max-w-[18.125rem] text-center text-sm text-gray1">
         정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
         제한될 수 있습니다
      </p>
      <label className={"flex w-full gap-x-2 mt-4 items-center"}>
        <input className={"w-6 h-6"} type={"checkbox"} checked={formContext.getValues("isCheckTerm")} onChange={() => {
          formContext.setValue("isCheckTerm", !formContext.getValues("isCheckTerm"))
          formContext.trigger();
        }} />
        <span>  [필수] 솔리투어 이용약관 </span>
        <a href="/support?menu=terms#terms-of-service" target="_blanket" className={`ml-auto hover:text-main`}> 보기 </a>
      </label>
      <label className={"flex w-full gap-x-2 mt-2 items-center"}>
          <input className={"w-6 h-6"} type={"checkbox"} checked={formContext.getValues("isCheckPrivacy")} onChange={() => {
            formContext.setValue("isCheckPrivacy", !formContext.getValues("isCheckPrivacy"))
            formContext.trigger();
        }} />
        <span>  [필수] 솔리투어 개인정보 처리방침 </span>
        <a href="/support?menu=terms#privacy-policy" target="_blanket" className={`ml-auto hover:text-main`}> 보기 </a>
      </label>
       <button
         onClick={() => addUserInformationSubmit()}
         className={
           `mt-5 min-h-[4rem] w-full rounded-[1.5rem] ${formContext.formState.isValid && formContext.getValues("isCheckTerm") && formContext.getValues("isCheckPrivacy") ? "bg-main text-white" : "bg-gray3"}`
         }
         disabled={!formContext.formState.isValid || !formContext.getValues("isCheckTerm") || !formContext.getValues("isCheckPrivacy")}
       >
         추가 정보 제출
       </button>
       <button
         className={
           `mt-5 min-h-[4rem] w-full rounded-[1.5rem] ${formContext.getValues("isCheckTerm") && formContext.getValues("isCheckPrivacy") ? "bg-main text-white" : "bg-gray3"}`
         }
        disabled={!formContext.getValues("isCheckTerm") || !formContext.getValues("isCheckPrivacy")}
        onClick={() => kakaoLogin()}
       >
         나중에 등록하기
       </button>
     </section>
    </div>
  );
};
export default AddUserInformationInitForm
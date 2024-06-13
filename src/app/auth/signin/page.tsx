import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "Solitour 사용자 로그인 페이지",
};

export default function page() {
  return (
    <main className={"w-full flex flex-col items-center pt-[3rem] px-[.5rem] lg:px-[0rem]"} style={{ minHeight: 'calc(100vh - 30rem)' }}>
      <div className={"pt-[6rem] pb-[8.125rem] flex flex-col max-w-[17.5rem]"}>
        <h1 className={"text-3xl font-bold pb-[1rem]"}> 로그인 </h1>
        <p className={"text-md pb-[3rem] text-[#666]"}> SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요! </p>
        <button className={"w-full h-[2.875rem] bg-[#FEE500] rounded-xl mb-[0.75rem] relative"}>
          <div
            className="w-[1rem] aspect-square left-[1rem] absolute top-[50%] translate-y-[-50%] "
          >
      <Image
        src={"/kakao-icon.svg"}
        alt={"kakao-logo-image"}
        fill={true}
        /> 
          </div>
        카카오로 로그인 </button>
        <button className={"w-full h-[2.875rem] outline outline-[#D9D9D9] outline-[1px] outline-offset-[-1px] rounded-xl mb-[3rem] relative"}>
        <div
            className="w-[1rem] aspect-square left-[1rem] absolute top-[50%] translate-y-[-50%] "
          >
          <Image
            src={"/google-icon.svg"}
            alt={"google-logo-image"}
            fill={true}
            /> 
          </div>
          구글로 로그인 </button>
        <p className={"w-full flex justify-center relative"}>
          <div className={"absolute top-[-.5rem] flex flex-col items-center"}>
            <div className={"bg-[#000] text-[#fff] text-[0.625rem] translate-y-[-100%] rounded-xl relative py-[0.5rem] px-[1rem]"}> 
              1초만의 빠른 회원가입
            <div className={"w-0 h-0 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[2rem] border-l-[7px] border-r-[7px] border-t-[7px] border-t-[black] border-x-transparent"}>  </div>
            </div>
          </div>
          아직 계정이 없으신가요? <Link href={"/auth/signup"} className={"text-[#00B488] font-bold px-[0.25rem] "}> 회원가입 </Link> </p>
      </div>
    </main>
  );
}
              
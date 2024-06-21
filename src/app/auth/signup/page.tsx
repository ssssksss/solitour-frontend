import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원가입 페이지",
  description: "Solitour 사용자 회원가입 페이지",
};

export default function page() {
  return (
    <main className={"w-full flex flex-col items-center pt-[3rem] px-[.5rem] lg:px-[0rem]"} style={{ minHeight: 'calc(100vh - 30rem)' }}>
      <div className={"pt-[6rem] pb-[8.125rem] flex flex-col max-w-[17.5rem]"}>
        <h1 className={"text-3xl font-bold pb-[1rem]"}> 회원가입 </h1>
        <p className={"text-md pb-[3rem] text-[#666]"}> 1초 회원가입으로 입력없이 간편하게 솔리투어를 시작해보세요! </p>
        <button className={"w-full h-[2.875rem] bg-[#FEE500] rounded-xl mb-[0.75rem] relative text-sm"}>
          <div
            className="w-[1rem] aspect-square left-[1rem] absolute top-[50%] translate-y-[-50%] "
          >
      <Image
        src={"/kakao-icon.svg"}
        alt={"kakao-logo-image"}
        fill={true}
        /> 
          </div>
        카카오로 1초만에 시작하기 </button>
        <button className={"w-full h-[2.875rem] outline outline-[#D9D9D9] outline-[1px] outline-offset-[-1px] rounded-xl mb-[3rem] relative text-sm"}>
        <div
            className="w-[1rem] aspect-square left-[1rem] absolute top-[50%] translate-y-[-50%]"
          >
          <Image
            src={"/google-icon.svg"}
            alt={"google-logo-image"}
            fill={true}
            /> 
          </div>
          구글로 1초만에 시작하기 </button>
        <p className={"w-full flex justify-center relative"}>
          이미 계정이 있으신가요? <Link href={"/auth/signin"} className={"text-[#00B488] font-bold px-[0.25rem] "}> 로그인 </Link> </p>
      </div>
    </main>
  );
}
              
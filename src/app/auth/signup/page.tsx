import introLottie from "@/../public/lottie/solitour-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원가입 페이지",
  description: "Solitour 사용자 회원가입 페이지",
};

export default function page() {
  return (
    <main
      className={
        "flex w-full flex-col items-center px-[.5rem] pt-[3rem] lg:px-[0rem]"
      }
      style={{ minHeight: "calc(100vh - 30rem)" }}
    >
      <div className={"flex max-w-[17.5rem] flex-col pb-[8.125rem] pt-[6rem]"}>
        <h1 className={"pb-[1rem] text-3xl font-bold"}> 회원가입 </h1>
        <p className={"text-md text-[#666]"}>
          1초 회원가입으로 입력없이 간편하게 솔리투어를 시작해보세요!
        </p>
        <div className={"relative h-[245px] w-[275px] py-[.75rem]"}>
          <LottieComponent
            lottieFile={introLottie}
            className="h-full w-[275px]"
          />
          <div className="absolute left-[4.5rem] top-[6.25rem]">
            <Image
              src={"/solitour-intro-image.svg"}
              alt={"kakao-logo-image"}
              width={177}
              height={107}
            />
          </div>
        </div>
        <Link
          className={
            "relative mb-[0.75rem] flex h-[2.875rem] w-full items-center justify-center rounded-xl bg-[#FEE500]"
          }
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&prompt=login`}
        >
          <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
            <Image
              src={"/kakao-icon.svg"}
              alt={"kakao-logo-image"}
              fill={true}
            />
          </div>
          카카오로 1초만에 시작하기
        </Link>
        <Link
          className={
            "relative mb-[3rem] flex h-[2.875rem] w-full items-center justify-center rounded-xl outline outline-[1px] outline-offset-[-1px] outline-[#D9D9D9]"
          }
          href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&scope=email profile&prompt=select_account`}
        >
          <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
            <Image
              src={"/google-icon.svg"}
              alt={"google-logo-image"}
              fill={true}
            />
          </div>
          구글로 1초만에 시작하기
        </Link>
        <p className={"relative flex w-full justify-center"}>
          이미 계정이 있으신가요?
          <Link
            href={"/auth/signin"}
            className={"px-[0.25rem] font-bold text-[#00B488]"}
          >
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
              
import introLottie from "@/../public/lottie/solitour-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={"flex max-w-[17.1875rem] flex-col pb-[8.125rem]"}>
      <h1 className={"pb-[1rem] text-4xl font-bold"}> 로그인 </h1>
      <p className={"text-md w-[19.875rem] font-medium text-gray1"}>
        SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
      </p>
      <div className={"relative h-[245px] w-[275px]"}>
        <LottieComponent
          lottieFile={introLottie}
          className="h-full w-[275px]"
        />
        <div className="absolute left-[4.625rem] top-[6.0625rem] h-[6.75rem] w-[11rem]">
          <div className={"relative h-full w-full"}>
            <Image
              src={"/solitour-intro-image.png"}
              alt={"solitour-intro-image"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <Link
        className={
          "relative mb-[0.75rem] flex h-[2.875rem] w-full items-center justify-center rounded-3xl bg-[#FEE500]"
        }
        href="/api/auth/kakao"
      >
        <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
          <Image src={"/kakao-icon.svg"} alt={"kakao-logo-image"} fill={true} />
        </div>
        <span className="text-sm font-semibold text-black">
          카카오로 로그인
        </span>
      </Link>
      <Link
        className={
          "relative mb-[3rem] flex h-[2.875rem] w-full items-center justify-center rounded-3xl outline outline-[1px] outline-offset-[-1px] outline-gray3"
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
        <span className="text-sm font-semibold text-black">구글로 로그인</span>
      </Link>
      <div className={"relative flex w-full justify-center"}>
        <div className={"absolute top-[-.5rem] flex flex-col items-center"}>
          <div
            className={
              "relative translate-y-[-100%] rounded-[2.5rem] bg-[#000] px-[1rem] py-[0.5rem] text-[0.625rem] text-[#fff]"
            }
          >
            1초만의 빠른 회원가입
            <div
              className={
                "absolute left-[50%] top-[2rem] h-0 w-0 translate-x-[-50%] translate-y-[-50%] border-l-[7px] border-r-[7px] border-t-[7px] border-x-transparent border-t-[black]"
              }
            ></div>
          </div>
        </div>
        <p
          className={
            "relative flex w-full justify-center font-semibold text-black"
          }
        >
          아직 계정이 없으신가요?
          <Link
            href={"/auth/signup"}
            className={"px-[0.25rem] font-bold text-[#00B488]"}
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;

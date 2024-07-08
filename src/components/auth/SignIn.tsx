import introLottie from "@/../public/lottie/solitour-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={"flex max-w-[17.5rem] flex-col pb-[8.125rem] pt-[6rem]"}>
      <h1 className={"pb-[1rem] text-3xl font-bold"}> 로그인 </h1>
      <p className={"text-md text-[#666]"}>
        SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
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
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`}
      >
        <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
          <Image src={"/kakao-icon.svg"} alt={"kakao-logo-image"} fill={true} />
        </div>
        카카오로 로그인
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
        구글로 로그인
      </Link>
      <div className={"relative flex w-full justify-center"}>
        <div className={"absolute top-[-.5rem] flex flex-col items-center"}>
          <div
            className={
              "relative translate-y-[-100%] rounded-xl bg-[#000] px-[1rem] py-[0.5rem] text-[0.625rem] text-[#fff]"
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
        <p className={"relative flex w-full justify-center"}>
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

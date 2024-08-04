import introLottie from "@/../public/lottie/solitour-auth-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className={"mb-[8rem] flex w-[19.5rem] flex-col"}>
      <h1 className={"pb-[1rem] text-4xl font-bold"}> 로그인 </h1>
      <div className="h-[2.875rem]">
        <p
          className={
            "text-md absolute flex max-w-[21rem] flex-nowrap break-keep font-medium text-gray1"
          }
        >
          SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
        </p>
      </div>
      <div className={"relative h-[16.8125rem] w-full translate-x-[8%]"}>
        <LottieComponent lottieFile={introLottie} className="h-full w-full" />
        <div className="absolute left-[50%] top-[7.0625rem] h-[6.875rem] w-[11rem] translate-x-[-50%]">
          <Image
            src={"/auth/solitour-auth-intro-image.svg"}
            alt={"solitour-intro-image"}
            fill={true}
            style={{ objectFit: "cover" }}
          />
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
        href="/api/auth/google"
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

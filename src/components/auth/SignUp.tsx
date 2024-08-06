import introLottie from "@/../public/lottie/solitour-auth-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className={"mb-[8rem] flex w-[19.5rem] flex-col"}>
      <h1 className={"pb-[1rem] text-4xl font-bold"}> 회원가입 </h1>
      <div className="h-[2.875rem]">
        <p
          className={
            "text-md absolute flex max-w-[21rem] flex-nowrap break-keep font-medium text-gray1"
          }
        >
          1초 회원가입으로 입력없이 간편하게 솔리투어를 시작해보세요!
        </p>
      </div>
      <div className={"relative h-[16.8125rem] w-full"}>
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
          카카오로 1초만에 시작하기
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
        <span className="text-sm font-semibold text-black">
          구글로 1초만에 시작하기
        </span>
      </Link>
      <div className={"relative flex w-full justify-center"}>
        <p
          className={
            "relative flex w-full justify-center font-semibold text-black"
          }
        >
          계정이 있으신가요?
          <Link
            href={"/auth/signin"}
            className={"px-[0.25rem] font-bold text-[#00B488]"}
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;

import introLottie from "@/../public/lottie/solitour-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className={"flex max-w-[17.1875rem] flex-col pb-[8.125rem]"}>
      <h1 className={"pb-[1rem] text-4xl font-bold"}> 회원가입 </h1>
      <p className={"text-md w-[19.875rem] font-medium text-gray1"}>
        1초 회원가입으로 입력없이 간편하게 솔리투어를 시작해보세요!
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
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}`}
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
          "relative mb-[1.75rem] flex h-[2.875rem] w-full items-center justify-center rounded-3xl outline outline-[1px] outline-offset-[-1px] outline-gray3"
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
          이미 계정이 있으신가요?
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

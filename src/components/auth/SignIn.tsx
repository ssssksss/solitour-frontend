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
      <div className={"relative h-[16.8125rem] w-full"}>
        <LottieComponent lottieFile={introLottie} className="h-full w-full" />
        <div className="absolute left-[50%] top-[7.0625rem] h-[6.875rem] w-[11rem] translate-x-[-50%]">
          <Image
            src="/icons/solitour-auth-intro-icon.svg"
            alt="solitour-auth-intro-icon"
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
          <Image src="/icons/kakao-icon.svg" alt="kakao-icon" fill={true} />
        </div>
        <span className="text-sm font-semibold text-black">
          카카오로 로그인
        </span>
      </Link>
    </div>
  );
};
export default SignIn;

import introLottie from "@/../public/lottie/solitour-auth-intro-image.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="mb-[8rem] flex w-[19.5rem] flex-col">
      <h1 className="pb-[1rem] text-4xl font-bold">로그인</h1>
      <p className="h-[2.875rem] max-w-[21rem] font-medium text-gray1">
        SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
      </p>
      <LottieComponent lottieFile={introLottie} />
      <Image
        className="-mt-36 mb-8 h-[6.875rem] w-[11rem] self-center"
        src="/icons/solitour-auth-intro-icon.svg"
        alt="solitour-auth-intro-icon"
        width={176}
        height={110}
      />
      <Link
        className="relative flex h-[2.875rem] w-full items-center justify-center rounded-3xl bg-[#FEE500] hover:scale-105"
        href="/api/auth/kakao"
      >
        <Image
          className="absolute left-[1rem] top-[50%] h-4 w-4 translate-y-[-50%]"
          src="/icons/kakao-icon.svg"
          alt="kakao-icon"
          width={16}
          height={16}
        />
        <span className="text-sm font-semibold text-black">
          카카오로 로그인
        </span>
      </Link>
    </div>
  );
};

export default SignIn;

import LottieImage from "@/../public/lottie/solitour-mettings-intro-image1.json";
import Image from "next/image";
import Link from "next/link";
import LottieComponent from "./lottie/LottieComponent";

interface Props {
  content: string[];
  buttonText: string;
  category: "정보" | "모임";
}

const buttonPath = {
  정보: "/informations/write",
  모임: "/gathering/write",
};

const Banner = ({ content, buttonText, category }: Props) => {
  return (
    <div
      className={`-mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center max-[744px]:h-[36rem] ${category == "모임" ? "bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF]" : "bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA]"} dark:opacity-65`}
    >
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:w-[39.75rem] max-[744px]:flex-col max-[744px]:justify-center">
        <div className="flex flex-col max-[744px]:items-center">
          {content.map((str, index) => (
            <div
              className="text-2xl max-[1024px]:text-xl"
              key={index}
              dangerouslySetInnerHTML={{ __html: str }}
            />
          ))}
          <Link
            className="mt-5 flex h-11 w-[9rem] items-center justify-center rounded-full bg-black text-[0.9375rem] font-medium text-white shadow hover:scale-105"
            href={buttonPath[category]}
          >
            {buttonText}
          </Link>
        </div>
        <div
          className={`relative flex items-center justify-end max-[744px]:justify-center max-[480px]:w-[95%] ${category == "모임" ? "h-[18rem] w-[29rem]" : "h-[14rem] w-[27rem]"} ${category === "모임" ? "max-[744px]:h-[15rem]" : "mt-4 max-[1024px]:h-[12rem]"}`}
        >
          <div
            className={`absolute h-full w-full ${category == "모임" ? "top-[2.75rem] max-[1024px]:top-[4rem]" : "0px"} flex flex-row justify-center max-[1024px]:h-[85%] max-[1024px]:w-[85%]`}
          >
            {category === "정보" && (
              <div className="flex h-[13.4375rem] w-[24.8125rem] flex-col max-[1024px]:h-[10.6875rem] max-[1024px]:w-[19.8125rem]">
                <div className="flex justify-end pr-6">
                  <div className="animate-bannerImage relative h-[5.8125rem] w-[11.75rem] max-[1024px]:h-[5.0625rem] max-[1024px]:w-[10.1875rem]">
                    <Image
                      src="/banner-image1.png"
                      alt="banner-image1"
                      fill={true}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="animate-bannerImage relative z-10 -mt-[1.875rem] h-[5.75rem] w-[14.375rem] max-[1024px]:h-[4.5625rem] max-[1024px]:w-[11.5rem]">
                  <Image
                    src="/banner-image2.png"
                    alt="banner-image2"
                    fill={true}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="-mt-8 flex justify-end">
                  <div className="animate-bannerImage relative h-[5.8125rem] w-[14.75rem] max-[1024px]:h-[4.625rem] max-[1024px]:w-[11.75rem]">
                    <Image
                      src="/banner-image3.png"
                      alt="banner-image3"
                      fill={true}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {category === "모임" && (
              <LottieComponent
                lottieFile={LottieImage}
                className="object-contain"
              />
              // </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

import Image from "next/image";
import Link from "next/link";

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
      className={`absolute -mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center max-[744px]:h-[36rem] ${category == "모임" ? "bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF]" : "bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA]"} dark:opacity-65`}
    >
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:w-full max-[1024px]:px-[3.375rem] max-[744px]:flex-col max-[744px]:justify-center">
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
          className={`relative flex h-[14rem] w-[27rem] items-center justify-end max-[1024px]:h-[12rem] max-[744px]:justify-center`}
        >
          <div
            className={`absolute flex h-full w-full flex-row justify-center`}
          >
            {category === "정보" && (
              <div className="flex h-[13.4375rem] w-[24.8125rem] flex-col max-[1024px]:mt-4 max-[1024px]:h-[10.6875rem] max-[1024px]:w-[19.8125rem] max-[744px]:mt-[1.875rem]">
                <div className="flex justify-end pr-6">
                  <div className="relative h-[5.8125rem] w-[11.75rem] animate-bannerImage max-[1024px]:h-[5.0625rem] max-[1024px]:w-[10.1875rem]">
                    <Image
                      src="/banner-image1.png"
                      alt="banner-image1"
                      fill={true}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                <div className="relative z-10 -mt-[1.875rem] h-[5.75rem] w-[14.375rem] animate-bannerImage max-[1024px]:h-[4.5625rem] max-[1024px]:w-[11.5rem]">
                  <Image
                    src="/banner-image2.png"
                    alt="banner-image2"
                    fill={true}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="-mt-8 flex justify-end">
                  <div className="relative h-[5.8125rem] w-[14.75rem] animate-bannerImage max-[1024px]:h-[4.625rem] max-[1024px]:w-[11.75rem]">
                    <Image
                      src="/banner-image3.png"
                      alt="banner-image3"
                      fill={true}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

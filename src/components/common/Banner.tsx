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

  if (category == "모임") {
      return (
        <div className="absolute -mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF] max-[744px]:h-[36rem] dark:opacity-65">
          <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:w-full max-[1024px]:px-[3.375rem] max-[744px]:flex-col max-[744px]:justify-start max-[744px]: pt-[2.125rem]">
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
          </div>
        </div>
      );
  }

  return (
    <div className="absolute -mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA] max-[744px]:h-[36rem] dark:opacity-65">
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
        <div className="relative flex h-[13.5rem] w-[24.875rem] animate-bannerImage items-center justify-end max-[1024px]:mt-8 max-[1024px]:h-[10.6875rem] max-[744px]:justify-center">
          <Image
            className="object-contain"
            src="/banner-image.png"
            alt="banner-image"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
};
export default Banner;

import Image from "next/image";
import Link from "next/link";

type MyProps = {
  title: string;
  content: string[];
  buttonText: string;
  category: "정보" | "모임";
};

const bannerImage = {
  정보: "/banner-image.png",
  모임: "/banner2-image.svg",
};

const buttonPath = {
  정보: "/informations/write",
  모임: "/meetings/write",
};

// todo
const Banner = ({ title, content, buttonText, category }: MyProps) => {
  return (
    <div className="-mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA] max-[1024px]:h-[43.75rem]">
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:flex max-[1024px]:h-fit max-[1024px]:flex-col max-[1024px]:justify-center max-[1024px]:space-y-8">
        <div className="flex flex-col max-[1024px]:items-center">
          {content.map((str, index) => (
            <div
              className="text-2xl"
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
        <div className="relative h-[14rem] w-[27rem] max-[480px]:w-[95%]">
          <Image
            src={bannerImage[category]}
            alt={"banner2-image"}
            fill={true}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

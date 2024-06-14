import Image from "next/image";
import Link from "next/link";

type MyProps = {
  title: string;
  content: string[];
  buttonText: string;
  category: string;
};

// todo
const Banner = ({ title, content, buttonText, category }: MyProps) => {
  return (
    <div className="-mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA] max-[1024px]:h-[43.75rem]">
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:flex max-[1024px]:h-fit max-[1024px]:flex-col max-[1024px]:justify-center max-[1024px]:space-y-8">
        <div className="flex flex-col max-[1024px]:items-center">
          {content.map((str, index) => (
            <div
              className="text-2xl font-medium"
              key={index}
              dangerouslySetInnerHTML={{ __html: str }}
            />
          ))}
          <Link
            className="mt-5 flex h-11 w-[9.5rem] items-center justify-center rounded-full bg-black font-black text-white shadow hover:scale-105"
            href="/informations/write"
          >
            {buttonText}
          </Link>
        </div>
        <div className="relative h-[14rem] w-[27rem] max-[480px]:w-[95%]">
          <Image
            src={"/banner-image.png"}
            alt={"banner-image"}
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

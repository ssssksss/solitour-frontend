import Image from "next/image";
import Link from "next/link";

type MyProps = {
  title: string;
  content: string[];
  buttonText: string;
  category: string;
  onClick: () => void;
};

// todo
const Banner = ({ title, content, buttonText, category, onClick }: MyProps) => {
  return (
    <div className="-mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#EBE0FA] to-[#CBF6FF] max-[1024px]:h-[43.75rem]">
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:flex max-[1024px]:h-fit max-[1024px]:flex-col max-[1024px]:justify-center max-[1024px]:space-y-8">
        <div>
          {content.map((str, index) => (
            <div
              className="text-2xl font-medium"
              key={index}
              dangerouslySetInnerHTML={{ __html: str }}
            />
          ))}
          <button
            className="mt-6 rounded-full bg-[#111111] px-8 py-4 font-black text-white shadow hover:scale-105"
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
        <div className="relative h-[14rem] w-[27rem] max-[480px]:w-[95%]">
          <Image
            className=""
            src={"/carousel-icon.svg"}
            alt={"carousel-icon"}
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

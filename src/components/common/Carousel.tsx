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
const Carousel = ({
  title,
  content,
  buttonText,
  category,
  onClick,
}: MyProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="w-[960px] px-4 py-10 text-3xl font-black max-[1024px]:w-full">
        {title}
      </h1>
      <nav className="w-[960px] bg-white px-4 max-[1024px]:w-full">
        <ul className="flex flex-row space-x-10 pb-2">
          <li>
            <Link
              className={
                `${
                  category === "맛집"
                    ? "border-b-4 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:main hover:font-black"
              }
              href="/informations/restaurant"
            >
              맛집
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "숙박"
                    ? "border-b-4 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/accommondation"
            >
              숙박
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "액티비티"
                    ? "border-b-4 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/activity"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex w-full flex-row justify-center bg-gradient-to-br from-[#EBE0FA] to-[#CBF6FF]">
        <div className="flex h-96 w-[960px] flex-row items-center justify-between px-4 pb-12 max-[1024px]:flex max-[1024px]:h-fit max-[1024px]:flex-col max-[1024px]:space-y-8 max-[1024px]:pb-24 max-[1024px]:pt-16">
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
          <div className="relative h-[220px] w-[423px] max-[480px]:w-[95%]">
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
    </div>
  );
};

export default Carousel;

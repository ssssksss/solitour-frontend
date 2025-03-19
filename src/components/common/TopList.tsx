import LottieFile from "@/../public/lottie/solitour_gathering_animation.json";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import { TopGatheringResponseDto } from "@/entities/gathering/model/GatheringDto";
import { getTopInformationTitleList } from "@/entities/information";

interface Props {
  title: "여행" | "모임";
}

async function getTopGatheringList() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/gatherings/ranks`,
    {
      method: "GET",
      next: { revalidate: 60, tags: ["getTopGatheringList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TopGatheringResponseDto[]>;
}

const TopList = async ({ title }: Props) => {
  const data =
    title === "여행"
      ? await getTopInformationTitleList()
      : await getTopGatheringList();

  return (
    <div className="relative z-1 -mt-28 flex h-fit w-full flex-col justify-center rounded-2xl shadow-sm shadow-[#CCECE2] max-[744px]:-mt-24">
      {title === "모임" && (
        <div className="max-[14.375rem] absolute top-0 right-0 -z-5 flex aspect-auto translate-y-[-75%] items-center justify-center max-[744px]:w-full min-[744px]:right-[.5rem] min-[1024px]:right-[5.25rem]">
          <Lottie
            animationData={LottieFile}
            className="translate-y-[-1rem] object-contain"
          />
          <Image
            className="object-contain"
            src="/icons/gathering-people.svg"
            alt="gathering-people"
            fill={true}
          />
        </div>
      )}
      <div className="h-[20rem] w-full max-[1024px]:h-[24rem]">
        <div className="absolute h-full w-full rounded-2xl bg-white px-24 py-16 max-[1024px]:px-8 max-[1024px]:py-12">
          <h2 className="border-gray3 mb-9 border-b-[0.0625rem] pb-3 text-2xl font-semibold text-black">
            {`${title} 정보 `}
            <span className="text-main font-bold">Top 5</span>
          </h2>
          <div className="w-full">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-[1.5rem] max-[1024px]:flex max-[1024px]:flex-col">
              {data.map((value, index) => (
                <li
                  key={index}
                  className={`flex items-center ${index > 2 ? "col-start-2" : "col-start-1"}`}
                  style={{ gridRowStart: index > 2 ? index - 2 : index + 1 }}
                >
                  <p className="text-main w-6 font-bold">{index + 1}.</p>
                  <Link
                    className="text-gray1 hover:text-main w-96 truncate text-sm font-medium max-[1024px]:w-full"
                    href={`/${title === "여행" ? "informations" : "gathering"}/${value.id}`}
                  >
                    {value.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopList;

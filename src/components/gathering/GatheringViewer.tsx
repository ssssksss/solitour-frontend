import Image from "next/image";
import Link from "next/link";
import { FaEye, FaRegHeart } from "react-icons/fa";

const GatheringViewer = () => {
  type dataType = {
    id: number;
    category: string;
    bookmark: boolean;
    title: string;
    username: string;
    date: Date;
    location: string;
    time: string;
    image: string;
    current: number;
    total: number;
    qualification: string;
    likes: number;
    views: number;
    createdAt: string;
  };

  const data: dataType = {
    id: 4,
    category: "활동",
    bookmark: true,
    title: "동해 서핑 투게더",
    username: "waver",
    date: new Date(),
    location: "강원, 동해시",
    time: "08:00",
    image: "/PostImage2.svg",
    current: 1,
    total: 6,
    qualification: "(30대, 성별 상관없음)",
    likes: 52,
    views: 102,
    createdAt: "2024.06.07",
  };

  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <div className="flex gap-[.25rem] text-[.625rem] text-gray2">
        <div className="text-gray1">
          <Link href={"/"}>
            <Image
              src={"/home-icon.svg"}
              alt={"home-icon-image"}
              width={10}
              height={10}
            />
          </Link>
        </div>
        <div> {">"} </div>
        <div>
          <Link href={"/gathering"}> 모임 </Link>
        </div>
        <div> {">"} </div>
        <div className={"font-bold text-gray1"}> 모임 상세 </div>
      </div>
      <h1 className={"pt-[2.25rem] text-3xl font-semibold"}> {data.title} </h1>
      <div className="flex w-full justify-between pt-[1rem]">
        <div className={"flex items-center gap-x-3"}>
          <Image
            src={"/user_sex_man_default_image.svg"}
            alt={"sex-default-icon-image"}
            width={54}
            height={54}
          />
          <div className="flex flex-col gap-y-[.125rem]">
            <div className="text-xs font-medium text-black">
              {data.username}
            </div>
            <div className="text-xs text-gray1"> {data.createdAt} </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-end text-xs font-medium text-gray2">
          <div className="flex flex-row items-center space-x-3">
            <div className="flex flex-row items-center gap-1 text-gray2">
              <FaRegHeart size={"0.8rem"} />
              <p className="text-xs">{data.likes}</p>
            </div>
            <div className="flex flex-row items-center gap-1 text-gray2">
              <FaEye />
              <p className="text-xs">{data.views}</p>
            </div>
          </div>
        </div>
      </div>
      <article className="mt-[1.875rem] grid grid-cols-1 gap-y-[1rem] border-y-[1px] border-[#d9d9d9] p-[1.25rem] text-xs sm:grid-cols-2">
        <div className="flex gap-x-3">
          <Image
            src={"/calendar-icon.svg"}
            alt={"calendar-icon-image"}
            width={10}
            height={10}
          />
          <div> 06.08(토)- 06.09(일) 중 미정 </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/location-icon.svg"}
            alt={"location-icon-image"}
            width={10}
            height={10}
          />
          <div> 강원, 동해시 </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/people-icon.svg"}
            alt={"people-icon-image"}
            width={10}
            height={10}
          />
          <div>
            {" "}
            <span className="text-main"> 3 </span> / 6{" "}
            <span className="text-gray2"> (30대, 성별 상관없음) </span>{" "}
          </div>
        </div>
        <div className="flex gap-x-3">
          <Image
            src={"/clock-icon.svg"}
            alt={"clock-icon-image"}
            width={10}
            height={10}
          />
          <div> 08:00 </div>
        </div>
      </article>
      <div className="pt-[2rem]">
        안녕하세요! 서핑을 사랑하는 1인입니다 :{")"}
        <br /> 이제 진짜 여름이네요! 여름에는 서핑하러 여행을 많이 다니게 되는
        것 같아요. 저는 6월8일~9일 여행이라 날짜는 모여지면 정하려합니다.
        <br /> 우리 같이 동해바다에서 여행도 하고 서핑해요!
        <br /> <br /> 이런 사람과 함께하고싶어요!
        <br /> *30대 서핑에 관심있는 누구나
        <br /> *열정 있는 누구나
        <br /> *개인 장비 필요
        <br />
      </div>
      <div className={"flex gap-x-[.25rem] pt-[1.125rem] text-sm"}>
        {["#동해바다", "#서핑"].map((i) => (
          <div
            key={i}
            className="max-w-max rounded-xl px-[.5rem] py-[.25rem] text-main outline outline-[1px] outline-offset-[-1px] outline-main"
          >
            {i}
          </div>
        ))}
      </div>
      <div className={"flex flex-col"}></div>
    </div>
  );
};
export default GatheringViewer;

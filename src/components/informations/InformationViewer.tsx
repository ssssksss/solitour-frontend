import { AiTwotoneClockCircle } from "react-icons/ai";
import { CiMap } from "react-icons/ci";
import { MdCheck, MdLocationOn } from "react-icons/md";
import ItemTag from "./ItemTag";
import Image from "next/image";

type MyProps = {
  category: string;
  id: number;
};

// TODO
const InformationViewer = ({ category, id }: MyProps) => {
  //const info = await fetch("")
  const info = {
    title: "서촌 분위기 있는 어쩌구 저쩌구 이건 제목",
    username: "heymin00",
    date: new Date().toLocaleDateString(),
    name: "오제제 광화문",
    body: "1인 메뉴가 있는 돈까스 맛집이에요. 조용한 분위기보다 시끌벅적한 분위기를 선호하시는 혼밥러에게 추천드려요. 개치 테이블로 웨이팅은 필수! 1인 메뉴가 있는 돈까스 맛집이에요. 조용한 분위기보다...",
    location: "서울 중구 세동대로 136 서울파이낸스센터 지하3층 301호 (우)04520",
    hours: [
      ["월 ~ 금", "10:00 - 22:00"],
      ["주말", "11:00 - 22:00"],
      ["브레이크타임", "15:00 - 17:00"],
    ],
    tags: ["혼술집", "서촌", "아늑한"],
    images: [1, 2, 3, 4, 5],
  };

  return (
    <div className="w-[60rem] max-[1024px]:w-[90%]">
      <h1 className="text-3xl font-semibold">{info.title}</h1>
      <div className="flex flex-row items-center space-x-2 py-8">
        <div className="h-12 w-12 rounded-full bg-neutral-200"></div>
        <p className="text-sm font-medium">{info.username}</p>
      </div>
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col">
        <div className="relative flex h-[29.375rem] w-[29.375rem] items-center justify-center max-[1024px]:w-full">
          <Image
            className="-z-10 rounded-2xl"
            src={"/PostImage.svg"}
            alt={"/background"}
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />

          <div className="absolute bottom-6 right-6 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-neutral-500">
            3/5
          </div>
        </div>
        <div className="flex h-[29.375rem] w-[29.375rem] flex-col justify-center rounded-2xl p-4 max-[1024px]:w-full">
          <p className="text-xs text-neutral-500">{info.date}</p>
          <h2 className="py-4 text-lg font-semibold">{info.name}</h2>
          <p className="border-b-[0.0625rem] border-neutral-500 pb-6 font-medium">
            {info.body}
          </p>
          <div className="flex flex-row items-center space-x-1 py-6">
            <MdLocationOn size={"1.5rem"} />
            <p className="text-xs font-medium">{info.location}</p>
            <CiMap className="cursor-pointer hover:scale-105" size={"2rem"} />
          </div>
          <div className="flex flex-row items-start space-x-4">
            <AiTwotoneClockCircle className="ml-[0.125rem]" />
            <div className="flex flex-col space-y-2 pb-4">
              {info.hours.map((data, index) => (
                <div key={index} className="flex flex-row items-center">
                  <p className="w-32 text-xs font-medium text-neutral-500">
                    {data[0]}
                  </p>
                  <p className="pl-2 text-xs font-medium">{data[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center space-x-1">
            {info.tags.map((tag, index) => (
              <ItemTag key={index} tag={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="my-20 flex w-full justify-center border-y-[0.0625rem] border-neutral-300 py-10">
        <div className="flex flex-col items-start space-y-4">
          <h2 className="text-lg font-semibold">유용한 정보 요약</h2>
          <div className="flex flex-row items-start space-x-1">
            <MdCheck size={"1.4rem"} />
            <p className="font-medium">
              혼밥러에게 유용한 정보. 혼밥러에게 유용한 정보. 혼밥러에게 유용한
              정보. 혼밥러에게 유용한 정보.
            </p>
          </div>
          <div className="flex flex-row items-start space-x-1">
            <MdCheck size={"1.4rem"} />
            <p className="font-medium">
              혼밥집에 대한 간략 정보. 혼밥집에 대한 간략 정보. 혼밥집에 대한
              간략 정보.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="px-10">
          1인 메뉴가 있는 돈까스 맛집이예요. 조용한 분위기보다 시끌벅적한
          분위기를 선호하시는 혼밥러에게 추천드려요. 캐치 테이블로 웨이팅은
          필수! 1인 메뉴가 있는 돈까스 맛집이예요. 조용한 분위기보다
        </p>
        <div className="flex w-full flex-wrap items-center justify-between py-8">
          <div className="h-[29.375rem] w-[29.375rem] rounded-2xl bg-neutral-100"></div>
          <div className="my-4 h-[29.375rem] w-[29.375rem] rounded-2xl bg-neutral-100"></div>
        </div>
        <p className="px-10">
          1인 메뉴가 있는 돈까스 맛집이예요. 조용한 분위기보다 시끌벅적한
          분위기를 선호하시는 혼밥러에게 추천드려요. 캐치 테이블로 웨이팅은
          필수! 1인 메뉴가 있는 돈까스 맛집이예요. 조용한 분위기보다1인 메뉴가
          있는 돈까스 맛집이예요. 조용한 분위기보다 시끌벅적 한 분위기를
          선호하시는 혼밥러에게 추천드려요. 캐치 테이블로 웨이팅은 필수! 1인
          메뉴가 있는 돈까스 맛집이예요. 조용한 분위기보다
        </p>
        <div className="flex w-full flex-row items-center justify-start py-8">
          <div className="h-[29.375rem] w-[29.375rem] rounded-2xl bg-neutral-100"></div>
        </div>
      </div>
    </div>
  );
};

export default InformationViewer;

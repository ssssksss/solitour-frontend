import ItemTag from "./ItemTag";
import Image from "next/image";
import PagePath from "./PagePath";
import { MouseEvent, RefObject, TouchEvent } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import KakaoMapContainer from "@/containers/common/KakaoMapContainer";

type MyProps = {
  category: string;
  id: number;
  mainImageIndex: number;
  listRef: RefObject<HTMLDivElement>;
  onDragStart: (e: MouseEvent<HTMLDivElement>) => void;
  onDragMove: (e: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
  setMainImageIndex: (index: number) => void;
};

// TODO
const InformationViewer = ({
  category,
  id,
  mainImageIndex,
  listRef,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  setMainImageIndex,
}: MyProps) => {
  //const info = await fetch("")
  const info = {
    title: "책과 공간이 매력적인 선릉역 테라로사",
    username: "하몽",
    date: new Date().toLocaleDateString(),
    address: "서울 강남구 테헤란로 440 포스코센터 1,2층 (우)06194",
    body: "선릉역과 삼성역 사이에 있는 테라로사 포스코센터점입니다. 제가 갔을 땐 사람이 많아도 공간이 워낙 넓어서 좋았어요! 책도 구경하고 핸드드립 커피가 있어 여유롭게 시간을 보낼 수 있어요. 도심 속에서 이런 대형카페에서 뷰도 감상하고 시간을 보내고 싶은신 분들에게 추천합니다!",
    tags: ["북카페", "뷰맛집", "핸드드립"],
    tips: ["대형카페로 책도 읽고 카공하기 좋아요", "2시간 주차가 가능해요"],
    images: [
      "/PostImage.svg",
      "/restaurant1.svg",
      "/restaurant2.svg",
      "/restaurant3.svg",
      "/restaurant4.svg",
      "/PostImage.svg",
      "/restaurant1.svg",
      "/restaurant2.svg",
      "/restaurant3.svg",
      "/restaurant4.svg",
    ],
    placeName: "테라로사 포스코센터",
    placeId: 1860681564,
  };

  return (
    <div className="w-[60rem] max-[1024px]:w-[90%]">
      <PagePath category={`${category} 상세`} />
      <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
        <div className="h-[34.5rem] w-[29.375rem] max-[1024px]:w-full">
          <div className="relative h-[26.0625rem] w-full">
            <Image
              className="rounded-2xl"
              src={info.images[mainImageIndex]}
              alt={"/background"}
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="flex flex-row items-center space-x-[0.875rem] overflow-x-auto pt-[0.875rem]"
            ref={listRef}
            onMouseDown={(e) => {
              e.preventDefault();
              onDragStart(e);
            }}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {info.images.map((image, index) => (
              <Image
                key={index}
                className="cursor-pointer rounded-lg"
                src={image}
                alt={"/background"}
                width={107}
                height={107}
                onClick={(e) => {
                  setMainImageIndex(index);
                }}
                onTouchEnd={(e) => {
                  setMainImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex h-[34.5rem] w-[29.375rem] flex-col overflow-y-auto px-[1.25rem] max-[1024px]:h-fit max-[1024px]:w-full max-[1024px]:px-0 max-[1024px]:pt-8">
          <h1 className="text-2xl font-bold">{info.title}</h1>
          <div className="flex flex-row items-center justify-between py-4">
            <div className="flex flex-row items-center gap-2">
              <Image
                className="rounded-full shadow"
                src="/user_sex_woman_default_image.svg"
                alt="user_sex_woman_default_image"
                width={48}
                height={48}
              />
              <div className="space-y-1">
                <p className="text-xs font-medium text-black">
                  {info.username}
                </p>
                <p className="text-xs text-gray1">{info.date}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-gray2">
                <FaRegHeart size={"0.8rem"} />
                <p className="text-xs">666M</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-gray2">
                <Image
                  src="/eyes-icon.svg"
                  alt="eyes-icon"
                  width={15}
                  height={15}
                />
                <p className="text-xs">222K</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 py-3">
            <TiLocation className="text-main" size={"1.1rem"} />
            <p className="text-xs font-medium text-gray1">{info.address}</p>
          </div>
          <p className="py-4 font-medium text-gray1">{info.body}</p>
          <div className="flex flex-row items-center gap-1 pb-8">
            {info.tags.map((tag, index) => (
              <ItemTag
                key={index}
                tag={tag}
                borderColor="border-main"
                textColor="text-main"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 border-y-2 border-gray3 px-6 py-4">
            <div className="text-bold text-lg font-bold">
              생생한 혼플 <span className="text-main">TIP</span>
            </div>
            {info.tips.map((tip, index) => (
              <li
                key={index}
                className="ml-6 align-baseline font-medium text-gray1 marker:text-main"
              >
                {tip}
              </li>
            ))}
          </div>
          <div className="mt-3 flex flex-row items-center justify-end gap-3">
            <button className="flex flex-row items-center gap-1 text-sm hover:text-main">
              <Image
                src="/edit-icon.svg"
                alt="edit-icon"
                width={15}
                height={15}
              />
              수정
            </button>
            <button className="flex flex-row items-center gap-1 text-sm hover:text-main">
              <Image
                src="/delete-icon.svg"
                alt="delete-icon.svg"
                width={15}
                height={15}
              />
              삭제
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20 flex h-48 flex-col">
        <KakaoMapContainer placeName={info.placeName} placeId={info.placeId} />
      </div>
      <a
        className="-mt-4 flex h-36 w-full flex-col justify-center gap-2 rounded-b-2xl border-x-2 border-b-2 px-6"
        href={`https://map.kakao.com/link/map/${info.placeId}`}
        target="_blank"
      >
        <h2 className="text-lg font-bold text-black">{info.placeName}</h2>
        <div className="flex flex-row items-center gap-1">
          <Image
            src="/location-icon.svg"
            alt="location-icon"
            width={10}
            height={10}
          />
          <p className="text-sm text-gray1">{info.address}</p>
        </div>
      </a>
    </div>
  );
};

export default InformationViewer;

import ItemTag from "../common/ItemTag";
import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import { LuEye } from "react-icons/lu";
import { InformationDetailResponseDto } from "@/entities/information/model/informationDto";
import { convertNumberToShortForm } from "@/shared/lib/utils/convertNumberToShortForm";
import ButtonList from "./ButtonList";
import ImageList from "./ImageList";
import InformationLikeCount from "./InformationLikeCount";
import KakaoMapLink from "./KakaoMapLink";

interface InformationViewerProps {
  informationId: number;
  data: InformationDetailResponseDto;
}

const InformationViewer = ({ informationId, data }: InformationViewerProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between overflow-x-hidden max-[1024px]:flex-col">
        <div className="w-full pb-4 lg:hidden">
          <h1 className="text-2xl font-bold break-words">{data.title}</h1>
          <div className="flex flex-row items-end justify-between py-4">
            <div className="flex flex-row items-center gap-3">
              <Image
                className="bg-lightGreen rounded-full border-[0.03125rem] border-[#B8EDD9]"
                src={data.userImage}
                alt="userImage"
                width={54}
                height={54}
              />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-black">
                  {data.userPostingResponse.nickname}
                </p>
                <p className="text-gray1 text-xs">
                  {`${new Date(data.createdDate).toLocaleDateString("ko-KR")}`}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <InformationLikeCount
                informationId={informationId}
                initialLikeCount={data.likeCount}
                initialIsLike={data.isLike}
              />
              <div className="text-gray2 flex flex-row items-center gap-1">
                <LuEye />
                <p className="text-xs">
                  {convertNumberToShortForm(data.viewCount)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[34.5rem] w-[29.375rem] max-[1024px]:w-full max-[744px]:h-[27.5625rem]">
          <ImageList images={data.imageResponses} />
        </div>
        <div className="flex h-[34.5rem] w-[29.375rem] flex-col overflow-y-auto px-[1.25rem] max-[1024px]:h-fit max-[1024px]:w-full max-[1024px]:px-0 max-[1024px]:pt-8">
          <div className="max-[1024px]:hidden">
            <h1 className="text-2xl font-bold break-words">{data.title}</h1>
            <div className="flex flex-row items-end justify-between py-4">
              <div className="flex h-[3.375rem] flex-row items-center gap-3">
                <Image
                  className="bg-lightGreen rounded-full border-[0.03125rem] border-[#B8EDD9]"
                  src={data.userImage}
                  alt="userImage"
                  width={54}
                  height={54}
                />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-black">
                    {data.userPostingResponse.nickname}
                  </p>
                  <p className="text-gray1 text-xs">
                    {`${new Date(data.createdDate).toLocaleDateString("ko-KR")}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <InformationLikeCount
                  informationId={informationId}
                  initialLikeCount={data.likeCount}
                  initialIsLike={data.isLike}
                />
                <div className="text-gray2 flex flex-row items-center gap-1">
                  <LuEye />
                  <p className="text-xs">
                    {convertNumberToShortForm(data.viewCount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 py-3">
            <TiLocation className="text-main" size={"1.1rem"} />
            <p className="text-gray1 text-xs font-medium">{data.address}</p>
          </div>
          <p className="text-gray1 py-4 font-medium break-words whitespace-pre-wrap">
            {data.content}
          </p>
          <div className="flex flex-row flex-wrap items-center gap-1 pb-8">
            {data.tagResponses.map((tag, index) => (
              <ItemTag
                key={index}
                tag={tag.name}
                borderColor="border-main"
                textColor="text-main"
              />
            ))}
          </div>
          <div className="border-gray3 flex flex-col gap-3 border-y-[0.0625rem] px-6 py-4">
            <div className="text-bold text-lg font-bold">
              생생한 혼플 <span className="text-main">TIP</span>
            </div>
            {data.tip.split(";").map((tip, index) => (
              <li
                key={index}
                className="text-gray1 marker:text-main ml-6 align-baseline font-medium"
              >
                {tip}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 flex h-48 flex-col">
        <KakaoMapLink
          placeName={data.placeResponse.name}
          placeId={data.placeResponse.searchId}
          placeYAxis={data.placeResponse.yaxis}
          placeXAxis={data.placeResponse.xaxis}
        />
      </div>
      <a
        className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-x-[0.0625rem] border-b-[0.0625rem] px-6 pt-12 pb-10"
        href={`https://map.kakao.com/link/map/${data.placeResponse.searchId.toString() !== "0" ? data.placeResponse.searchId : `${data.placeResponse.name},${data.placeResponse.yaxis},${data.placeResponse.xaxis}`}`}
        target="_blank"
      >
        <h2 className="text-lg font-bold text-black">
          {data.placeResponse.name}
        </h2>
        <div className="text-gray1 flex flex-row items-center gap-1 text-sm">
          <TiLocation />
          <p>{data.address}</p>
        </div>
      </a>
      <ButtonList
        userId={data.userPostingResponse.id}
        informationId={informationId}
      />
    </div>
  );
};

export default InformationViewer;

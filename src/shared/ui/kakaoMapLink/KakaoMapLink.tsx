"use client";

import { useKakaoMapLink } from "@/shared/model";
import { TiLocation } from "react-icons/ti";

interface KakaoMapLinkProps {
  placeName: string; // 장소명
  placeAddress: string;
  placeId: number; // 장소 id 값
  placeYAxis: number;
  placeXAxis: number;
}

export const KakaoMapLink = ({
  placeName,
  placeAddress,
  placeId,
  placeYAxis,
  placeXAxis,
}: KakaoMapLinkProps) => {
  const { loading } = useKakaoMapLink(placeName);

  // 지도를 담을 영역
  // 반드시 width, height 값을 지정해야 지도가 출력된다.
  // 최상위 태그에 id 값을 지정해야 함.
  return (
    <div>
      <div className="mt-20 flex h-48 flex-col">
        <a
          id="map"
          className={[
            loading ? "animate-pulse" : "",
            "h-48 w-full rounded-t-2xl border bg-slate-200",
          ].join(" ")}
          href={`https://map.kakao.com/link/map/${placeId.toString() !== "0" ? placeId : `${placeName},${placeYAxis},${placeXAxis}`}`}
          target="_blank"
        />
      </div>
      <a
        className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-x border-b px-6 pt-12 pb-10"
        href={`https://map.kakao.com/link/map/${placeId.toString() !== "0" ? placeId : `${placeName},${placeYAxis},${placeXAxis}`}`}
        target="_blank"
      >
        <h2 className="text-lg font-bold text-black">{placeName}</h2>
        <div className="text-gray1 flex flex-row items-center gap-1 text-sm">
          <TiLocation />
          <p>{placeAddress}</p>
        </div>
      </a>
    </div>
  );
};

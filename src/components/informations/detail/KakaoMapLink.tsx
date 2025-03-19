"use client";

import { useKakaoMapLink } from "@/hooks/information/detail/useKakaoMapLink";

interface KakaoMapLinkProps {
  placeName: string; // 장소명
  placeId: number; // 장소 id 값
  placeYAxis: number;
  placeXAxis: number;
}

const KakaoMapLink = ({
  placeName,
  placeId,
  placeYAxis,
  placeXAxis,
}: KakaoMapLinkProps) => {
  const { loading } = useKakaoMapLink(placeName);

  // 지도를 담을 영역
  // 반드시 width, height 값을 지정해야 지도가 출력된다.
  // 최상위 태그에 id 값을 지정해야 함.
  return (
    <a
      id="map"
      className={`${loading ? "animate-pulse" : ""} h-48 w-full rounded-t-2xl border bg-slate-200`}
      href={`https://map.kakao.com/link/map/${placeId.toString() !== "0" ? placeId : `${placeName},${placeYAxis},${placeXAxis}`}`}
      target="_blank"
    />
  );
};

export default KakaoMapLink;

"use client";

import Image from "next/image";
import { useEffect } from "react";

interface GatheringKakaoMapProps {
  searchId: string;
  name: string;
  xaxis: number;
  yaxis: number;
  address: string;
}

export const GatheringKakaoMap = ({
  searchId,
  name,
  xaxis,
  yaxis,
  address,
}: GatheringKakaoMapProps) => {
  useEffect(() => {
    if (!name) return;

    const lat = Number(yaxis);
    const lng = Number(xaxis);

    const initializeMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      map.setDraggable(false);
      map.setZoomable(false);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
      });

      marker.setMap(map);

      const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            func(...args);
          }, delay);
        };
      };

      const handleResize = debounce(() => {
        map.relayout();
        map.setCenter(new window.kakao.maps.LatLng(lat, lng));
      }, 300);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    window.kakao.maps.load(initializeMap);
  }, [name, xaxis, yaxis]);

  return (
    <div className={"flex h-[21.125rem] w-full flex-col text-black"}>
      {name && (
        <a
          className="relative flex h-full cursor-pointer flex-col items-center justify-center rounded-2xl border"
          href={
            searchId
              ? `https://map.kakao.com/link/map/${searchId}`
              : `http://map.kakao.com/link/map/${name},${yaxis},${xaxis}`
          }
          target="_blank"
        >
          <div
            id="map"
            style={{ width: "calc(100%)", height: "calc(100% - 6rem)" }}
            className={"rounded-t-2xl border-b-[0.0625rem]"}
          />

          {/* 투명한 오버레이 div 추가 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "calc(100% - 6rem)",
              cursor: "pointer",
              zIndex: 10, // 지도가 아닌 투명한 div가 마우스 이벤트를 받도록 함
            }}
          />

          <div className="-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border px-6 pt-12 pb-10">
            <div className="text-lg font-bold text-black">{name}</div>
            <div className="text-gray1 flex items-center gap-1 text-sm">
              <Image
                src="/icons/location-icon.svg"
                alt="location-icon"
                width={14}
                height={14}
              />
              <span>{address}</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

"use client";

import { PlaceResponse } from "@/types/GatheringDto";
import Image from "next/image";
import { useEffect } from "react";

const GatheringKakaoMap = (placeResponse: PlaceResponse) => {
  useEffect(() => {
    if (!placeResponse.name) return;

    const lat = Number(placeResponse.yaxis);
    const lng = Number(placeResponse.xaxis);

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
  }, [placeResponse]);

  return (
    <div className={"flex h-[21.125rem] w-full flex-col text-black"}>
      {placeResponse.name && (
        <a
          className={
            "relative flex h-full cursor-pointer flex-col items-center justify-center rounded-2xl border-[0.0625rem]"
          }
          href={
            placeResponse.searchId
              ? `https://map.kakao.com/link/map/${placeResponse.searchId}`
              : `http://map.kakao.com/link/map/${placeResponse.name},${placeResponse.yaxis},${placeResponse.xaxis}`
          }
          target="_blank"
        >
          <div
            id="map"
            style={{ width: "calc(100%)", height: "calc(100% - 6rem)" }}
            className={"rounded-t-2xl border-b-[0.0625rem]"}
          ></div>

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
          ></div>

          <div
            className={
              "-mt-4 flex h-fit w-full flex-col justify-center gap-2 rounded-b-2xl border-[0.0625rem] px-6 pb-10 pt-12"
            }
          >
            <div className="text-lg font-bold text-black">
              {placeResponse.name}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray1">
              <Image
                src="/icons/location-icon.svg"
                alt="location-icon"
                width={14}
                height={14}
              />
              <span>{placeResponse.address}</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default GatheringKakaoMap;

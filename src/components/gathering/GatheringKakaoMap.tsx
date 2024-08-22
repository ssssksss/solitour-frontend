"use client";

import { PlaceResponse } from "@/types/GatheringDto";
import Image from "next/image";
import { useEffect } from "react";

const GatheringKakaoMap = (placeResponse: PlaceResponse) => {
  useEffect(() => {
    if (!placeResponse.name) return;

    const lat = Number(placeResponse.yaxis);
    const lng = Number(placeResponse.xaxis);

    window.kakao.maps.load(function () {
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
    });
  }, [placeResponse]);

  return (
    <div
      className={
        "flex h-[19.875rem] cursor-pointer flex-col gap-[.5rem] rounded-[1rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
      }
    >
      {placeResponse.name && (
        <a
          className={
            "relative flex h-full cursor-pointer flex-col items-center justify-center rounded-[1rem]"
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
            style={{ width: "100%", height: "calc(100% - 6rem)" }}
            className={
              "rounded-[1rem_1rem_0_0] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            }
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
              "flex h-[6rem] w-full cursor-pointer flex-col justify-between gap-[1rem] rounded-[0_0_1rem_1rem] bg-white p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
            }
          >
            <div className={"flex items-center text-2xl font-bold"}>
              {placeResponse.name}
            </div>
            <div className={"flex items-center gap-[1rem]"}>
              <Image
                src={"/location-icon.svg"}
                alt={"location-icon"}
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

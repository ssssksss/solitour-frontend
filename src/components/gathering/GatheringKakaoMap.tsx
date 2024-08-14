"use client"

import { PlaceResponse } from "@/types/GatheringDto";
import Image from "next/image";
import { useEffect } from "react";

const GatheringKakaoMap = (placeResponse: PlaceResponse) => {
  
    useEffect(() => {
      if (
        placeResponse.name == "" ||
        placeResponse.name == undefined
      )
        return;
      const lat = Number(placeResponse.yaxis);
      const lng = Number(placeResponse.xaxis);
      // 카카오 맵이 로드 된 후에 이동 되게 하는 코드
      window.kakao.maps.load(function () {
        const marker = {
          position: new window.kakao.maps.LatLng(lat, lng),
        };
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
          marker: marker,
        };

        // const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        new window.kakao.maps.StaticMap(container, options);
      });
    }, []);

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div
        className={
          "flex h-[19.875rem] flex-col gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        {placeResponse.name && (
          <a
            className={
              "relative flex h-full flex-col items-center justify-center gap-[.25rem] rounded-[1rem]"
            }
            href={
              placeResponse.searchId ? `https://place.map.kakao.com/${placeResponse.searchId}` :
              `http://map.kakao.com/link/map/${placeResponse.name},${placeResponse.yaxis},${placeResponse.xaxis}`
            }
            target="_blanket"
          >
            <div
              id="map"
              style={{ width: "100%", height: "calc(100% - 6rem)" }}
              className={
                "rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            ></div>

            <div
              className={
                "flex h-[6rem] w-full flex-col justify-between gap-[1rem] rounded-[1rem] bg-white p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            >
              {placeResponse.name && (
                <>
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
                    <span> {placeResponse.address} </span>
                  </div>
                </>
              )}
            </div>
          </a>
        )}
      </div>
    </article>
  );
};

export default GatheringKakaoMap;

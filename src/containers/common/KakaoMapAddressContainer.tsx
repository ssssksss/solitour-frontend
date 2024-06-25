"use client";

import {
  displayCenterInfo,
  searchAddrFromCoords,
  searchDetailAddrFromCoords,
} from "@/utils/searchAddress";
import { useEffect, useState } from "react";

const KakaoMapAddressContainer = () => {
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        isLoading(false);

        // id가 "addressMap"인 요소에 지도를 생성합니다.
        const container = document.getElementById("addressMap");
        const options = {
          // 지도 좌표값을 설정합니다.
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),

          // 줌 레벨을 1로 설정합니다.
          level: 1,
        };

        // 지도를 생성합니다.
        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 객체를 생성합니다.
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 클릭한 위치를 표시할 마커를 생성합니다.
        const marker = new window.kakao.maps.Marker();

        // 클릭한 위치에 대한 주소를 표시할 인포윈도우를 생성합니다.
        const infoWindow = new window.kakao.maps.InfoWindow({ zindex: 1 });

        // 현재 지도 중심 좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다.
        searchAddrFromCoords(geocoder, map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다.
        window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
          searchDetailAddrFromCoords(
            geocoder,
            mouseEvent.latLng,
            (result: any, status: any) => {
              let detailAddr = !!result[0].road_address
                ? `<div>도로명주소: ${result[0].road_address.address_name}</div>`
                : "";

              detailAddr += `<div>지번 주소: ${result[0].address.address_name}</div>`;

              const content =
                '<div class="p-1 text-ellipsis overflow-hidden whitespace-nowrap">' +
                '<span class="font-bold block">법정동 주소정보</span>' +
                detailAddr +
                "</div>";

              // 마커를 클릭한 위치에 표시합니다.
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다.
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            },
          );
        });

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다.
        window.kakao.maps.event.addListener(map, "idle", () => {
          searchAddrFromCoords(geocoder, map.getCenter(), displayCenterInfo);
        });
      });
    }
  }, []);

  return (
    <div
      className={`${loading ? "animate-pulse" : ""} relative h-48 w-full rounded-2xl border-2 bg-slate-200`}
    >
      <div id="addressMap" className="relative h-full w-full overflow-hidden" />
      <div className="absolute left-0 top-2 z-10 flex flex-col rounded-sm bg-white/80 p-1">
        <p className="text-sm font-bold">지도중심기준 행정동 주소정보</p>
        <p id="centerAddr" className="mt-1 text-sm font-medium"></p>
      </div>
    </div>
  );
};

export default KakaoMapAddressContainer;

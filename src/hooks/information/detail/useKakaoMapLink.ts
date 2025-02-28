"use client";

import { useEffect, useState } from "react";

export const useKakaoMapLink = (placeName: string) => {
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        isLoading(false);

        // id가 "map"인 요소에 지도를 생성합니다.
        const container = document.getElementById("map");
        const options = {
          // 지도 좌표값 설정
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),

          // 줌 레벨을 3으로 설정
          level: 3,

          // 지도를 생성할때 지도 이동 및 확대/축소를 막기 위해 draggable: false 옵션을 추가.
          draggable: false,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 장소 검색 객체 생성
        const ps = new window.kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다.
        ps.keywordSearch(placeName, (result: any, status: any) => {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            // 결과값으로 받은 위치를 마커로 표시합니다.
            new window.kakao.maps.Marker({
              // 마커가 표시될 지도
              map: map,

              // 마커가 표시될 위치
              position: coords,

              // 마커에 hover시 나타날 title
              //title: title,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다.
            map.setCenter(coords);

            const handleResize = () => {
              map.relayout();
              map.setCenter(
                new window.kakao.maps.LatLng(result[0].y, result[0].x),
              );
            };

            window.addEventListener("resize", handleResize);

            return () => {
              window.removeEventListener("resize", handleResize);
            };
          }
        });
      });
    }
  }, [placeName]);

  return { loading };
};

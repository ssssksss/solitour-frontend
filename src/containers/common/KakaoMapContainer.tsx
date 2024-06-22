import { useEffect } from "react";

type MyProps = {
  title: string;
  latitude: number; // 위도
  longitude: number; // 경도
};

const KakaoMapContainer = ({ title, latitude, longitude }: MyProps) => {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // id가 "map"인 요소에 지도를 생성한다.
        const container = document.getElementById("map");
        const options = {
          // 지도 좌표값 설정
          center: new window.kakao.maps.LatLng(latitude, longitude),

          // 줌 레벨을 3으로 설정
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          // 마커가 표시될 지도
          map: map,

          // 마커가 표시될 위치
          position: new window.kakao.maps.LatLng(latitude, longitude),

          // 마커에 hover시 나타날 title
          title: title,
        });
      });
    }
  }, [latitude, longitude, title]);

  // 지도를 담을 영역
  // 반드시 width, height 값을 지정해야 지도가 출력된다.
  return (
    <a
      id="map"
      className="h-48 w-full border-2"
      href={`https://map.kakao.com/link/map/${latitude},${longitude}`}
      target="_blank"
    />
  );
};

export default KakaoMapContainer;

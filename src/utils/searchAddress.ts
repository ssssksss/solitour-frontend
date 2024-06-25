/**
 * 좌표로 행정동 주소 정보를 요청하는 함수
 * @param geocoder 주소-좌표 변환 객체
 * @param coords 좌표
 * @param callback
 */
export const searchAddrFromCoords = (
  geocoder: any,
  coords: any,
  callback: any,
) => {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
};

/**
 * 좌표로 법정동 상세 주소 정보를 요청하는 함수
 * @param geocoder 주소-좌표 변환 객체
 * @param coords 좌표
 * @param callback
 */
export const searchDetailAddrFromCoords = (
  geocoder: any,
  coords: any,
  callback: any,
) => {
  // 좌표로 법정동 상세 주소 정보를 요청합니다
  geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
};

/**
 * 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표시하는 함수
 * @param result
 * @param status
 */
export const displayCenterInfo = (result: any, status: any) => {
  if (status === window.kakao.maps.services.Status.OK) {
    const infoDiv = document.getElementById("centerAddr");

    let len = result.length;
    for (let i = 0; i < len; i++) {
      // 행정동의 resion_type 값은 "H"이므로
      if (result[i].region_type === "H") {
        if (result[i].address_name) {
          infoDiv!.innerHTML = result[i].address_name;
        }

        break;
      }
    }
  }
};

"use client";

import PlaceModal from "@/components/informations/write/PlaceModal";
import useEditorStore from "@/store/editorStore";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  closeModal: () => void;
}

const PlaceModalContainer = ({ closeModal }: Props) => {
  const { address, placeName, placeId, changeField, resetPlaceInfo } =
    useEditorStore();
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // 장소 검색 객체 (place search)
  const [ps, setPs] = useState<any>();

  // 주소-좌표 변환 객체
  const [geocoder, setGeocoder] = useState<any>();

  // 장소 검색으로 얻어진 장소 목록
  const [placeInfos, setPlaceInfos] = useState<
    {
      place_name: string;
      address_name: string;
      id: string;
      x: string;
      y: string;
    }[]
  >();

  // 주소 검색으로 얻어진 주소 목록
  const [addressInfos, setAddressInfos] = useState<
    {
      address_name: string;
      x: string;
      y: string;
    }[]
  >();

  const handleLocationSearch = useDebouncedCallback((search: string) => {
    // 키워드로 장소를 검색합니다.
    ps.keywordSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaceInfos(result);
      }
    });
  }, 300);

  const handleAddressSearch = useDebouncedCallback((search: string) => {
    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setAddressInfos(result);
      }
    });
  }, 300);

  const onResetPlace = () => {
    resetPlaceInfo();
    closeModal();
  };

  const onChangePlace = (placeInfo: {
    place_name: string;
    address_name: string;
    id: string;
    x: string;
    y: string;
  }) => {
    const temp = placeInfo.address_name.split(" ");
    changeField("province", temp[0] ?? "");
    changeField("city", temp[1] ?? "");
    changeField("address", placeInfo.address_name);
    changeField("placeId", placeInfo.id);
    changeField("placeXAxis", placeInfo.x);
    changeField("placeYAxis", placeInfo.y);
    changeField("placeName", placeInfo.place_name);
    closeModal();
  };

  const onChangeAddress = (addressInfo: {
    address_name: string;
    x: string;
    y: string;
  }) => {
    const temp = addressInfo.address_name.split(" ");
    changeField("province", temp[0] ?? "");
    changeField("city", temp[1] ?? "");
    changeField("address", addressInfo.address_name);
    changeField("placeXAxis", addressInfo.x);
    changeField("placeYAxis", addressInfo.y);
    changeField("placeId", "0");
  };

  const onChangeCustomPlaceName = (placeName: string) => {
    changeField("placeName", placeName);
  };

  const onClick = (isCustom: boolean) => {
    setIsCustom(isCustom);
  };

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // 장소 검색 객체 생성
        setPs(new window.kakao.maps.services.Places());

        // 주소-좌표 변환 객체 생성
        setGeocoder(new window.kakao.maps.services.Geocoder());
      });
    }
  }, []);

  return (
    <PlaceModal
      placeInfos={placeInfos}
      addressInfos={addressInfos}
      handleLocationSearch={handleLocationSearch}
      handleAddressSearch={handleAddressSearch}
      isCustom={isCustom}
      canTypePlaceName={placeId === "0"}
      canRegister={address !== "" && placeName !== ""}
      onClick={onClick}
      onResetPlace={onResetPlace}
      onChangePlace={onChangePlace}
      onChangeAddress={onChangeAddress}
      onChangeCustomPlaceName={onChangeCustomPlaceName}
      closeModal={closeModal}
    />
  );
};

export default PlaceModalContainer;

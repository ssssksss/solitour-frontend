"use client";

import PlaceModal from "@/components/informations/write/PlaceModal";
import useEditorStore from "@/store/editorStore";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type MyProps = {
  closeModal: () => void;
};

const PlaceModalContainer = ({ closeModal }: MyProps) => {
  const { changeField } = useEditorStore();

  const onChangePlace = (placeInfo: {
    place_name: string;
    address_name: string;
    id: string;
    x: string;
    y: string;
  }) => {
    changeField("address", placeInfo.address_name);
    changeField("placeId", placeInfo.id);
    changeField("placeXAxis", placeInfo.x);
    changeField("placeYAxis", placeInfo.y);
    changeField("placeName", placeInfo.place_name);
    closeModal();
  };

  const [placeInfos, setPlaceInfos] = useState<
    {
      place_name: string;
      address_name: string;
      id: string;
      x: string;
      y: string;
    }[]
  >();

  // 장소 검색 객체 (place search)
  const [ps, setPs] = useState<any>();

  const handleSearch = useDebouncedCallback((search: string) => {
    // 키워드로 장소를 검색합니다.
    ps.keywordSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaceInfos(result.slice(0, 5));
      }
    });
  }, 300);

  const [isCustom, setIsCustom] = useState<boolean>(false);

  const onClick = (isCustom: boolean) => {
    setIsCustom(isCustom);
  };

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // 장소 검색 객체 생성
        setPs(new window.kakao.maps.services.Places());
      });
    }
  }, []);

  return (
    <PlaceModal
      placeInfos={placeInfos}
      handleSearch={handleSearch}
      isCustom={isCustom}
      onClick={onClick}
      onChangePlace={onChangePlace}
      closeModal={closeModal}
    />
  );
};

export default PlaceModalContainer;

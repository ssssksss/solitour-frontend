"use client";

import PlaceModal from "@/components/diary/write/PlaceModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  closeModal: () => void;
}

const PlaceModalContainer = ({ closeModal }: Props) => {
  const diaryEditorStore = useDiaryEditorStore();

  // 장소 검색 객체 (place search)
  const [ps, setPs] = useState<any>();

  // 장소 검색으로 얻어진 장소 목록
  const [placeInfos, setPlaceInfos] = useState<
    {
      place_name: string;
      address_name: string;
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

  const onResetPlace = () => {
    diaryEditorStore.setDiaryEditor({
      placeName: "",
      address: "",
      province: "",
      city: "",
    });
    closeModal();
  };

  const onChangePlace = (placeInfo: {
    place_name: string;
    address_name: string;
  }) => {
    const temp = placeInfo.address_name.split(" ");
    diaryEditorStore.setDiaryEditor({
      placeName: placeInfo.place_name,
      address: placeInfo.address_name,
      province: temp[0].slice(0, 2) ?? "",
      city: temp[1] ?? "",
    });
    closeModal();
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
      handleLocationSearch={handleLocationSearch}
      onResetPlace={onResetPlace}
      onChangePlace={onChangePlace}
    />
  );
};

export default PlaceModalContainer;

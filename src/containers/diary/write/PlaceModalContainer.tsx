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

  // TODO
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
    }[]
  >();

  // 주소 검색으로 얻어진 주소 목록
  const [addressInfos, setAddressInfos] =
    useState<{ address_name: string }[]>();

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
    diaryEditorStore.setDiaryEditor({
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
      address: placeInfo.address_name,
      province: temp[0].slice(0, 2) ?? "",
      city: temp[1] ?? "",
    });
    closeModal();
  };

  const onChangeAddress = (addressInfo: { address_name: string }) => {
    const temp = addressInfo.address_name.split(" ");
    diaryEditorStore.setDiaryEditor({
      address: addressInfo.address_name,
      province: temp[0].slice(0, 2) ?? "",
      city: temp[1] ?? "",
    });
  };

  const onChangeCustomPlaceName = (placeName: string) => {
    // setEditor({ placeName: placeName });
    // TODO
  };

  const onClick = (isCustom: boolean) => {
    // setIsCustom(isCustom);
    // TODO
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
      canTypePlaceName={true} // TODO
      canRegister={true} // TODO
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

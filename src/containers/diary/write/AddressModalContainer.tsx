"use client";

import AddressModal from "@/components/diary/write/AddressModal";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  closeModal: () => void;
}

const AddressModalContainer = ({ closeModal }: Props) => {
  const diaryEditorStore = useDiaryEditorStore();
  const formContext = useFormContext();
  const [flag, setFlag] = useState<boolean>(true);

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

  // 주소 검색으로 얻어진 장소 목록
  const [addressInfos, setAddressInfos] = useState<
    {
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

  const handleAddressSearch = useDebouncedCallback((search: string) => {
    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setAddressInfos(result);
      }
    });
  }, 300);

  const onResetAddress = () => {
    const index = diaryEditorStore.currentDay - 1;
    const addressList: string[] = formContext.getValues("address");
    addressList[index] = "";
    formContext.setValue("address", addressList);
    formContext.trigger("address");
    closeModal();
  };

  const onChangeAddress = (placeInfo: { address_name: string }) => {
    const index = diaryEditorStore.currentDay - 1;
    const addressList: string[] = formContext.getValues("address");

    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i] === "") {
        addressList[i] = placeInfo.address_name;
      }
    }
    addressList[index] = placeInfo.address_name;
    formContext.setValue("address", addressList);
    formContext.trigger("address");
    closeModal();
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

  const changeFlag = (flag: boolean) => {
    setFlag(flag);
  };

  return (
    <AddressModal
      placeInfos={placeInfos}
      addressInfos={addressInfos}
      handleLocationSearch={handleLocationSearch}
      handleAddressSearch={handleAddressSearch}
      flag={flag}
      onResetAddress={onResetAddress}
      onChangeAddress={onChangeAddress}
      changeFlag={changeFlag}
    />
  );
};

export default AddressModalContainer;

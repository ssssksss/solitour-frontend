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

  // 주소-좌표 변환 객체
  const [geocoder, setGeocoder] = useState<any>();

  // 주소 검색으로 얻어진 장소 목록
  const [addressInfos, setAddressInfos] = useState<
    {
      address_name: string;
    }[]
  >();

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
    formContext.trigger();
    closeModal();
  };

  const onChangeAddress = (placeInfo: { address_name: string }) => {
    const index = diaryEditorStore.currentDay - 1;
    const addressList: string[] = formContext.getValues("address");
    addressList[index] = placeInfo.address_name;
    formContext.setValue("address", addressList);
    formContext.trigger();
    closeModal();
  };

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // 주소-좌표 변환 객체 생성
        setGeocoder(new window.kakao.maps.services.Geocoder());
      });
    }
  }, []);

  return (
    <AddressModal
      addressInfos={addressInfos}
      handleAddressSearch={handleAddressSearch}
      onResetAddress={onResetAddress}
      onChangeAddress={onChangeAddress}
    />
  );
};

export default AddressModalContainer;

"use client";

import { useDebounce } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useDiaryAddressModal = (closeModal: () => void) => {
  const formContext = useFormContext();
  const [flag, setFlag] = useState(true);

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

  const handleLocationSearch = useDebounce((search: string) => {
    // 키워드로 장소를 검색합니다.
    ps.keywordSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaceInfos(result);
      }
    });
  }, 300);

  const handleAddressSearch = useDebounce((search: string) => {
    // 주소로 좌표를 검색합니다.
    geocoder.addressSearch(search, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        setAddressInfos(result);
      }
    });
  }, 300);

  const handleAddressReset = () => {
    formContext.setValue("address", "");
    formContext.trigger("address");
    closeModal();
  };

  const handleAddressChange = (placeInfo: { address_name: string }) => {
    formContext.setValue("address", placeInfo.address_name);
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

  return {
    flag,
    placeInfos,
    addressInfos,
    setFlag,
    handleLocationSearch,
    handleAddressSearch,
    handleAddressReset,
    handleAddressChange,
  };
};

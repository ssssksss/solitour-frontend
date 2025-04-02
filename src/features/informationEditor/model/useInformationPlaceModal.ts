"use client";

import { useDebounce } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useInformationPlaceModal = (closeModal: () => void) => {
  const formContext = useFormContext();
  const [isCustom, setIsCustom] = useState(false);

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
        setAddressInfos(
          result.filter(
            (data: { address_name: string; x: string; y: string }) =>
              data.address_name.split(" ")[1] !== undefined,
          ),
        );
      }
    });
  }, 300);

  const handlePlaceReset = () => {
    formContext.setValue("province", "");
    formContext.setValue("city", "");
    formContext.setValue("informationAddress", "");
    formContext.setValue("placeId", "");
    formContext.setValue("placeXAxis", "");
    formContext.setValue("placeYAxis", "");
    formContext.setValue("placeName", "");
    formContext.trigger("placeName");
    closeModal();
  };

  const handlePlaceChange = (placeInfo: {
    place_name: string;
    address_name: string;
    id: string;
    x: string;
    y: string;
  }) => {
    const temp = placeInfo.address_name.split(" ");
    formContext.setValue("province", temp[0].slice(0, 2) ?? "");
    formContext.setValue(
      "city",
      temp[0].slice(0, 2) === "세종" ? "세종" : (temp[1] ?? ""),
    );
    formContext.setValue("informationAddress", placeInfo.address_name);
    formContext.setValue("placeId", placeInfo.id);
    formContext.setValue("placeXAxis", placeInfo.x);
    formContext.setValue("placeYAxis", placeInfo.y);
    formContext.setValue("placeName", placeInfo.place_name);
    formContext.trigger("placeName");
    closeModal();
  };

  const handleAddressChange = (addressInfo: {
    address_name: string;
    x: string;
    y: string;
  }) => {
    const temp = addressInfo.address_name.split(" ");
    formContext.setValue("province", temp[0].slice(0, 2) ?? "");
    formContext.setValue(
      "city",
      temp[0].slice(0, 2) === "세종" ? "세종" : (temp[1] ?? ""),
    );
    formContext.setValue("informationAddress", addressInfo.address_name);
    formContext.setValue("placeXAxis", addressInfo.x);
    formContext.setValue("placeYAxis", addressInfo.y);
    formContext.setValue("placeId", "0");
    formContext.watch();
  };

  const handleCustomPlaceNameChange = (placeName: string) => {
    formContext.setValue("placeName", placeName);
    formContext.trigger("placeName");
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
    formContext,
    placeInfos,
    addressInfos,
    isCustom,
    canTypePlaceName: formContext.getValues("placeId") === "0",
    canRegister:
      formContext.getValues("informationAddress") !== "" &&
      formContext.getValues("placeName") !== "",
    setIsCustom,
    handleLocationSearch,
    handleAddressSearch,
    handlePlaceReset,
    handlePlaceChange,
    handleAddressChange,
    handleCustomPlaceNameChange,
  };
};

"use client";

import GatheringEditor from "@/components/meetings/write/GatheringEditor";
import { gatheringCreateFormSchema } from "@/lib/examples/zod/schema/GatheringCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const GatheringEditorContainer = () => {
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [isPlaceModal, setIsPlaceModal] = useState(false);

  const methods = useForm({
    resolver: zodResolver(gatheringCreateFormSchema),
    defaultValues: {
      title: "",
      content: "",
      permitMinUserAgeYear: new Date().getFullYear() - 20,
      permitMaxUserAgeYear: new Date().getFullYear() - 59,
      permitSex: "all",
      totalPersonCount: 10,
      placeName: "",
      placeXAxis: "",
      placeYAxis: "",
    },
  });

  useEffect(() => {
    if (
      methods.getValues("placeName") == "" ||
      methods.getValues("placeName") == undefined
    )
      return;
    const lat = Number(methods.getValues("placeYAxis"));
    const lng = Number(methods.getValues("placeXAxis"));
    // 카카오 맵이 로드 된 후에 이동 되게 하는 코드
    window.kakao.maps.load(function () {
      const marker = {
        position: new window.kakao.maps.LatLng(lat, lng),
      };
      // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
      const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표.
        level: 3, // 지도의 레벨(확대, 축소 정도)
        marker: marker,
      };

      // const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      new window.kakao.maps.StaticMap(container, options);
    });
  }, [methods.getValues("placeName")]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=a7dc47d0e636bb16e3f8b6f5ed771c82&autoload=false";

    document.head.appendChild(script);
  }, []);

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        categoryModal={{
          isModal: isCategoryModal,
          closeModal: () => setIsCategoryModal(false),
          openModal: () => setIsCategoryModal(true),
        }}
        settingModal={{
          isModal: isSettingModal,
          closeModal: () => setIsSettingModal(false),
          openModal: () => setIsSettingModal(true),
        }}
        scheduleModal={{
          isModal: isScheduleModal,
          closeModal: () => setIsScheduleModal(false),
          openModal: () => setIsScheduleModal(true),
        }}
        placeModal={{
          isModal: isPlaceModal,
          closeModal: () => setIsPlaceModal(false),
          openModal: () => setIsPlaceModal(true),
        }}
      />
    </FormProvider>
  );
};

export default GatheringEditorContainer;

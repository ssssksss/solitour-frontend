import GatheringPlace from "@/components/gathering/write/GatheringPlace";
import GatheringPlaceSettingPanel from "@/components/gathering/write/GatheringPlacePanel";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface IGatheringPlaceContainerProps {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringPlaceContainer = (props: IGatheringPlaceContainerProps) => {
  const formContext = useFormContext();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!formContext.getValues("placeName")) return;
    const lat = Number(formContext.getValues("yAxis"));
    const lng = Number(formContext.getValues("xAxis"));

    window.kakao.maps.load(() => {
      const marker = {
        position: new window.kakao.maps.LatLng(lat, lng),
      };

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
        marker: marker,
      };

      new window.kakao.maps.StaticMap(container, options);
    });
  }, [formContext.getValues("placeName")]);

  useEffect(() => {
    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById("kakao-maps-sdk");
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "/api/kakao-map";
          script.id = "kakao-maps-sdk";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Kakao Maps 스크립트를 로드하는 데 실패했습니다."));
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    loadScript().then(() => {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;

    const placeName = formContext.getValues("placeName");
    if (!placeName) return;

    const lat = Number(formContext.getValues("yAxis"));
    const lng = Number(formContext.getValues("xAxis"));

    const renderMap = () => {
      const container = document.getElementById("map");
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
      };

      // new window.kakao.maps.Map(container, options);
      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(lat,lng);
        new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
    };

    window.kakao.maps.load(renderMap);
  }, [scriptLoaded, formContext]);

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <GatheringPlaceSettingPanel {...props} />
      <GatheringPlace
        placeName={formContext.getValues("placeName")}
        placeUrl={formContext.getValues("placeUrl")}
        roadAddressName={formContext.getValues("roadAddressName")}
        yAxis={formContext.getValues("yAxis")}
        xAxis={formContext.getValues("xAxis")}
      />
    </article>
  );
};

export default GatheringPlaceContainer;

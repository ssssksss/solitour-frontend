import Image from "next/image";

interface GatheringPlaceProps {
  placeName: string;
  placeUrl: string;
  roadAddressName: string;
  yAxis: number;
  xAxis: number;
}

const GatheringPlace = ({
  placeName,
  placeUrl,
  roadAddressName,
  yAxis,
  xAxis,
}: GatheringPlaceProps) => {
  return (
    <div
      className={
        "flex h-[30rem] flex-col gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
      }
    >
      {placeName && (
        <a
          className={"relative flex h-full flex-col items-center justify-center gap-[.25rem] rounded-[1rem]"}
          href={placeUrl || `http://map.kakao.com/link/map/${placeName},${yAxis},${xAxis}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            id="map"
            style={{ width: "100%", height: "calc(100% - 6rem)" }}
            className={"rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}
          ></div>

          <div
            className={"flex h-[6rem] w-full flex-col justify-between gap-[1rem] rounded-[1rem] bg-white p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"}
          >
            <div className={"flex items-center text-2xl font-bold"}>
              {placeName}
            </div>
            <div className={"flex items-center gap-[1rem]"}>
              <Image
                src={"/location-icon.svg"}
                alt={"location-icon"}
                width={14}
                height={14}
              />
              <span> {roadAddressName} </span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default GatheringPlace;

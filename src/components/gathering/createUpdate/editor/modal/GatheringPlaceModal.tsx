import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";

interface IGatheringPlaceModalProps {
  closeModal: () => void;
}

type PlaceElement = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type PlaceElement1 = {
  address: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  address_name: string;
  address_type: string;
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    x: string;
    y: string;
    zone_no: string;
  };
  x: string;
  y: string;
};

const GatheringPlaceModal = (props: IGatheringPlaceModalProps) => {
  const [menu, setMenu] = useState("search");
  const [keyword, setKeyword] = useState("");
  const [placeCustomName, setPlaceCustomName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedKeyword] = useDebounce(keyword, 600);
  const [_, setRoadAddress] = useState<string>();
  const [placeData, setPlaceData] = useState<PlaceElement1>();
  const formContext = useFormContext();

  const handleSearch = async (keyword: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/gathering/searchPlace?keyword=${encodeURIComponent(keyword)}`,
        {
          credentials: "omit",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.documents);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = async (address: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/gathering/searchAddress?address=${encodeURIComponent(address)}`,
        {
          credentials: "omit",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data.documents);
    } finally {
      setLoading(false);
    }
  };

  const pickLocation = (element: PlaceElement) => {
    formContext.setValue("placeName", element.place_name);
    formContext.setValue("xAxis", Number(element.x));
    formContext.setValue("yAxis", Number(element.y));
    formContext.setValue("searchId", element.id);
    formContext.setValue("roadAddressName", element.road_address_name);
    formContext.trigger([
      "placeName",
      "xAxis",
      "yAxis",
      "searchId",
      "roadAddressName",
    ]);
    props.closeModal();
  };

  const pickAddress = (element: PlaceElement1) => {
    setRoadAddress(element.road_address.address_name);
    setPlaceData(element);
  };

  const applyAddressHandler = () => {
    formContext.setValue("placeName", placeCustomName);
    formContext.setValue("xAxis", Number(placeData?.x));
    formContext.setValue("yAxis", Number(placeData?.y));
    formContext.setValue(
      "roadAddressName",
      placeData?.road_address.address_name,
    );
    formContext.setValue("searchId", "");
    formContext.trigger([
      "placeName",
      "xAxis",
      "yAxis",
      "searchId",
      "roadAddressName",
    ]);
    props.closeModal();
  };

  useEffect(() => {
    if (debouncedKeyword) {
      if (menu == "search") {
        handleSearch(debouncedKeyword);
      }
      if (menu == "address") {
        handleAddressSearch(debouncedKeyword);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  return (
    <div
      className={`relative h-full w-[calc(100vw-1rem)] max-w-[40rem] overflow-y-scroll rounded-2xl bg-white p-[1rem] scrollbar-hide ${menu == "address" ? "max-h-[874px]" : "max-h-[800px]"}`}
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => {
          props.closeModal();
        }}
      >
        <Image
          src={"/gathering/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2
        className={
          "mb-[1.875rem] mt-[2rem] h-[2rem] text-2xl font-bold text-black"
        }
      >
        장소 선택
      </h2>
      <section className={"flex flex-col items-center gap-[1.875rem]"}>
        <div className="flex w-full">
          <button
            className={`h-[3rem] w-full px-[1rem] py-[.5rem] ${menu == "search" ? "bg-main text-white" : "text-black outline outline-[1px] outline-offset-[-1px] outline-black"}`}
            onClick={() => {
              setMenu("search");
              setResults([]);
              setKeyword("");
            }}
          >
            검색으로 찾기
          </button>
          <button
            className={`h-[3rem] w-full px-[1rem] py-[.5rem] ${menu == "address" ? "bg-main text-white" : "text-black outline outline-[1px] outline-offset-[-1px] outline-black"}`}
            onClick={() => {
              setMenu("address");
              setResults([]);
              setKeyword("");
            }}
          >
            직접 주소 입력하기
          </button>
        </div>
        <div
          className={`w-full ${menu == "address" ? "h-[30rem]" : "h-[37rem]"}`}
        >
          {menu == "search" && (
            <>
              <article className="flex h-full w-full flex-col rounded-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <label
                  className={
                    "flex h-[3.25rem] gap-[0.375rem] rounded-[1.5rem_1.5rem_0_1.5rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
                  }
                >
                  <Image
                    src={"/gathering/search-icon.svg"}
                    alt={"search-icon"}
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="장소나 건물명을 입력해주세요"
                    className={
                      "h-[3rem] w-full bg-transparent focus:outline-none"
                    }
                  />
                </label>

                <ul className="flex h-full flex-col gap-[.5rem] overflow-scroll px-[.5rem] py-[1rem]">
                  {loading ? (
                    <p
                      className={
                        "flex h-full w-full items-center justify-center"
                      }
                    >
                      Loading...
                    </p>
                  ) : (
                    <>
                      {results.map((result: PlaceElement, index) => (
                        <li
                          key={index}
                          className="flex h-[3rem] w-full cursor-pointer flex-col px-[.5rem] py-[.25rem] outline-main hover:rounded-[1rem] hover:outline hover:outline-[2px] hover:outline-offset-[-1px]"
                          onClick={() => pickLocation(result)}
                        >
                          <div className={"flex gap-1"}>
                            <Image
                              src={"/gathering/location-icon.svg"}
                              alt={"location-icon"}
                              width={14}
                              height={14}
                            />
                            <span> {result.place_name} </span>
                          </div>
                          <div className={"text-sm text-gray2"}>
                            {result.road_address_name}
                          </div>
                        </li>
                      ))}
                      {results.length == 0 && (
                        <div className={"flex justify-center py-[2rem]"}>
                          결과가 없습니다.
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </article>
            </>
          )}
          {menu == "address" && (
            <>
              <article className="flex h-full w-full flex-col rounded-[1.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
                <label
                  className={
                    "flex h-[3.25rem] gap-[0.375rem] rounded-[1.5rem_1.5rem_0_1.5rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
                  }
                >
                  <Image
                    src={"/gathering/search-icon.svg"}
                    alt={"search-icon"}
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="도로명주소를 입력하세요"
                    className={"h-[3rem] bg-transparent focus:outline-none"}
                  />
                </label>

                <ul className="flex h-full flex-col gap-[.5rem] overflow-scroll px-[.5rem] py-[1rem]">
                  {loading ? (
                    <p
                      className={
                        "flex h-full w-full items-center justify-center"
                      }
                    >
                      Loading...
                    </p>
                  ) : (
                    <>
                      <li className="grid h-[3rem] w-full grid-cols-[auto_8rem] px-[.5rem] py-[.25rem] outline-main">
                        <div className={"flex items-center justify-center"}>
                          주소명
                        </div>
                        <div className={"grid grid-cols-[3rem_5rem]"}>
                          <div className={"flex items-center justify-center"}>
                            구분1
                          </div>
                          <div className={"flex items-center justify-center"}>
                            구분2
                          </div>
                        </div>
                      </li>
                      {results
                        .filter(
                          (i: { road_address: { address_name: string } }) =>
                            i?.road_address?.address_name != undefined,
                        )
                        .map((result: PlaceElement1, index) => (
                          <li
                            key={index}
                            className="grid h-[3rem] w-full cursor-pointer grid-cols-[auto_8rem] px-[.5rem] py-[.25rem] outline-main hover:rounded-[1rem] hover:outline hover:outline-[2px] hover:outline-offset-[-1px]"
                            onClick={() => pickAddress(result)}
                          >
                            <div className={"flex items-center gap-1"}>
                              <Image
                                src={"/gathering/location-icon.svg"}
                                alt={"location-icon"}
                                width={14}
                                height={14}
                              />
                              <div> {result.address_name} </div>
                            </div>
                            <div
                              className={
                                "grid grid-cols-[3rem_5rem] text-sm text-gray2"
                              }
                            >
                              <div
                                className={"flex items-center justify-center"}
                              >
                                {result?.road_address?.region_1depth_name}
                              </div>
                              <div
                                className={"flex items-center justify-center"}
                              >
                                {result?.road_address?.region_2depth_name}
                              </div>
                            </div>
                          </li>
                        ))}
                      {results.filter(
                        (i: { road_address: { address_name: string } }) =>
                          i?.road_address?.address_name != undefined,
                      ).length == 0 && (
                        <div className={"flex justify-center py-[2rem]"}>
                          결과가 없습니다.
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </article>
            </>
          )}
        </div>
        {menu == "address" && (
          <div className={"flex w-full flex-col gap-[1rem]"}>
            <h3
              className={"flex items-center gap-[1rem] font-medium text-black"}
            >
              <span className={"text-lg font-bold text-black"}>
                장소명 입력
              </span>
              <span className={"text-gray1"}>
                {placeData?.road_address.address_name}
              </span>
            </h3>
            <input
              type="text"
              placeholder="장소명을 입력하세요"
              onChange={(e) => setPlaceCustomName(e.target.value)}
              className={
                "h-[3.25rem] w-full rounded-[1rem] bg-transparent px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            />
            <button
              className={
                "h-[3rem] w-full rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
              }
              onClick={() => applyAddressHandler()}
              disabled={
                placeCustomName == "" ||
                placeData?.road_address.address_name == undefined
              }
            >
              장소 적용하기
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default GatheringPlaceModal;

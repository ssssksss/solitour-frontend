import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
interface IGatheringPlaceModalProps {
  closeModal: () => void;
}


type placeElement = {
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

type placeElement1 = {
  address: {
    address_name: string,
    b_code: string,
    h_code: string,
    main_address_no: string,
    mountain_yn: string,
    region_1depth_name: string,
    region_2depth_name: string,
    region_3depth_h_name: string,
    region_3depth_name: string,
    sub_address_no: string,
    x: string,
    y: string,
  },
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
  const [placeName, setPlaceName] = useState("");
  const [debouncedKeyword] = useDebounce(keyword, 600);
  const [_, setRoadAddress] = useState<string>();
  const [placeData, setPlaceData] = useState<placeElement1>();
  const formContext = useFormContext();
  const handleSearch = async (keyword: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
          },
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
        `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
          },
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

  const pickLocation = (element: placeElement) => {
    formContext.setValue("placeName", element.place_name);
    formContext.setValue("placeSearchId", element.id);
    formContext.setValue("placeXAxis", element.x);
    formContext.setValue("placeYAxis", element.y);
    formContext.setValue("placeAddress", element.road_address_name);
    formContext.setValue("placeUrl", element.place_url);
    formContext.watch();
    props.closeModal();
  };

  const pickAddress = (element: placeElement1) => {
    console.log("GatheringPlaceModal.tsx 파일 : ",element);
    setRoadAddress(element.road_address.address_name);
    setPlaceData(element);
  };

  const submitHandler = () => {
    formContext.setValue("placeName", placeName);
    // formContext.setValue("placeSearchId", placeData);
    formContext.setValue("placeXAxis", placeData?.x);
    formContext.setValue("placeYAxis", placeData?.y);
    formContext.setValue("placeAddress", placeData?.road_address.address_name);
    // formContext.setValue("placeUrl", placeData.place_url);
    formContext.watch();
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
  }, [debouncedKeyword]);

  return (
    <div
      className={
        "relative h-full w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => {
          props.closeModal();
        }}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <h2 className={"h-[2rem] text-2xl font-bold text-black"}> 장소 선택 </h2>
      <section
        className={
          "flex h-[calc(100%-2rem)] w-full flex-col items-center gap-[1rem] pt-[2rem]"
        }
      >
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
          className={`w-full ${menu == "address" ? "h-[calc(100%-12rem)]" : "h-[calc(100%-6rem)]"}`}
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
                    src={"/search-icon.svg"}
                    alt={"search-icon"}
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="장소나 건물명을 입력해주세요"
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
                      {results.map((result: placeElement, index) => (
                        <li
                          key={index}
                          className="flex h-[3rem] w-full cursor-pointer flex-col px-[.5rem] py-[.25rem] outline-main hover:rounded-[1rem] hover:outline hover:outline-[2px] hover:outline-offset-[-1px]"
                          onClick={() => pickLocation(result)}
                        >
                          <div className={"flex gap-1"}>
                            <Image
                              src={"/location-icon.svg"}
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
                    src={"/search-icon.svg"}
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
                        .map((result: placeElement1, index) => (
                          <li
                            key={index}
                            className="grid h-[3rem] w-full cursor-pointer grid-cols-[auto_8rem] px-[.5rem] py-[.25rem] outline-main hover:rounded-[1rem] hover:outline hover:outline-[2px] hover:outline-offset-[-1px]"
                            onClick={() => pickAddress(result)}
                          >
                            <div className={"flex items-center gap-1"}>
                              <Image
                                src={"/location-icon.svg"}
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
              className={
                "flex h-[2rem] items-center gap-[1rem] font-medium text-black"
              }
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
              onChange={(e) => setPlaceName(e.target.value)}
              className={
                "h-[3.25rem] rounded-[1rem] bg-transparent px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            />
            <button
              className={
                "h-[3rem] w-full rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
              }
              onClick={() => submitHandler()}
              disabled={
                placeName == "" ||
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

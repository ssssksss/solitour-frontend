import Image from "next/image";
import { MdClose } from "react-icons/md";
import { DebouncedState } from "use-debounce";

type MyProps = {
  placeInfos:
    | {
        place_name: string;
        address_name: string;
        id: string;
        x: string;
        y: string;
      }[]
    | undefined;
  handleSearch: DebouncedState<(search: string) => void>;
  onChangePlace: (value: {
    place_name: string;
    address_name: string;
    id: string;
    x: string;
    y: string;
  }) => void;
  closeModal: () => void;
};

const PlaceModal = ({
  placeInfos,
  handleSearch,
  onChangePlace,
  closeModal,
}: MyProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[25rem] flex-col rounded-xl bg-white p-6 max-[600px]:w-[90%]">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main"
            size={"2.5rem"}
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col gap-8 p-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-black">장소 선택</h3>
            <div className="flex h-11 flex-row items-center border-2 text-sm">
              <button
                className="h-11 flex-[50%] bg-main text-white"
                type="button"
              >
                검색으로 찾기
              </button>
              <button className="h-11 flex-[50%] text-gray1" type="button">
                직접 주소 입력하기
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-black">장소 검색하기</h3>
            <div className="flex h-56 flex-col rounded-3xl border-b-[0.0625rem] border-l-[0.0625rem] border-r-[0.0625rem]">
              <input
                className="h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm outline-none hover:border-main focus:border-main max-[480px]:w-full"
                type="text"
                autoComplete="location"
                name="location"
                placeholder="장소명을 입력하세요."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="flex flex-col items-start gap-2 px-6 py-4">
                {placeInfos?.map((placeInfo, index) => (
                  <button
                    key={index}
                    className="flex flex-row items-center gap-2 text-sm hover:text-main"
                    onClick={() => onChangePlace(placeInfo)}
                  >
                    <Image
                      src="/location-icon.svg"
                      alt="location-icon"
                      width={10}
                      height={10}
                    />
                    {placeInfo.place_name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;

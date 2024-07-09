import { MdClose } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { DebouncedState } from "use-debounce";

interface Props {
  placeInfos:
    | {
        place_name: string;
        address_name: string;
        id: string;
        x: string;
        y: string;
      }[]
    | undefined;
  addressInfos:
    | {
        address_name: string;
        x: string;
        y: string;
      }[]
    | undefined;
  handleLocationSearch: DebouncedState<(search: string) => void>;
  handleAddressSearch: DebouncedState<(search: string) => void>;
  isCustom: boolean;
  canTypePlaceName: boolean;
  canRegister: boolean;
  onClick: (isCustom: boolean) => void;
  onResetPlace: () => void;
  onChangePlace: (value: {
    place_name: string;
    address_name: string;
    id: string;
    x: string;
    y: string;
  }) => void;
  onChangeAddress: (value: {
    address_name: string;
    x: string;
    y: string;
  }) => void;
  onChangeCustomPlaceName: (placeName: string) => void;
  closeModal: () => void;
}

const PlaceModal = ({
  placeInfos,
  addressInfos,
  handleLocationSearch,
  handleAddressSearch,
  isCustom,
  canTypePlaceName,
  canRegister,
  onClick,
  onResetPlace,
  onChangePlace,
  onChangeAddress,
  onChangeCustomPlaceName,
  closeModal,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[39.75rem] flex-col rounded-xl bg-white p-6 max-[744px]:w-[calc(100%_-_48px)] dark:bg-slate-800">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
            size={"2.5rem"}
            onClick={onResetPlace}
          />
        </div>
        <div className="flex flex-col gap-8 px-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              장소 선택
            </h3>
            <div className="flex h-11 flex-row items-center border-[0.0625rem] text-sm">
              <button
                className={`h-11 flex-[50%] ${isCustom ? "text-gray1 dark:text-slate-400" : "bg-main text-white"}`}
                type="button"
                onClick={() => onClick(false)}
              >
                검색으로 찾기
              </button>
              <button
                className={`h-11 flex-[50%] ${isCustom ? "bg-main text-white" : "text-gray1 dark:text-slate-400"}`}
                type="button"
                onClick={() => onClick(true)}
              >
                직접 장소 입력하기
              </button>
            </div>
          </div>
          <div
            className={`${isCustom ? "hidden" : ""} flex w-full flex-col gap-2`}
          >
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              장소 검색하기
            </h3>
            <div className="flex h-80 flex-col rounded-3xl border-b-[0.0625rem] border-l-[0.0625rem] border-r-[0.0625rem]">
              <input
                className="h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-transparent bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm outline-none hover:border-main focus:border-main max-[480px]:w-full dark:bg-search-icon-dark-mode"
                type="text"
                autoComplete="location"
                name="location"
                placeholder="장소명을 입력하세요. (Ex. 테라로사 포스코센터점)"
                onChange={(e) => handleLocationSearch(e.target.value)}
              />
              <div className="flex h-64 flex-col items-start gap-2 overflow-y-auto px-6 py-4">
                {placeInfos?.map((placeInfo, index) => (
                  <button
                    key={index}
                    className="flex w-full flex-col gap-1 hover:bg-gray-100 dark:hover:bg-slate-600"
                    type="button"
                    onClick={() => onChangePlace(placeInfo)}
                  >
                    <div className="flex flex-row items-center gap-2 text-sm text-black dark:text-slate-200">
                      <TiLocation />
                      {placeInfo.place_name}
                    </div>
                    <span className="text-xs text-gray1 dark:text-slate-400">
                      {placeInfo.address_name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`${isCustom ? "" : "hidden"} flex w-full flex-col gap-2`}
          >
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              도로명주소 찾기
            </h3>
            <div
              className={`${canTypePlaceName ? "h-fit" : "h-80 border-b-[0.0625rem] border-l-[0.0625rem] border-r-[0.0625rem]"} flex flex-col rounded-3xl`}
            >
              <input
                className="h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-transparent bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm outline-none hover:border-main focus:border-main max-[480px]:w-full dark:bg-search-icon-dark-mode"
                type="text"
                autoComplete="address"
                name="address"
                placeholder="도로명주소를 입력하세요. (Ex. 용산구 청파로)"
                onChange={(e) => handleAddressSearch(e.target.value)}
                disabled={canTypePlaceName}
              />
              <div
                className={`${canTypePlaceName ? "hidden" : ""} flex h-64 flex-col items-start gap-2 overflow-y-auto px-6 py-4`}
              >
                {addressInfos?.map((addressInfo, index) => (
                  <button
                    key={index}
                    className="flex w-full flex-col gap-1 hover:bg-gray-100 dark:hover:bg-slate-600"
                    type="button"
                    onClick={() => onChangeAddress(addressInfo)}
                  >
                    <div className="flex flex-row items-center gap-2 text-sm text-black dark:text-slate-200">
                      <TiLocation />
                      {addressInfo.address_name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`${canTypePlaceName ? "" : "hidden"} flex flex-row items-center justify-between gap-2`}
            >
              <input
                className="h-[3.3125rem] w-96 rounded-[21px] border-[0.0625rem] bg-transparent bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm outline-none hover:border-main focus:border-main max-[480px]:w-full dark:bg-search-icon-dark-mode"
                type="text"
                autoComplete="location"
                name="location"
                placeholder="장소명을 입력하세요."
                onChange={(e) => onChangeCustomPlaceName(e.target.value)}
              />
              <button
                className={`h-[3.3125rem] w-40 rounded-full bg-main text-[0.9375rem] text-white hover:scale-105 ${canRegister ? "" : "hidden"}`}
                type="button"
                onClick={() => closeModal()}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;

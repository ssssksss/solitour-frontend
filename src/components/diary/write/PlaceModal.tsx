import { MdClose } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { DebouncedState } from "use-debounce";

interface Props {
  placeInfos:
    | {
        place_name: string;
        address_name: string;
      }[]
    | undefined;
  handleLocationSearch: DebouncedState<(search: string) => void>;
  onResetPlace: () => void;
  onChangePlace: (value: { place_name: string; address_name: string }) => void;
}

const PlaceModal = ({
  placeInfos,
  handleLocationSearch,
  onResetPlace,
  onChangePlace,
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
          <div className="flex w-full flex-col gap-2">
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              장소 검색하기
            </h3>
            <div className="flex h-80 flex-col rounded-3xl border-b-[0.0625rem] border-l-[0.0625rem] border-r-[0.0625rem]">
              <input
                className="h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-transparent bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm outline-none hover:border-main focus:border-main max-[480px]:w-full dark:bg-search-icon-dark-mode"
                type="text"
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
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;

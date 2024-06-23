import { ChangeEvent } from "react";
import { MdClose } from "react-icons/md";

type MyProps = {
  placeName: string;
  onChangePlaceName: (e: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
};

const PlaceModal = ({ placeName, onChangePlaceName, closeModal }: MyProps) => {
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
                value={placeName}
                onChange={onChangePlaceName}
              />
            </div>
          </div>
          <button
            className="h-11 w-full rounded-full bg-main text-white hover:scale-105"
            type="button"
            onClick={closeModal}
          >
            장소 적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;

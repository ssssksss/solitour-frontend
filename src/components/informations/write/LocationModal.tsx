import { ChangeEvent } from "react";
import { MdClose } from "react-icons/md";

type MyProps = {
  location: string;
  onChangeLocation: (e: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
};

const LocationModal = ({ location, onChangeLocation, closeModal }: MyProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[34rem] flex-col rounded-xl bg-white p-6 max-[560px]:w-[90%]">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="cursor-pointer text-gray2 hover:text-main"
            size={"2.5rem"}
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col gap-9 p-5">
          <div className="flex h-[3.3125rem] flex-row items-center gap-9">
            <h3 className="text-lg font-bold text-black">장소</h3>
            <input
              className="h-full flex-grow rounded-3xl border-2 border-gray3 bg-search-icon bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pl-10 pr-6 text-sm font-semibold outline-none hover:border-main focus:border-main"
              type="text"
              autoComplete="location"
              name="location"
              placeholder="장소명을 입력하세요."
              value={location}
              onChange={onChangeLocation}
            />
          </div>
          <div className="flex flex-col items-start gap-[1.375rem] font-semibold text-gray1">
            <button className="hover:text-main" type="button">
              서울
            </button>
            <button className="hover:text-main" type="button">
              부산
            </button>
            <button className="hover:text-main" type="button">
              경기
            </button>
            <button className="hover:text-main" type="button">
              제주
            </button>
            <button className="hover:text-main" type="button">
              충청
            </button>
            <button className="hover:text-main" type="button">
              강원
            </button>
            <button className="hover:text-main" type="button">
              인천
            </button>
            <button className="hover:text-main" type="button">
              경상
            </button>
            <button className="hover:text-main" type="button">
              전라
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

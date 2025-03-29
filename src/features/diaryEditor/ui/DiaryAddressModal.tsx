"use client";

import { TiLocation } from "react-icons/ti";
import { useDiaryAddressModal } from "../model/useDiaryAddressModal";
import { ModalTemplate } from "@/shared/ui/modal";

interface DiaryAddressModalProps {
  closeModal: () => void;
}

export const DiaryAddressModal = ({ closeModal }: DiaryAddressModalProps) => {
  const {
    flag,
    placeInfos,
    addressInfos,
    setFlag,
    handleLocationSearch,
    handleAddressSearch,
    handleAddressReset,
    handleAddressChange,
  } = useDiaryAddressModal(closeModal);

  return (
    <ModalTemplate
      className="h-fit max-h-[calc(100%_-_48px)] w-159 p-6 max-[744px]:w-[calc(100%_-_48px)]"
      closeModal={handleAddressReset}
    >
      <div className="flex w-full flex-col gap-8 px-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-black">장소 선택</h3>
          <div className="flex h-11 flex-row items-center border text-sm">
            <button
              className={[
                !flag ? "text-gray1" : "bg-main text-white",
                "h-11 flex-1/2",
              ].join(" ")}
              type="button"
              onClick={() => setFlag(true)}
            >
              장소 검색하기
            </button>
            <button
              className={[
                !flag ? "bg-main text-white" : "text-gray1",
                "h-11 flex-1/2",
              ].join(" ")}
              type="button"
              onClick={() => setFlag(false)}
            >
              도로명주소 찾기
            </button>
          </div>
        </div>
        {flag ? (
          <div className="flex w-full flex-col gap-2">
            <h3 className="text-lg font-medium text-black">장소 검색하기</h3>
            <div className="flex h-80 flex-col rounded-3xl border-r border-b border-l">
              <input
                className="bg-search-icon hover:border-main focus:border-main h-13.25 rounded-[21px] border bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
                type="text"
                autoComplete="off"
                name="location"
                placeholder="장소명을 입력하세요. (Ex. 테라로사 포스코센터점)"
                onChange={(e) => handleLocationSearch(e.target.value)}
              />
              <div className="flex h-64 flex-col items-start gap-2 overflow-y-auto px-6 py-4">
                {placeInfos?.map((placeInfo, index) => (
                  <button
                    key={index}
                    className="flex w-full flex-col items-start gap-1 hover:bg-gray-100"
                    type="button"
                    onClick={() => handleAddressChange(placeInfo)}
                  >
                    <div className="flex flex-row items-center gap-2 text-sm text-black">
                      <TiLocation />
                      {placeInfo.place_name}
                    </div>
                    <span className="text-gray1 text-xs">
                      {placeInfo.address_name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2">
            <h3 className="text-lg font-medium text-black">도로명주소 찾기</h3>
            <div className="flex h-80 flex-col rounded-3xl border-r border-b border-l">
              <input
                className="bg-search-icon hover:border-main focus:border-main h-13.25 rounded-[21px] border bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
                type="text"
                autoComplete="off"
                placeholder="도로명주소를 입력하세요. (Ex. 용산구 청파로)"
                onChange={(e) => handleAddressSearch(e.target.value)}
              />
              <div className="flex h-64 flex-col items-start gap-2 overflow-y-auto px-6 py-4">
                {addressInfos?.map((addressInfo, index) => (
                  <button
                    key={index}
                    className="flex w-full flex-col gap-1 hover:bg-gray-100"
                    type="button"
                    onClick={() => handleAddressChange(addressInfo)}
                  >
                    <div className="flex flex-row items-center gap-2 text-sm text-black">
                      <TiLocation />
                      {addressInfo.address_name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalTemplate>
  );
};

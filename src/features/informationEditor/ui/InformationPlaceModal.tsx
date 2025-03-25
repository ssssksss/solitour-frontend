"use client";

import { TiLocation } from "react-icons/ti";
import { useInformationPlaceModal } from "../model/useInformationPlaceModal";
import { ModalTemplate } from "@/shared/ui/modal";

interface InformationPlaceModalProps {
  closeModal: () => void;
}

export const InformationPlaceModal = ({
  closeModal,
}: InformationPlaceModalProps) => {
  const {
    formContext,
    placeInfos,
    addressInfos,
    isCustom,
    canTypePlaceName,
    canRegister,
    setIsCustom,
    handleLocationSearch,
    handleAddressSearch,
    handlePlaceReset,
    handlePlaceChange,
    handleAddressChange,
    handleCustomPlaceNameChange,
  } = useInformationPlaceModal(closeModal);

  return (
    <ModalTemplate
      className="w-[39.75rem] gap-8 p-6 max-[744px]:w-[calc(100%_-_48px)]"
      closeModal={handlePlaceReset}
    >
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-lg font-medium text-black">장소 선택</h3>
        <div className="flex h-11 flex-row items-center border text-sm">
          <button
            className={`h-11 flex-[50%] ${isCustom ? "text-gray1" : "bg-main text-white"}`}
            type="button"
            onClick={() => setIsCustom(false)}
          >
            검색으로 찾기
          </button>
          <button
            className={`h-11 flex-[50%] ${isCustom ? "bg-main text-white" : "text-gray1"}`}
            type="button"
            onClick={() => setIsCustom(true)}
          >
            직접 장소 입력하기
          </button>
        </div>
      </div>
      {!isCustom && (
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-lg font-medium text-black">장소 검색하기</h3>
          <div className="flex h-80 flex-col rounded-3xl border-r-[0.0625rem] border-b-[0.0625rem] border-l-[0.0625rem]">
            <input
              className="bg-search-icon hover:border-main focus:border-main h-[3.3125rem] rounded-[21px] border bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
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
                  onClick={() => handlePlaceChange(placeInfo)}
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
      )}
      {isCustom && (
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-lg font-medium text-black">도로명주소 찾기</h3>
          <div
            className={`${canTypePlaceName ? "h-fit" : "h-80 border-r-[0.0625rem] border-b-[0.0625rem] border-l-[0.0625rem]"} flex flex-col rounded-3xl`}
          >
            <input
              className={`${canTypePlaceName ? "bg-gray-100/25" : ""} bg-search-icon hover:border-main focus:border-main h-[3.3125rem] rounded-[21px] border bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full`}
              type="text"
              autoComplete="off"
              {...formContext.register("informationAddress")}
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
          <div
            className={`${canTypePlaceName ? "" : "hidden"} flex flex-row items-center justify-between gap-2`}
          >
            <input
              className="bg-search-icon hover:border-main focus:border-main h-[3.3125rem] w-96 rounded-[21px] border bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
              type="text"
              autoComplete="off"
              name="location"
              placeholder="장소명을 입력하세요."
              onChange={(e) => handleCustomPlaceNameChange(e.target.value)}
            />
            <button
              className={`bg-main h-[3.3125rem] w-40 rounded-full text-[0.9375rem] text-white hover:scale-105 ${canRegister ? "" : "hidden"}`}
              type="button"
              onClick={() => closeModal()}
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </ModalTemplate>
  );
};

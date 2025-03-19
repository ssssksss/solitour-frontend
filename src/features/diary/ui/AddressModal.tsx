"use client";

import { MdClose } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { useAddressModal } from "../model/useAddressModal";

interface AddressModalProps {
  closeModal: () => void;
}

export const AddressModal = ({ closeModal }: AddressModalProps) => {
  const {
    flag,
    placeInfos,
    addressInfos,
    setFlag,
    handleLocationSearch,
    handleAddressSearch,
    handleAddressReset,
    handleAddressChange,
  } = useAddressModal(closeModal);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit max-h-[calc(100%_-_48px)] w-[39.75rem] flex-col overflow-y-auto rounded-xl bg-white p-6 max-[744px]:w-[calc(100%_-_48px)]">
        <div className="flex flex-row items-center justify-end">
          <MdClose
            className="text-gray2 hover:text-main cursor-pointer"
            size="2.5rem"
            onClick={handleAddressReset}
          />
        </div>
        <div className="flex flex-col gap-8 px-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-black">장소 선택</h3>
            <div className="flex h-11 flex-row items-center border-[0.0625rem] text-sm">
              <button
                className={`h-11 flex-[50%] ${!flag ? "text-gray1" : "bg-main text-white"}`}
                type="button"
                onClick={() => setFlag(true)}
              >
                장소 검색하기
              </button>
              <button
                className={`h-11 flex-[50%] ${!flag ? "bg-main text-white" : "text-gray1"}`}
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
              <div className="flex h-80 flex-col rounded-3xl border-r-[0.0625rem] border-b-[0.0625rem] border-l-[0.0625rem]">
                <input
                  className="bg-search-icon hover:border-main focus:border-main h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
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
                      className="flex w-full flex-col gap-1 hover:bg-gray-100"
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
              <h3 className="text-lg font-medium text-black">
                도로명주소 찾기
              </h3>
              <div className="flex h-80 flex-col rounded-3xl border-r-[0.0625rem] border-b-[0.0625rem] border-l-[0.0625rem]">
                <input
                  className="bg-search-icon hover:border-main focus:border-main h-[3.3125rem] rounded-[21px] border-[0.0625rem] bg-transparent bg-[length:1rem] bg-[left_1rem_center] bg-no-repeat pr-6 pl-10 text-sm outline-hidden max-[480px]:w-full"
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
      </div>
    </div>
  );
};

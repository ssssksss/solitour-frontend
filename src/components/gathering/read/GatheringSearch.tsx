import Image from "next/image";
import Dropdown from "../../common/dropdown/Dropdown";

interface Props {
  dropDownHandler: (value: string) => void;
  dropdownValue: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchHandler: () => void;
  loading: boolean;
}

const OPTIONS = [
  {
    value: "제목",
    name: "제목",
  },
  {
    value: "태그",
    name: "태그",
  },
];

const GatheringSearch = ({
  dropDownHandler,
  dropdownValue,
  searchValue,
  setSearchValue,
  searchHandler,
  loading,
}: Props) => {
  if (loading)
    return (
      <div
        className={`relative flex h-[2.75rem] w-[21.4375rem] flex-shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left`}
      ></div>
    );

  return (
    <div className="flex flex-row items-center gap-4 max-[1024px]:justify-between max-[744px]:w-full max-[744px]:flex-col max-[744px]:items-start">
      <div className="relative z-[1] flex flex-row items-center max-[744px]:w-full">
        <div
          className={
            "absolute left-0 top-0 flex h-full flex-row items-center text-sm text-gray1 hover:text-main"
          }
        >
          <Dropdown
            options={OPTIONS}
            dropdownHandler={dropDownHandler}
            value={dropdownValue}
            defaultValue={dropdownValue}
            dropdownContainerStyle={{
              style: "pl-[1.125rem]",
              w: "w-[5rem]",
              h: "h-[2.75rem]",
            }}
            dropdownOptionStyle={{
              w: "w-[5rem]",
              z: "-z-[1]",
              style: "pt-[2.75rem] rounded-[1.375rem_0rem_0.75rem_0.75rem]",
            }}
          />
        </div>
        <p className="absolute left-[4.6875rem] top-2 text-gray3">|</p>
        <input
          className="h-[2.75rem] w-[21.4375rem] rounded-full border-[0.0625rem] border-gray3 bg-white pl-[5.8125rem] pr-12 text-sm outline-none placeholder:font-medium placeholder:text-gray2 max-[1024px]:w-full"
          type="text"
          autoComplete="search"
          placeholder="검색하기"
          value={searchValue}
          maxLength={50}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <button
          className="absolute right-[0.375rem] top-[0.3125rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full bg-[#F2FAF7] hover:scale-110"
          onClick={() => searchHandler()}
        >
          <Image
            src="/common/search-icon.png"
            alt="search-icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

export default GatheringSearch;

import Image from "next/image";
import Link from "next/link";

const TabList = () => {
  return (
    <div className="mt-20 flex w-[60rem] flex-row items-center justify-between max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)] max-[744px]:flex-col max-[744px]:gap-4">
      <Link
        className="flex h-72 w-[29.375rem] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA] p-12 duration-300 hover:scale-105 max-[1024px]:h-48 max-[1024px]:w-[19.25rem] max-[1024px]:p-6 max-[744px]:w-full"
        href="/informations/restaurant?subCategory=all"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black max-[1024px]:text-lg">
            여행 정보
          </h2>
          <p className="text-sm text-gray1">
            <span className="text-main">399</span>개의 맛집, 숙박, 액티비티
          </p>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative h-[7.875rem] w-[7.875rem] max-[1024px]:h-20 max-[1024px]:w-20">
            <Image
              src={"/Trip-search-icon.svg"}
              alt={"Trip-search-icon"}
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </Link>
      <Link
        className="flex h-72 w-[29.375rem] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF] p-12 duration-300 hover:scale-105 max-[1024px]:h-48 max-[1024px]:w-[19.25rem] max-[1024px]:p-6 max-[744px]:w-full"
        href="/meetings"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-black max-[1024px]:text-lg">
            모임 정보
          </h2>
          <p className="text-sm text-gray1">
            <span className="text-main">1204</span>개의 다양한 테마의 모임
          </p>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative h-[7.5rem] w-24 max-[1024px]:h-[4.875rem] max-[1024px]:w-[3.8125rem]">
            <Image
              src={"/Meeting-search-icon.svg"}
              alt={"Meeting-search-icon"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TabList;

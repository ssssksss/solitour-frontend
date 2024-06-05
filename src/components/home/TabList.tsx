import Image from "next/image";
import Link from "next/link";

const TabList = () => {
  return (
    <div className="mt-20 flex w-[960px] flex-row items-center justify-between max-[1024px]:w-[90%] max-[1024px]:flex-col max-[1024px]:space-y-4">
      <Link
        className="flex h-72 w-[470px] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#EBE0FA] to-[#CBF6FF] p-12 duration-300 hover:scale-105 max-[1024px]:w-[90%]"
        href="/informations/restaurant"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">혼여행 정보</h2>
          <p className="text-sm text-neutral-500">
            <span className="font-medium text-main">399</span>개의 맛집, 숙박,
            액티비티
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Image
            src={"/Trip-search-icon.svg"}
            alt={"Trip-search-icon"}
            width={126}
            height={126}
          />
        </div>
      </Link>
      <Link
        className="flex h-72 w-[470px] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF] p-12 duration-300 hover:scale-105 max-[1024px]:w-[90%]"
        href="/meetings"
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">혼모임 정보</h2>
          <p className="text-sm text-neutral-500">
            <span className="font-medium text-main">1204</span>개의 다양한
            테마의 모임
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Image
            src={"/Meeting-search-icon.svg"}
            alt={"Meeting-search-icon"}
            width={96}
            height={120}
          />
        </div>
      </Link>
    </div>
  );
};

export default TabList;

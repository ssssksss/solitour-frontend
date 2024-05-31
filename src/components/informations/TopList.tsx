import Link from "next/link";

type MyProps = {
  onClick: () => void;
};

const TopList = ({ onClick }: MyProps) => {
  return (
    <div className="w-[960px] h-72 bg-white rounded-2xl -mt-16 shadow-md px-20 flex flex-col justify-center">
      <div className="border-b-2 border-neutral-200 font-semibold text-xl pb-3 mb-9">
        맛집 정보 TOP 5
      </div>
      <div className="flex flex-row justify-between">
        <ol className="space-y-6 flex-grow">
          <li className="flex flex-row">
            <div className="font-semibold w-10">1.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="font-semibold w-10">2.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="font-semibold w-10">3.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
        </ol>
        <ol className="space-y-6 flex-grow">
          <li className="flex flex-row">
            <div className="font-semibold w-10">4.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="font-semibold w-10">5.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TopList;

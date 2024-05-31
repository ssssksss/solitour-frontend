import Link from "next/link";

type MyProps = {
  title: string;
};

const TopList = ({ title }: MyProps) => {
  return (
    <div className="-mt-16 flex h-72 w-[960px] flex-col justify-center rounded-2xl bg-white px-20 shadow-md">
      <div className="mb-9 border-b-2 border-neutral-200 pb-3 text-xl font-semibold">
        {title}
      </div>
      <div className="flex flex-row justify-between">
        <ol className="flex-grow space-y-6">
          <li className="flex flex-row">
            <div className="w-10 font-semibold">1.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="w-10 font-semibold">2.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="w-10 font-semibold">3.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
        </ol>
        <ol className="flex-grow space-y-6">
          <li className="flex flex-row">
            <div className="w-10 font-semibold">4.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
          <li className="flex flex-row">
            <div className="w-10 font-semibold">5.</div>
            <Link href="/">서촌 분위기 있는 혼술 카페 여기 있어!</Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TopList;

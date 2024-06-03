import Link from "next/link";

type MyProps = {
  title: string;
};

const TopList = ({ title }: MyProps) => {
  return (
    <div className="-mt-16 flex h-fit w-[960px] flex-col justify-center rounded-2xl bg-white px-20 py-8 shadow-md max-[1024px]:w-[90%]">
      <h2 className="mb-9 border-b-2 border-neutral-200 pb-3 text-xl font-semibold">
        {title}
      </h2>
      <div className="flex flex-row justify-between max-[1024px]:flex-col max-[1024px]:space-x-0 max-[1024px]:space-y-6">
        <ol className="w-[390px] space-y-6 max-[1024px]:w-full">
          <li className="flex flex-row">
            <p className="w-6 font-semibold">1.</p>
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어! 서촌 분위기 있는 혼술 카페
              여기 있어!
            </Link>
          </li>
          <li className="flex flex-row">
            <p className="w-6 font-semibold">2.</p>
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
          <li className="flex flex-row">
            <p className="w-6 font-semibold">3.</p>
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
        </ol>
        <ol className="w-[390px] space-y-6 max-[1024px]:w-full">
          <li className="flex flex-row">
            <p className="w-6 font-semibold">4.</p>
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
          <li className="flex flex-row">
            <p className="w-6 font-semibold">5.</p>
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              href="/"
            >
              서촌 분위기 있는 혼술 카페 여기 있어!
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TopList;

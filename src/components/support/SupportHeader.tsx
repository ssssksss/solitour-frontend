import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ISupportHeader {
  tabs: { name: string; value: string }[];
  active: string | null;
}

const SupportHeader = ({ tabs, active }: ISupportHeader) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string>(active || "");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    router.push(`/support?menu=${newValue}`);
  };

  return (
    <div className="mb-4 flex w-full flex-col items-center py-1">
      <article className="flex w-full flex-col justify-start">
        <h1 className="flex items-center justify-center py-8 text-3xl font-bold text-gray-800">
          {tabs.find((i) => i.value === `${active}`)?.name || "Default Title"}
        </h1>
        <div className="w-full min-[361px]:hidden">
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700"
          >
            {tabs.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>

        <ul className="grid w-full gap-2 rounded-[1rem] px-2 py-3 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] max-[900px]:grid-cols-3 max-[500px]:grid-cols-2 max-[360px]:hidden min-[900px]:grid-cols-6">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={`/support?menu=${tab.value}`}
              className={`flex w-full transform items-center justify-center rounded-md py-2 text-lg font-medium transition-transform duration-300 ease-in-out outline outline-[1px] outline-offset-[-1px] outline-[#e3e3e3b8] ${
                tab.value === `${active}`
                  ? "bg-main text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-main"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </ul>
      </article>
    </div>
  );
};

export default SupportHeader;

import Link from "next/link";

interface ISupportHeader {
  active: string | null;
}

const tabs = [
  { name: "서비스소개", value: "about" },
  { name: "공지사항", value: "notice" },
  { name: "FAQ", value: "faq" },
  // { name: "1:1 문의", value: "qna" },
  // { name: "1:1 문의", value: "contact" },
  { name: "이용약관", value: "terms" },
];

const SupportHeader = ({ active }: ISupportHeader) => {

  return (
    <div className="mb-4 flex w-full flex-col items-start py-1">
      <div className={"flex w-full flex-col items-start gap-y-4 pt-[2.375rem]"}>
        <h1 className={"w-full text-start text-[1.75rem] font-bold text-black"}>
          고객지원
        </h1>
        <p className={"text-gray1"}> 솔리투어 고객지원에서 도와드릴게요 </p>
      </div>
      <article className="flex justify-start gap-1 pt-12 max-w-full overflow-x-scroll scrollbar-hide">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/support?menu=${tab.value}`}
            className={`flex max-w-fit flex-shrink-0 transform items-center justify-center rounded-full px-6 py-3 text-lg font-medium outline-[1px] outline-offset-[-1px] outline-[#e3e3e3b8] transition-transform duration-300 ease-in-out ${
              tab.value === `${active}`
                ? "bg-main text-white outline-0"
                : "text-gray-700 outline hover:bg-gray-200 hover:text-main"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </article>
    </div>
  );
};

export default SupportHeader;

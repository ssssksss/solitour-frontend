import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Category {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  categories: Category[];
}

/**
 * 
 * @props 데이터 예시 
    const categories = [
      { label: "지원&안내", href: "/support" },
      { label: "QnA", href: "/support?menu=qna" },
      { label: "질문 등록하기", href: "" },
    ];
*/

const Breadcrumbs: FC<BreadcrumbsProps> = ({ categories }) => {
  return (
    <nav className="flex w-full items-center gap-[.25rem] py-10 text-xs text-gray2">
      <div className="text-gray1">
        <Link href={"/"}>
          <Image
            src={"/home-icon.svg"}
            alt={"home-icon-image"}
            width={12}
            height={12}
          />
        </Link>
      </div>
      {categories.map((i, index) => (
        <div key={index} className={"flex flex-row items-center gap-[.25rem]"}>
          <IoIosArrowForward />
          {categories.length == index + 1 ? (
            <span className="font-semibold text-gray1"> {i.label} </span>
          ) : (
            <Link href={i.href}> {i.label} </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

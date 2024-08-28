import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

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
    

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  categories,
}) => {
  return (
      <nav className="flex items-center gap-[.5rem] text-[0.75rem] text-gray2 mb-4">
        <div className="text-gray1">
          <Link href={"/"}>
            <Image
              src={"/home-icon.svg"}
              alt={"home-icon-image"}
              width={10}
              height={10}
            />
          </Link>
        </div>
        {
        categories.map((i,index) => 
            <div className={"flex gap-[.5rem]"}>
                <div> {">"} </div>
                {
              categories.length == index + 1 ? 
              <span className="text-black font-semibold"> {i.label} </span>
              :
              <Link href={i.href}> {i.label} </Link>
                }
            </div>
        )    
        }
      </nav>
  );
};

export default Breadcrumbs;

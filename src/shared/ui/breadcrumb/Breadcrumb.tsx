import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface BreadcrumbProps {
  categoryList: { label: string; href: string }[];
}

export const Breadcrumb = ({ categoryList: categories }: BreadcrumbProps) => {
  return (
    <nav className="text-gray2 flex w-full items-center gap-1 py-10 text-xs">
      <div className="text-gray1">
        <Link href="/">
          <Image
            src="/icons/home-gray-icon.svg"
            alt="home-gray-icon"
            width={12}
            height={12}
          />
        </Link>
      </div>
      {categories.map((i, index) => (
        <div key={index} className="flex flex-row items-center gap-1">
          <IoIosArrowForward />
          {categories.length == index + 1 ? (
            <span className="text-gray1 font-semibold">{i.label}</span>
          ) : (
            <Link href={i.href}> {i.label} </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

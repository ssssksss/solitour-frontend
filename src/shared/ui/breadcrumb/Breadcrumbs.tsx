import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface BreadcrumbsProps {
  categories: { label: string; href: string }[];
}

export const Breadcrumbs = ({ categories }: BreadcrumbsProps) => {
  return (
    <nav className="flex w-full items-center gap-[.25rem] py-10 text-xs text-gray2">
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
            <span className="font-semibold text-gray1">{i.label}</span>
          ) : (
            <Link href={i.href}> {i.label} </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

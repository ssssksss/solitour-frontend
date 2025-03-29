"use client";

import { useDragScroll } from "@/shared/lib/hooks";
import Link from "next/link";

interface ListWrapperProps {
  titles: string[];
  description: string;
  href: string;
  children: React.ReactNode;
}

export const ListWrapper = ({
  titles,
  description,
  href,
  children,
}: ListWrapperProps) => {
  const scrollHook = useDragScroll();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center justify-between max-[744px]:justify-center">
        <div className="flex flex-col gap-2 max-[744px]:w-full">
          <div className="flex flex-row items-center justify-between gap-1">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-bold text-black max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-0">
              <p>{titles[0]}</p>
              <p>
                <span className="text-main">{titles[1]}</span> {titles[2]}
              </p>
            </h2>
            <Link
              className="border-gray3 text-gray1 hover:border-main hover:bg-main hidden h-9.25 w-23.25 items-center justify-center rounded-full border hover:text-white max-[744px]:flex"
              href={href}
            >
              전체보기
            </Link>
          </div>
          <p className="text-gray1 text-sm font-medium">{description}</p>
        </div>
        <Link
          className="border-gray3 text-gray1 hover:border-main hover:bg-main flex h-9.25 w-23.25 items-center justify-center rounded-full border hover:text-white max-[744px]:hidden"
          href={href}
        >
          전체보기
        </Link>
      </div>
      <div
        className="overflow-x-auto"
        ref={scrollHook.listRef}
        onMouseDown={(e) => {
          e.preventDefault();
          scrollHook.onDragStart(e);
        }}
        onMouseMove={scrollHook.onDragMove}
        onMouseUp={scrollHook.onDragEnd}
        onMouseLeave={scrollHook.onDragEnd}
        onTouchStart={scrollHook.onTouchStart}
        onTouchMove={scrollHook.onTouchMove}
        onTouchEnd={scrollHook.onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

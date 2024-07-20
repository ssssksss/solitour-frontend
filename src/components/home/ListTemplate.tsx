import { useDragScrollType } from "@/hooks/useDragScroll";
import Link from "next/link";

interface Props {
  titles: string[];
  description: string;
  scrollHook: useDragScrollType;
  children: React.ReactNode;
}

const ListTemplate = ({ titles, description, scrollHook, children }: Props) => {
  return (
    <div className="flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center justify-between max-[744px]:justify-center">
        <div className="flex flex-col gap-2 max-[744px]:w-full">
          <div className="flex flex-row items-center justify-between gap-1">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-bold text-black max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-0 dark:text-slate-200">
              <p>{titles[0]}</p>
              <p>
                <span className="text-main">{titles[1]}</span> {titles[2]}
              </p>
            </h2>
            <Link
              className="hidden h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:flex dark:border-slate-400 dark:bg-slate-800 dark:text-slate-400"
              href="/informations/list/parent-category/1?page=1"
            >
              전체보기
            </Link>
          </div>
          <p className="text-sm font-medium text-gray1 dark:text-slate-400">
            {description}
          </p>
        </div>
        <Link
          className="flex h-[2.3125rem] w-[5.8125rem] items-center justify-center rounded-full border-[0.0625rem] border-gray3 text-gray1 hover:border-main hover:bg-main hover:text-white max-[744px]:hidden dark:border-slate-400 dark:bg-slate-800 dark:text-slate-400"
          href="/informations/list/parent-category/1?page=1"
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

export default ListTemplate;

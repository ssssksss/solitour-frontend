"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { HeaderSidebar } from "./HeaderSidebar";
import { useHeader } from "../model/useHeader";
import { UserDropDown } from "./UserDropDown";
import { useUserStore } from "@/entities/user";

export const Header = () => {
  const { id } = useUserStore();
  const {
    pathname,
    visible,
    isTransparent,
    handleMenuClick,
    handleCloseButton,
  } = useHeader();

  return (
    <header className="w-full">
      <HeaderSidebar visible={visible} onClose={handleCloseButton} />
      <div
        className={[
          isTransparent ? "bg-white/30 backdrop-blur-md" : "bg-white",
          "fixed top-0 z-40 flex w-full justify-center shadow",
        ].join(" ")}
      >
        <div className="flex h-20 w-360 flex-row items-center justify-between px-6">
          <Link
            className="relative h-8 w-27.75 font-black max-[1024px]:ml-7.5 max-[744px]:ml-0"
            href="/"
          >
            <Image
              className="object-contain"
              src="/logos/solitour-logo.svg"
              alt="solitour-logo"
              fill={true}
            />
          </Link>
          <div className="flex h-full flex-grow flex-row justify-between pl-22.5 max-[1024px]:pl-13.5 max-[744px]:hidden">
            <nav>
              <ul className="flex h-full items-center">
                <li>
                  <Link
                    className={[
                      pathname === "/" ? "font-bold" : "font-medium",
                      "hover:text-main flex h-full w-full items-center justify-center px-5 text-sm text-black max-[1024px]:px-3",
                    ].join(" ")}
                    href="/"
                  >
                    홈
                  </Link>
                </li>
                {[
                  {
                    name: "정보",
                    href: "/informations/list?page=1&parentCategoryId=1",
                    path: "/informations",
                  },
                  { name: "모임", href: "/gathering", path: "/gathering" },
                  {
                    name: "여행일기",
                    href: "/diary/list?page=1",
                    path: "/diary",
                    prefetch: id > 0,
                  },
                  {
                    name: "고객지원",
                    href: "/support?menu=about",
                    path: "/support",
                    prefetch: id > 0,
                  },
                ].map(({ name, href, path, prefetch }) => (
                  <li key={href}>
                    <Link
                      className={[
                        pathname.includes(path) ? "font-bold" : "font-medium",
                        "hover:text-main flex h-full w-full items-center justify-center px-5 text-sm text-black max-[1024px]:px-3",
                      ].join(" ")}
                      href={href}
                      prefetch={prefetch}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <MdOutlineMenu
            className="hover:text-main absolute left-[calc(100vw-24px)] hidden -translate-x-full cursor-pointer max-[744px]:flex"
            size="1.5rem"
            onClick={handleMenuClick}
          />
          <div className="absolute left-[calc(100vw-24px)] flex h-9 w-32 -translate-x-full items-center gap-2 rounded-lg p-2 text-sm max-[744px]:hidden">
            {id === 0 ? (
              <>
                <div className="animate-pulse-auth relative aspect-square w-7.5 rounded-[50%] shadow" />
                <div className="animate-pulse-auth h-7.5 w-16" />
              </>
            ) : id > 0 ? (
              <UserDropDown />
            ) : (
              <Link
                className="hover:text-main ml-10 font-semibold text-black"
                href="/auth/signin"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </header>
  );
};

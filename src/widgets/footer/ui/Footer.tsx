import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="mt-auto flex h-fit w-full items-center justify-center bg-neutral-100 px-4">
      <div className="flex w-240 flex-col gap-4 px-4 py-8">
        <Link href="/">
          <Image
            src="/logos/solitour-logo.svg"
            alt="solitour-logo"
            width={92}
            height={32}
          />
        </Link>
        <div className="text-gray1 text-sm font-medium">
          <p>솔리투어는 혼자 여행에 유용한 정보와 모임을 제공합니다.</p>
          <p>
            일상 속의 휴식이 필요한 사람, 나를 위한 시간이 필요한 사람, 새로운
            여정을 위한 모든 사람
          </p>
          <p>솔리투어에서 새로운 나를 찾아보세요.</p>
        </div>
        <a
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:scale-105"
          href="https://github.com/TripInfoWeb/solitour-frontend"
          target="_blank"
        >
          <FaGithub />
        </a>
        <div className="text-gray1 flex flex-row items-center justify-between pt-8 max-[744px]:flex-col-reverse max-[744px]:gap-4">
          <p className="text-xs font-medium">
            Copyright Solitour. All rights reserved
          </p>
          <nav>
            <ul className="flex flex-row items-center gap-9 text-sm font-medium">
              <li>
                <Link
                  className="hover:text-main"
                  href="/support?menu=terms#terms-of-service"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-main"
                  href="/support?menu=terms#privacy-policy"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link className="hover:text-main" href="/support?menu=about">
                  서비스 소개
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

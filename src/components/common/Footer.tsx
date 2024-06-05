import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex h-80 w-full flex-row items-center justify-center bg-neutral-100 max-[768px]:h-[350px]">
      <div className="flex w-[960px] flex-col space-y-4 p-4">
        <div className="relative h-8 w-[92px]">
          <Image
            src={"/Solitour-logo.svg"}
            alt={"/background"}
            fill={true}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="max-[600px] text-sm font-medium text-neutral-500">
          <p>솔리투어는 혼자여행에 유용한 정보와 모임을 제공합니다.</p>
          <p>
            일상 속의 휴식이 필요한 사람, 나를 위한 시간이 필요한 사람, 새로운
            여정을 위한 모든 사람
          </p>
          <p>솔리투어에서 새로운 나를 찾아 보세요.</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button className="h-[42px] w-[120px] rounded-3xl bg-neutral-950 text-sm font-medium text-white hover:scale-105">
            시작하기
          </button>
          <div className="flex w-fit flex-row items-center space-x-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 hover:scale-105">
              <RiKakaoTalkFill size={"1.5rem"} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 hover:scale-105">
              <FcGoogle size={"1.5rem"} />
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-8 max-[768px]:flex-col max-[768px]:space-y-4">
          <p className="text-xs font-medium text-neutral-500">
            Copyright Solitour. All rights reserved
          </p>
          <nav>
            <ul className="flex flex-row items-center space-x-8 text-sm font-semibold text-neutral-500">
              <li>
                <Link className="hover:text-main" href="/terms">
                  이용약관
                </Link>
              </li>
              <li>
                <Link className="hover:text-main" href="/privacy">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link className="hover:text-main" href="/about">
                  서비스소개
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;

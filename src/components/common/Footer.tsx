import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex h-80 w-full flex-row items-center justify-center bg-neutral-100">
      <div className="flex w-[960px] flex-col space-y-4 p-4">
        <h2 className="text-2xl font-semibold">Solitour</h2>
        <div className="text-sm font-medium text-neutral-500">
          <p>00에서 다양한 모임을 만들어보세요!00에서 다00에서</p>
          <p>
            00에서 다양한 모임을 만들어보세요!00에서 다양한 모임을 만들어보세요!
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <button className="w-fit rounded-3xl bg-neutral-500 px-6 py-3 text-sm font-medium text-white">
            회원가입 하기
          </button>
          <div className="flex w-fit flex-row items-center space-x-4">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
              <RiKakaoTalkFill size={"1.5rem"} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
              <FcGoogle size={"1.5rem"} />
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-8 max-[768px]:flex-col max-[768px]:space-y-4">
          <p className="text-xs font-medium text-neutral-500">
            copyright#@solitour fjnkndkjnald
          </p>
          <nav>
            <ul className="flex flex-row items-center space-x-8 text-sm font-semibold text-neutral-500">
              <li>
                <Link href="/terms">이용약관</Link>
              </li>
              <li>
                <Link href="/privacy">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/about">서비스소개</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;

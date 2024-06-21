import Link from "next/link";
import { FaHotel, FaList, FaUserPlus } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoHome, IoPeople, IoRestaurant } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import Image from "next/image";

type MyProps = {
  onClose: () => void;
};

// TODO
const HeaderSidebar = ({ onClose }: MyProps) => {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-[200%] animate-sidebar">
      <div className="bg-black/25">
        <nav className="h-full w-[18.75rem] rounded-r-2xl bg-white p-4">
          <div className="flex h-10 w-full items-center justify-between">
            <Link
              className="relative h-[2.375rem] w-[5rem]"
              href="/"
              onClick={onClose}
            >
              <Image
                src={"/Solitour-logo.svg"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
            <div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:text-main">
              <MdClose onClick={onClose} />
            </div>
          </div>
          <ul>
            <li className="border-b-2 px-1 py-4">
              <Link
                className="flex flex-row items-center space-x-2 text-xl hover:bg-gray-100"
                href="/"
                onClick={onClose}
              >
                <IoHome />
                <p>홈</p>
              </Link>
              <div className="flex flex-col space-y-2 pl-4 pt-4">
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/auth/signin"
                  onClick={onClose}
                >
                  <RiLoginBoxLine />
                  <p>로그인</p>
                </Link>
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/auth/signup"
                  onClick={onClose}
                >
                  <FaUserPlus />
                  <p>회원가입</p>
                </Link>
              </div>
            </li>
            <li className="border-b-2 px-1 py-4">
              <Link
                className="flex flex-row items-center space-x-2 text-xl hover:bg-gray-100"
                href="/informations/restaurant?subCategory=all"
                onClick={onClose}
              >
                <IoMdInformationCircleOutline />
                <p>정보</p>
              </Link>
              <div className="flex flex-col space-y-2 pl-4 pt-4">
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/informations/restaurant?subCategory=all"
                  onClick={onClose}
                >
                  <IoRestaurant />
                  <p>맛집</p>
                </Link>
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/informations/accommondation?subCategory=all"
                  onClick={onClose}
                >
                  <FaHotel />
                  <p>숙박</p>
                </Link>
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/informations/activity?tag=all"
                  onClick={onClose}
                >
                  <FiActivity />
                  <p>액티비티</p>
                </Link>
              </div>
            </li>
            <li className="border-b-2 px-1 py-4">
              <Link
                className="flex flex-row items-center space-x-2 text-xl hover:bg-gray-100"
                href="/meetings"
                onClick={onClose}
              >
                <IoPeople />
                <p>모임</p>
              </Link>
              <div className="flex flex-col space-y-2 pl-4 pt-4">
                <Link
                  className="flex flex-row items-center space-x-2 text-sm hover:bg-gray-100"
                  href="/"
                  onClick={onClose}
                >
                  <FaList />
                  <p>모임 목록</p>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="h-full w-full bg-black/25" onClick={onClose} />
    </aside>
  );
};

export default HeaderSidebar;

import Image from "next/image";

interface MyPageLinkedAccountProps {
  provider: string;
  createdDate: string;
}

export const MyPageLinkedAccount = ({
  provider,
  createdDate,
}: MyPageLinkedAccountProps) => {
  return (
    <section>
      <div className="grid h-10 w-full grid-cols-[6rem_auto] gap-x-[1.75rem]">
        <div className="flex items-center text-lg font-semibold">
          연동된 계정
        </div>
        <div className="flex items-center justify-between">
          <span>{provider}</span>
          <div className="flex items-center gap-x-[.875rem]">
            <span className="text-gray1 font-medium">{createdDate}</span>
            {provider === "kakao" && (
              <div className="relative flex h-10 w-10 items-center justify-center rounded-[50%] bg-[#FEE501] p-4">
                <Image
                  className="absolute translate-x-px"
                  src="/icons/kakao-icon.svg"
                  alt="kakao-icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

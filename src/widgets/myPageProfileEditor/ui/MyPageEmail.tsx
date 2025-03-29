interface MyPageEmailProps {
  email: string;
}

export const MyPageEmail = ({ email }: MyPageEmailProps) => {
  return (
    <section>
      <div className="flex w-full items-center gap-x-9.5">
        <div className="relative w-14 shrink-0">
          <span className="text-lg font-semibold">이메일</span>
        </div>
        <input
          className="h-13 w-full rounded-[28px] bg-gray-100 pl-8 outline -outline-offset-1 outline-[#E3E3E3]"
          placeholder="이메일을 입력해주세요"
          disabled={true}
          defaultValue={email}
        />
      </div>
    </section>
  );
};

"use client";

import { NICKNAME_MAX_LENGTH } from "../config/nicknameMaxLength";
import { useMyPageNicknameEditor } from "../model/useMyPageNicknameEditor";

interface MyPageNicknameEditorProps {
  initialNickname: string;
}

export const MyPageNicknameEditor = ({
  initialNickname,
}: MyPageNicknameEditorProps) => {
  const {
    nickname,
    defaultNickname,
    message,
    loading,
    handleNicknameChange,
    handleSubmit,
  } = useMyPageNicknameEditor(initialNickname);

  return (
    <section>
      <div className="flex w-full items-center gap-x-[2.375rem]">
        <div className="relative w-14 shrink-0">
          <span className="text-lg font-semibold">닉네임</span>
          <span className="text-main absolute -top-2 text-lg">*</span>
        </div>
        <label className="group relative w-full">
          <input
            className="flex h-[3.25rem] w-full rounded-[28px] pr-20 pl-8 outline -outline-offset-1 outline-[#E3E3E3]"
            type="text"
            autoComplete="search"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            minLength={1}
            maxLength={NICKNAME_MAX_LENGTH}
            defaultValue={initialNickname}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                handleSubmit();
              }
            }}
            onChange={(e) => handleNicknameChange(e.target.value)}
          />
          <button
            className={[
              `${nickname === defaultNickname ? "bg-gray-400" : "bg-main cursor-pointer hover:scale-105"}`,
              "absolute top-1/2 right-2 h-[2.4rem] -translate-y-1/2 rounded-[28px] px-3 text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100",
            ].join(" ")}
            type="button"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "변경 중..." : "변경"}
          </button>
        </label>
      </div>
      <div
        className={[
          message ? "justify-between" : "justify-end",
          "text-gray1 flex w-full pt-3 pl-[7.75rem] text-sm",
        ].join(" ")}
      >
        {message !== "" && (
          <span
            className={message === "성공" ? "text-blue-400" : "text-[#FF0000]"}
          >
            {`닉네임 변경에 ${message}했습니다.`}
          </span>
        )}
        <span>
          {nickname.length}/{NICKNAME_MAX_LENGTH}
        </span>
      </div>
    </section>
  );
};

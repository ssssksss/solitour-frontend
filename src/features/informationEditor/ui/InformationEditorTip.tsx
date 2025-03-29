"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

export const InformationEditorTip = () => {
  const formContext = useFormContext();
  const inputTipRef = useRef<HTMLInputElement>(null);

  const handleTipChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tip = inputTipRef.current?.value.trim() ?? "";
      if (tip === "") {
        return;
      }

      const tips = formContext.getValues("tips");
      tips.push(tip);
      formContext.setValue("tips", tips);
      formContext.trigger("tips");
      (inputTipRef.current as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
      <h2 className="w-36 pt-3 text-lg font-bold text-black">
        생생한 혼플 TIP<span className="text-main">*</span>
      </h2>
      <div className="relative flex grow flex-col gap-4 max-[744px]:w-full">
        {formContext.getValues("tips").map((tip: string, index: number) => (
          <div key={index} className="relative w-full">
            <div className="flex h-13.25 w-full items-center rounded-3xl border bg-gray-100/25 pr-14 pl-5 text-sm outline-hidden">
              {tip}
            </div>
            <MdClose
              className="text-main absolute top-2.5 right-3.5 cursor-pointer rounded-full bg-gray-100 p-2 hover:scale-110"
              size="2rem"
              onClick={() => {
                const tips: string[] = formContext.getValues("tips");
                const filteredTips = tips.filter((_, idx) => idx !== index);
                formContext.setValue("tips", filteredTips);
                formContext.trigger("tips");
              }}
            />
          </div>
        ))}
        {formContext.getValues("tips").length < 5 && (
          <div className="relative w-full">
            <input
              className={[
                formContext.formState.errors.tips
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray3 hover:border-main focus:border-main",
                "h-13.25 w-full rounded-3xl border pr-14 pl-5 text-sm outline-hidden",
              ].join(" ")}
              type="text"
              placeholder="나만의 혼플 팁을 알려주세요."
              onKeyUp={handleTipChange}
              onKeyDown={(e) => {
                if (e.key === ";") {
                  e.preventDefault();
                  e.persist();
                }
              }}
              ref={inputTipRef}
            />
            <FaCheck
              className="text-main absolute top-2.5 right-3.5 cursor-pointer rounded-full bg-gray-100 p-2 hover:scale-110"
              size="2rem"
              onClick={() => {
                if (
                  inputTipRef.current !== null &&
                  inputTipRef.current.value.trim() !== ""
                ) {
                  const tips: string[] = formContext.getValues("tips");
                  const tip = inputTipRef.current.value;
                  tips.push(tip);
                  formContext.setValue("tips", tips);
                  formContext.trigger("tips");
                  inputTipRef.current.value = "";
                }
              }}
            />
          </div>
        )}
        {formContext.formState.errors.tips && (
          <p className="absolute -bottom-6 left-4 text-xs font-medium text-red-500">
            최소 하나의 Tip을 입력해 주세요.
          </p>
        )}
      </div>
    </div>
  );
};

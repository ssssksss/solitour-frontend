"use client";

import { AddUserInformationFormSchema } from "@/lib/zod/schema/AddUserInformationFormSchema";
import useAuthStore from "@/store/authStore";
import useToastifyStore from "@/store/toastifyStore";
import { IModalComponent } from "@/types/ModalState";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ModalTemplate from "../common/modal/ModalTemplate";


const AddUserInformationForm = (props: IModalComponent) => {
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();

  const { formState, register, setValue, getValues, trigger } = useForm({
    resolver: zodResolver(AddUserInformationFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      sex: "",
      termConditionAgreement: true,
      privacyPolicyAgreement: true,
    },
  });

  // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    setValue("age", Number(value));
    trigger();
  };

  const addUserInformationSubmit = async () => {
    const response = await fetchWithAuth("/api/auth/user/info/agree", {
      method: "PUT",
      body: JSON.stringify({
        sex: getValues("sex"),
        name: getValues("name"),
        age: getValues("age"),
        termConditionAgreement: true,
        privacyPolicyAgreement: true,
      }),
    });

    if (response.status == 204) {
      toastifyStore.setToastify({
        type: "success",
        message: "제출 완료",
      });
      authStore.setUser({
        sex: getValues("sex"),
        age: getValues("age"),
      });
      props.closeModal!();
    }
  };

  return (
    <ModalTemplate className="max-w-[31.25rem] px-[3.5rem]">
      {props.closeButtonComponent}
      <h2 className="text-[1.625rem] font-bold text-black">
        안녕하세요 솔리투어입니다
      </h2>
      <p className="mt-[0.625rem] max-w-[15.875rem] text-center text-gray1">
        신뢰할 수 있는 이용 환경을 위해 필요한 정보를 입력해 주세요
      </p>
      <div className="mt-[1.25rem] flex w-full flex-col gap-y-[2.375rem] rounded-[1.125rem] px-[2.25rem] pb-[1.875rem] pt-[1.5rem] bg-[#F7F7F7]">
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 이름 </h3>
          <input
            type={"text"}
            className="mt-3 h-10 w-full rounded-[1.5rem] px-3 text-center text-main focus:outline-main outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#f0f0f0]"
            placeholder="이름을 입력해주세요"
            maxLength={10}
            {...register("name")}
          />
        </article>
        <article className="flex flex-col">
          <h3 className="text-[1.125rem] font-bold text-black"> 성별 </h3>
          <div className={"mt-3 flex h-10 w-full gap-x-3"}>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${getValues("sex") == "male" ? "bg-[#F2FAF7] font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => {
                setValue("sex", "male");
                trigger();
              }}
            >
              남성
            </button>
            <button
              className={`h-full w-full rounded-[1.5rem] outline outline-[0.0625rem] outline-offset-[-0.0625rem] ${getValues("sex") == "female" ? "bg-[#F2FAF7] font-bold text-main outline-main" : "bg-white text-gray2 outline-[#f0f0f0]"}`}
              onClick={() => {
                setValue("sex", "female");
                trigger();
              }}
            >
              여성
            </button>
          </div>
        </article>
        <article className="flex flex-col">
          <h3 className="flex items-center gap-x-2 text-[1.125rem] font-bold text-black">
            연도(나이)
            <span className="flex items-center text-gray2">
              {new Date().getFullYear() - 58} ~ {new Date().getFullYear() - 19}
            </span>
          </h3>
          <input
            type="text"
            name="year"
            onChange={handleInputChange}
            placeholder="YYYY"
            maxLength={4}
            className="w-full bg-transparent text-center outline-none focus:outline-main mt-3 flex h-10 items-center justify-center rounded-[1.5rem] bg-white py-[0.375rem] text-main outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#F0F0F0]"
          />
        </article>
      </div>
      <p className="mt-[0.875rem] max-w-[18.125rem] text-center text-sm text-gray1">
        정보를 입력하지 않아도 서비스를 이용할 수 있으나 일부 서비스 이용이
        제한될 수 있습니다
      </p>
      <button
        onClick={() => addUserInformationSubmit()}
        className={`mt-5 min-h-[4rem] w-full rounded-[1.875rem] text-white ${formState.isValid ? "bg-main" : "bg-gray2"}`}
        disabled={!formState.isValid}
      >
        입력 완료
      </button>
    </ModalTemplate>
  );
};
export default AddUserInformationForm;

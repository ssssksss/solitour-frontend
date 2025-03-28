import { useUserStore } from "@/entities/user";
import { useToastifyStore } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddUserInformationFormSchema } from "./AddUserInformationFormSchema";
import { agree, AgreeRequestData } from "../api/userPersonalInfo";

export const useAddUserInformationForm = (closeModal: () => void) => {
  const userStore = useUserStore();
  const { setToastifyState } = useToastifyStore();
  const methods = useForm<{
    name: string;
    age: number;
    sex: "male" | "female" | null;
    termConditionAgreement: boolean;
    privacyPolicyAgreement: boolean;
  }>({
    resolver: zodResolver(AddUserInformationFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      sex: null,
      termConditionAgreement: true,
      privacyPolicyAgreement: true,
    },
  });

  // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    methods.setValue("age", Number(value));
    methods.trigger();
  };

  const handleSubmit = async () => {
    try {
      const requestData: AgreeRequestData = {
        name: methods.getValues("name"),
        age: methods.getValues("age"),
        sex: methods.getValues("sex")!,
        termConditionAgreement: true,
        privacyPolicyAgreement: true,
      };

      await agree(requestData);

      setToastifyState({
        type: "success",
        message: "제출 완료",
      });
      userStore.setUserState({
        sex: methods.getValues("sex"),
        age: methods.getValues("age"),
      });
      closeModal();
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.",
      });
    }
  };

  return { methods, handleInputChange, handleSubmit };
};

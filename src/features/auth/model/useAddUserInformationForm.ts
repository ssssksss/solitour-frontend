import { AddUserInformationFormSchema, useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useToastifyStore } from "@/shared/model/toastifyStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAddUserInformationForm = (closeModal?: () => void) => {
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();
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
    const response = await fetchWithAuth("/api/auth/user/info/agree", {
      method: "PUT",
      body: JSON.stringify({
        sex: methods.getValues("sex"),
        name: methods.getValues("name"),
        age: methods.getValues("age"),
        termConditionAgreement: true,
        privacyPolicyAgreement: true,
      }),
    });

    if (response.status == 204) {
      toastifyStore.setToastifyState({
        type: "success",
        message: "제출 완료",
      });
      userStore.setUserState({
        sex: methods.getValues("sex"),
        age: methods.getValues("age"),
      });
      closeModal!();
    }
  };

  return { methods, handleInputChange, handleSubmit };
};

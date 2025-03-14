import { AddUserInformationFormSchema } from "@/entities/user/model/AddUserInformationFormSchema";
import useAuthStore from "@/stores/authStore";
import useToastifyStore from "@/stores/toastifyStore";
import { IModalComponent } from "@/types/ModalState";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAddUserInformationForm = (props: IModalComponent) => {
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();
  const methods = useForm({
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
      toastifyStore.setToastify({
        type: "success",
        message: "제출 완료",
      });
      authStore.setUser({
        sex: methods.getValues("sex"),
        age: methods.getValues("age"),
      });
      props.closeModal!();
    }
  };

  return { methods, handleInputChange, handleSubmit };
};

"use client";

import { getUserInfo, signIn, useUserStore } from "@/entities/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddUserInformationFormSchema } from "./AddUserInformationFormSchema";
import {
  agree,
  AgreeRequestData,
  disagree,
  DisagreeRequestData,
} from "../api/userPersonalInfo";

export const useAuthKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserState } = useUserStore();
  const [loading, setLoading] = useState(true);
  const methods = useForm({
    resolver: zodResolver(AddUserInformationFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      sex: "",
      isCheckTerm: false,
      isCheckPrivacy: false,
    },
    mode: "onChange",
  });

  const handleSubmit = async (isAgree: boolean) => {
    try {
      setLoading(true);

      if (isAgree) {
        const requestData: AgreeRequestData = {
          name: methods.getValues("name"),
          age: methods.getValues("age"),
          sex: methods.getValues("sex"),
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        };
        await agree(requestData);
      } else {
        const requestData: DisagreeRequestData = {
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        };
        await disagree(requestData);
      }

      const userInfo = await getUserInfo();
      setUserState(userInfo);
      router.push("/");
      router.refresh();
    } catch (error) {
      router.push("/auth/signin");
    }
  };

  const handleHomeButtonClick = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    methods.setValue("age", Number(value));
    methods.trigger();
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await signIn(searchParams.get("code")!);

        if (data === "PENDING") {
          setLoading(false);
          return;
        }

        const userInfo = await getUserInfo();
        setUserState(userInfo);
        router.push("/");
        router.refresh();
      } catch (error) {
        router.push("/auth/signin");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    methods,
    handleSubmit,
    handleInputChange,
    handleHomeButtonClick,
  };
};

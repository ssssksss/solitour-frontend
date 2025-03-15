"use client";

import {
  AddUserInformationFormSchema,
  getUserInfo,
  signIn,
  useUserStore,
} from "@/entities/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useAuthKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
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
    setLoading(true);

    /* eslint-disable indent */
    const requestData = isAgree
      ? {
          name: methods.getValues("name"),
          age: methods.getValues("age"),
          sex: methods.getValues("sex"),
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        }
      : {
          termConditionAgreement: methods.getValues("isCheckTerm"),
          privacyPolicyAgreement: methods.getValues("isCheckPrivacy"),
        };
    /* eslint-enable indent */

    try {
      const response = await fetch(
        isAgree ? "/api/auth/user/info/agree" : "/api/auth/user/info/disagree",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      // TODO
      const userDataResponse = await fetch("/api/auth/user");
      if (userDataResponse.status == 200) {
        const userData = await userDataResponse.json();
        setUser(userData);
        router.push("/");
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      router.push("/auth/signin");
    }
  };

  const handleHomeButtonClick = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
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
        setUser(userInfo);
        router.push("/");
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

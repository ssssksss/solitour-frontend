"use client";

import AddUserInformationInitForm from "@/components/auth/AddUserInformationInitForm";
import AuthLoading from "@/components/auth/AuthLoading";
import { AddUserInformationFormSchema } from "@/lib/zod/schema/AddUserInformationFormSchema";
import useAuthStore from "@/store/authStore";
import useToastifyStore from "@/store/toastifyStore";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AuthKaKaoContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
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
  });

  const handleSubmit = async (isAgree: boolean) => {
    setLoading(true);
      
    const requestData = isAgree ? {
      name: methods.getValues("name"),
      age: methods.getValues("age"),
      sex: methods.getValues("sex"),
      termConditionAgreement: methods.getValues("isCheckTerm"),
      privacyPolicyAgreement: methods.getValues("isCheckPrivacy")
    } : {
      termConditionAgreement: methods.getValues("isCheckTerm"),
      privacyPolicyAgreement: methods.getValues("isCheckPrivacy")
    };

    try {
      const response = await fetch(
        isAgree ? "/api/auth/user/info/agree" : "/api/auth/user/info/disagree",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(requestData)
        },
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      // 액세스 토큰을 이용해서 사용자 정보 조회
      const userDataResponse = await fetch("/api/auth/user");
      if (userDataResponse.status == 200) {
        const userData = await userDataResponse.json();
        authStore.setUser(userData);
        router.push("/");
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      router.push("/auth/signin");
    }
  };

  const handleHomeButtonClick = async () => {
    await fetch("/api/auth/logout", {method: "POST"});
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
    const _queryStringObject = UrlQueryStringToObject<{
      [key: string]: string;
    }>(window.location.href);
    const kakaoInitLogin = async () => {
      try {
        const response = await fetch(
          `/api/auth/kakao/getToken?code=${_queryStringObject?.code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            credentials: "include",
          },
        );
        
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const data = await response.json();
        if (data == "PENDING") {
          setLoading(false);
          return;
        }

        // 액세스 토큰을 이용해서 사용자 정보 조회
        const userDataResponse = await fetch("/api/auth/user");
        if (userDataResponse.status == 200) {
          const userData = await userDataResponse.json();
          authStore.setUser(userData);
          router.push("/");
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("로그인 실패", error);
        router.push("/auth/signin");
      }
    };

    kakaoInitLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        loading ? <AuthLoading /> :
          <FormProvider {...methods}>
            <AddUserInformationInitForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              handleHomeButtonClick={handleHomeButtonClick}
            />
          </FormProvider>
      }
    </>
  );
};

export default AuthKaKaoContainer;

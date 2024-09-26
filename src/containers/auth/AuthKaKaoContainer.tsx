"use client";

import AddUserInformationInitForm from "@/components/auth/AddUserInformationInitForm";
import AuthLoading from "@/components/auth/AuthLoading";
import { AddUserInformationFormSchema } from "@/lib/zod/schema/AddUserInformationFormSchema";
import useAuthStore from "@/store/authStore";
import useToastifyStore from "@/store/toastifyStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AuthKaKaoContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();
  const [loading, setLoading] = useState(false);

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

    const kakaoLogin = async () => {
    setLoading(true);
      try {
        const url = new URL(window.location.href);
        const response = await fetch(
          `/api/auth/kakao/getToken?code=${url.searchParams.get("code")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            credentials: "include",
          },
        );

        if (response.status !== 200) {
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
  
  const addUserInformationSubmit = async () => {
          setLoading(true);
    try {
        const url = new URL(window.location.href);
      const response = await fetch(
        `/api/auth/kakao/getToken?code=${url.searchParams.get("code")}`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          credentials: "include",
      body: JSON.stringify({
        sex: methods.getValues("sex"),
        name: methods.getValues("name"),
        age: methods.getValues("age"),
      })
    })

    if (response.ok) {
      toastifyStore.setToastify({
        type: "success",
        message: "등록 성공"
      })
      authStore.setUser({
        sex: methods.getValues("sex"),
        age: methods.getValues("age"),
      });
      }
      
        if (response.status !== 200) {
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
  }

    // 숫자만 입력되게 필터링
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    methods.setValue("age", Number(value));
    methods.trigger();
  };

  return (
    <>
      {
        loading ? <AuthLoading /> :
        <FormProvider {...methods}>
          <AddUserInformationInitForm
              kakaoLogin={kakaoLogin}
              addUserInformationSubmit={addUserInformationSubmit}
              handleInputChange={handleInputChange}
            />
        </FormProvider>
      }
    </>
  )
};

export default AuthKaKaoContainer;

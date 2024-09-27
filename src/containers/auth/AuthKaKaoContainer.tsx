"use client";

import AuthLoading from "@/components/auth/AuthLoading";
import useAuthStore from "@/store/authStore";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthKaKaoContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  useEffect(() => {
    const _queryStringObject = UrlQueryStringToObject<{
      [key: string]: string;
    }>(window.location.href);
    const kakaoLogin = async () => {
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

    kakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthLoading />;
};

export default AuthKaKaoContainer;

"use client";

import AuthLoading from "@/components/auth/AuthLoading";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

const AuthNaverContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const url = new URL(window.location.href);
  const naverLogin = async () => {
    try {
      const response = await fetch(
        `/api/auth/naver/getToken?code=${url.searchParams.get("code")}`,
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

  naverLogin();

  return <AuthLoading />;
};

export default AuthNaverContainer;

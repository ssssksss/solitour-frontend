//import { cookies } from "next/headers";

/*
import { UserBody } from "@/constants/User";

// 회원가입
export const register = ({ username, password }: UserBody) => {
  return fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
    cache: "no-store",
  });
};

// 로그인
export const login = ({ username, password }: UserBody) => {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
    cache: "no-store",
  });
};
*/

/*
// 로그인 상태 확인
export const check = () => {
  const cookie = cookies().get("access_token");

  return fetch(`${process.env.API_BASE_URL}/api/auth/check`, {
    method: "GET",
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
    cache: "no-store",
  });
};
*/

/*
// 로그아웃
export const logout = () => {
  return fetch("/api/auth/logout", {
    method: "POST",
    cache: "no-store",
  });
};
*/

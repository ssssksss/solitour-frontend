/*
"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { changeField, initializeForm, login } from "@/store/modules/auth";
import { check } from "@/store/modules/user";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const username = useAppSelector((state) => state.auth.login.username);
  const password = useAppSelector((state) => state.auth.login.password);
  const auth = useAppSelector((state) => state.auth.auth);
  const authError = useAppSelector((state) => state.auth.authError);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(
        changeField({
          form: "login",
          key: name,
          value: value,
        })
      );
      setError(null);
    },
    [dispatch]
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 하나라도 비어있는 경우
    if (username === "" || password === "") {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }

    dispatch(login({ username: username, password: password }));
  };

  // 로그인 화면에서 벗어날 경우 form을 초기화함.
  useEffect(() => {
    return () => {
      dispatch(initializeForm("login"));
    };
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError("로그인 실패");
      return;
    } else {
      setError(null);
    }

    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user.username) {
      router.replace("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [router, user]);

  return (
    <AuthForm
      type="login"
      form={{
        username: username,
        password: password,
      }}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
*/

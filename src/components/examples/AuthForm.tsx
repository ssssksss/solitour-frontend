/*
import "@/styles/AuthForm.scss";
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";

type MyProps = {
  type: string;
  form: { username: string; password: string; passwordConfirm?: string };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string | null;
};


// 회원가입 또는 로그인 폼
const AuthForm = ({ type, form, onChange, onSubmit, error }: MyProps) => {
  const text = type === "register" ? "회원가입" : "로그인";

  return (
    <div className="AuthForm">
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <input
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <input
            type="password"
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <div className="errorMessage">{error}</div>}
        <button>{text}</button>
      </form>
      <footer>
        {type === "login" ? (
          <Link href="/register">회원가입</Link>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </footer>
    </div>
  );
};

export default AuthForm;
*/

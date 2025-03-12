import AuthLoading from "@/components/auth/AuthLoading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <AuthLoading />
    </Suspense>
  );
}

import AuthLoading from "@/features/auth/ui/AuthLoading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <AuthLoading />
    </Suspense>
  );
}

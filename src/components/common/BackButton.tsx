import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type MyProps = {
  router: AppRouterInstance;
};

const BackButton = ({ router }: MyProps) => {
  return (
    <button
      className="h-[2.625rem] w-[9.4375rem] rounded-full bg-main text-white hover:scale-105"
      type="button"
      onClick={() => router.back()}
    >
      이전 페이지로
    </button>
  );
};

export default BackButton;

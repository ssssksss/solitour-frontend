"use client";

import LottieAirplane from "@/../public/lottie/loading-airplane.json";
import LottieComponent from "@/components/common/lottie/LottieComponent";
import AddUserInformationInitForm from "./AddUserInformationInitForm";
import { useAuthKakao } from "@/hooks/auth/useAuthKakao";
import { FormProvider } from "react-hook-form";

const AuthLoading = () => {
  const {
    loading,
    methods,
    handleSubmit,
    handleInputChange,
    handleHomeButtonClick,
  } = useAuthKakao();

  return (
    <div>
      {loading ? (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white">
          <div className="relative h-[15.3125rem] w-[17.1875rem]">
            <LottieComponent
              lottieFile={LottieAirplane}
              className="h-full w-[17.1875rem]"
            />
          </div>
          <p>로딩 중...</p>
        </div>
      ) : (
        <FormProvider {...methods}>
          <AddUserInformationInitForm
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleHomeButtonClick={handleHomeButtonClick}
          />
        </FormProvider>
      )}
    </div>
  );
};

export default AuthLoading;

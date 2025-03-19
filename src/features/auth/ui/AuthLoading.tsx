"use client";

import LottieAirplane from "@/../public/lottie/loading-airplane.json";
import { FormProvider } from "react-hook-form";
import Lottie from "lottie-react";
import { useAuthKakao } from "../model/useAuthKakao";
import { AddUserInformationInitForm } from "./AddUserInformationInitForm";

export const AuthLoading = () => {
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
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white">
          <div className="relative h-[15.3125rem] w-[17.1875rem]">
            <Lottie
              animationData={LottieAirplane}
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

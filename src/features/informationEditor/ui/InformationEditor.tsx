"use client";

import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import React from "react";
import CategoryModal from "../../../components/informations/common/CategoryModal";
import ImageUploadItem from "../../../components/informations/common/ImageUploadItem";
import PlaceModal from "../../../components/informations/common/PlaceModal";
import { useFormContext } from "react-hook-form";
import { useEditorStoreType } from "@/stores/editorStore";
import { useDragScroll } from "@/shared/lib/hooks";
import { HashSpinner } from "@/shared/ui/hashSpinner";
import { Hashtag } from "@/shared/ui/hashtag";

interface InformationEditorProps {
  text: string;
  loading: boolean;
  locationModalVisible: boolean;
  categoryModalVisible: boolean;
  inputTagRef: React.RefObject<HTMLInputElement | null>;
  inputTipRef: React.RefObject<HTMLInputElement | null>;
  editorStore: useEditorStoreType;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  handleHashTagChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleTipChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export const InformationEditor = ({
  text,
  loading,
  locationModalVisible,
  categoryModalVisible,
  inputTagRef,
  inputTipRef,
  editorStore,
  openLocationModal,
  closeLocationModal,
  openCategoryModal,
  closeCategoryModal,
  handleHashTagChange,
  handleTipChange,
  handleSubmit,
}: InformationEditorProps) => {
  const formContext = useFormContext();
  const imagesHook = useDragScroll();

  return (
    <div className="flex w-full flex-col">
      {locationModalVisible && <PlaceModal closeModal={closeLocationModal} />}
      {categoryModalVisible && (
        <CategoryModal closeModal={closeCategoryModal} />
      )}
      <HashSpinner loading={loading} />
      <h1 className="text-[1.75rem] font-bold text-black">
        {`정보 ${text}하기`}
      </h1>
      <p className="text-gray1 mt-6 font-medium">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <div className="relative mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-[0.625rem]">
        <h2 className="w-[2.625rem] text-lg font-semibold text-nowrap text-black">
          제목<span className="text-main">*</span>
        </h2>
        <input
          className={`${formContext.formState.errors.informationTitle ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-full w-full rounded-full border-[0.0625rem] bg-transparent px-5 text-sm font-medium outline-hidden`}
          type="text"
          placeholder="제목을 입력하세요. (최대 50자)"
          {...formContext.register("informationTitle")}
          maxLength={50}
          autoComplete="off"
          onChange={(e) => {
            formContext.setValue("informationTitle", e.target.value);
            formContext.trigger("informationTitle");
          }}
        />
        {formContext.formState.errors.informationTitle && (
          <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
            {formContext.formState.errors.informationTitle.message as String}
          </p>
        )}
      </div>
      <div className="mt-10 flex flex-row items-center gap-40 max-[1024px]:gap-10 max-[744px]:flex-col max-[744px]:items-start">
        <div className="relative flex h-[3.3125rem] grow flex-row items-center gap-[0.625rem] max-[744px]:w-full">
          <h2 className="w-[2.625rem] text-lg font-semibold text-nowrap text-black">
            장소<span className="text-main">*</span>
          </h2>
          <button
            className={`${formContext.getValues("placeName") !== "" ? "text-black" : "text-gray2"} ${formContext.formState.errors.placeName ? "border-red-500" : "border-gray3 hover:border-main"} h-full grow rounded-full border-[0.0625rem] bg-transparent pl-5 text-start text-sm font-medium outline-hidden`}
            type="button"
            onClick={openLocationModal}
          >
            {formContext.getValues("placeName") !== ""
              ? formContext.getValues("placeName")
              : "장소명을 입력하세요."}
          </button>
          {formContext.formState.errors.placeName && (
            <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
              {formContext.formState.errors.placeName.message as String}
            </p>
          )}
        </div>
        <button
          className={`${formContext.formState.errors.categoryId ? "border-red-500" : "border-gray3 hover:border-main"} relative flex h-[3.3125rem] grow flex-row items-center justify-between gap-1 rounded-full border-[0.0625rem] px-7 py-3 text-lg font-semibold`}
          type="button"
          onClick={openCategoryModal}
        >
          {formContext.getValues("categoryId") !== 0 ? (
            formContext.getValues("categoryName")
          ) : (
            <p className="flex flex-row items-center">
              {"카테고리 선택"}
              <span className="text-main">*</span>
            </p>
          )}
          <IoIosArrowDown />
          {formContext.formState.errors.categoryId && (
            <p className="absolute -bottom-6 left-4 mt-1 text-xs font-medium text-red-500">
              {formContext.formState.errors.categoryId.message as String}
            </p>
          )}
        </button>
      </div>
      <div
        className="mt-10 mb-2 flex flex-row items-center gap-4 overflow-x-auto"
        ref={imagesHook.listRef}
        onMouseDown={imagesHook.onDragStart}
        onMouseMove={imagesHook.onDragMove}
        onMouseUp={imagesHook.onDragEnd}
        onMouseLeave={imagesHook.onDragEnd}
        onTouchStart={imagesHook.onTouchStart}
        onTouchMove={imagesHook.onTouchMove}
        onTouchEnd={imagesHook.onTouchEnd}
      >
        {editorStore.images.map((_, index) => (
          <div key={index}>
            <ImageUploadItem imageIndex={index} />
          </div>
        ))}
      </div>
      <p className="text-gray1 text-sm font-medium">
        사진 최대 용량은 10MB입니다.
      </p>
      <textarea
        className="hover:border-main focus:border-main mt-[2.5rem] min-h-[21.875rem] resize-none rounded-2xl border-[0.0625rem] p-4 outline-hidden"
        {...formContext.register("informationContent")}
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        onChange={(e) => {
          formContext.setValue("informationContent", e.target.value);
          formContext.trigger("informationContent");
        }}
        maxLength={500}
      />
      <p className="text-gray1 pt-3 text-end text-sm font-medium">
        {formContext.getValues("informationContent").length}/500
      </p>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="flex w-44 flex-row items-center pt-3 text-lg font-bold text-nowrap text-black">
          해시태그<span className="text-main">*</span>
        </h2>
        <div className="relative flex w-full flex-col gap-2">
          <input
            className={`${formContext.getValues("hashtags").length >= 10 ? "bg-gray-100/25" : "bg-transparent"} ${formContext.formState.errors.hashtags ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] py-2 pl-5 text-sm font-medium outline-hidden hover:border-b-[0.0625rem]`}
            placeholder="태그로 키워드를 써보세요! (2 ~ 15자)"
            disabled={formContext.getValues("hashtags").length >= 10}
            onKeyUp={handleHashTagChange}
            onKeyDown={(e) => {
              if (e.key === "#" || e.key === " ") {
                e.preventDefault();
                e.persist();
              } else if (
                e.key !== "Backspace" &&
                inputTagRef.current !== null &&
                inputTagRef.current.value.length >= 15
              ) {
                e.preventDefault();
                e.persist();
                inputTagRef.current.value = inputTagRef.current.value.slice(
                  0,
                  15,
                );
              }
            }}
            ref={inputTagRef}
          />
          {formContext.formState.errors.hashtags && (
            <p className="absolute bottom-5 left-4 text-xs font-medium text-red-500">
              {formContext.formState.errors.hashtags.message as String}
            </p>
          )}
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-1 flex-row flex-wrap items-center gap-2 overflow-auto py-1 pl-5">
              {formContext
                .getValues("hashtags")
                .map((hashtag: string, index: number) => (
                  <Hashtag
                    key={index}
                    tagName={hashtag}
                    borderColor="border-main"
                    textColor="text-main"
                    cursorPointer={true}
                    hover="hover:scale-105"
                    removable={true}
                    onClick={() => {
                      const hashtags: string[] =
                        formContext.getValues("hashtags");
                      const filteredHashtags = hashtags.filter(
                        (_, i) => index !== i,
                      );
                      formContext.setValue("hashtags", filteredHashtags);
                      formContext.trigger("hashtags");
                    }}
                  />
                ))}
            </div>
            <button
              className="text-gray1 hover:text-main h-9 text-sm font-medium"
              type="button"
              onClick={() => {
                const hashtag = inputTagRef.current?.value ?? "";
                if (hashtag === "") {
                  return;
                }
                const hashtags = formContext.getValues("hashtags");
                if (!hashtags.includes(hashtag) && hashtag.trim().length >= 2) {
                  hashtags.push(hashtag);
                }
                formContext.setValue("hashtags", hashtags);
                formContext.trigger("hashtags");
                (inputTagRef.current as HTMLInputElement).value = "";
              }}
            >
              <span className="text-main">+</span>
              {" 해시태그 추가"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="w-36 pt-3 text-lg font-bold text-black">
          생생한 혼플 TIP<span className="text-main">*</span>
        </h2>
        <div className="relative flex grow flex-col gap-4 max-[744px]:w-full">
          {formContext.getValues("tips").map((tip: string, index: number) => (
            <div key={index} className="relative w-full">
              <div className="flex h-[3.3125rem] w-full items-center rounded-3xl border-[0.0625rem] bg-gray-100/25 pr-14 pl-5 text-sm outline-hidden">
                {tip}
              </div>
              <MdClose
                className="text-main absolute top-[0.625rem] right-[0.875rem] cursor-pointer rounded-full bg-gray-100 p-2 hover:scale-110"
                size="2rem"
                onClick={() => {
                  const tips: string[] = formContext.getValues("tips");
                  const filteredTips = tips.filter((_, idx) => idx !== index);
                  formContext.setValue("tips", filteredTips);
                  formContext.trigger("tips");
                }}
              />
            </div>
          ))}
          {formContext.getValues("tips").length < 5 && (
            <div className="relative w-full">
              <input
                className={`${formContext.formState.errors.tips ? "border-red-500 focus:border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] pr-14 pl-5 text-sm outline-hidden`}
                type="text"
                placeholder="나만의 혼플 팁을 알려주세요."
                onKeyUp={handleTipChange}
                onKeyDown={(e) => {
                  if (e.key === ";") {
                    e.preventDefault();
                    e.persist();
                  }
                }}
                ref={inputTipRef}
              />
              <FaCheck
                className="text-main absolute top-[0.625rem] right-[0.875rem] cursor-pointer rounded-full bg-gray-100 p-2 hover:scale-110"
                size="2rem"
                onClick={() => {
                  if (
                    inputTipRef.current !== null &&
                    inputTipRef.current.value.trim() !== ""
                  ) {
                    const tips: string[] = formContext.getValues("tips");
                    const tip = inputTipRef.current.value;
                    tips.push(tip);
                    formContext.setValue("tips", tips);
                    formContext.trigger("tips");
                    inputTipRef.current.value = "";
                  }
                }}
              />
            </div>
          )}
          {formContext.formState.errors.tips && (
            <p className="absolute -bottom-6 left-4 text-xs font-medium text-red-500">
              최소 하나의 Tip을 입력해 주세요.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button
          className={`${editorStore.imageLoading ? "bg-gray1 cursor-not-allowed" : "bg-main hover:scale-105"} mt-10 mb-20 flex h-[2.625rem] w-[9.5rem] items-center justify-center rounded-full font-medium text-white shadow-sm`}
          type="submit"
          onClick={() => handleSubmit()}
          disabled={loading || editorStore.imageLoading}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-3">
              <Image
                className="animate-spin"
                src="/images/loading.webp"
                alt="loading"
                width={20}
                height={20}
              />
              <p>등록 중...</p>
            </div>
          ) : (
            <p>{`정보 ${text}하기`}</p>
          )}
        </button>
      </div>
    </div>
  );
};

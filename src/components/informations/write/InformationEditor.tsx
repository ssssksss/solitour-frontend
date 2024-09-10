import { IoIosArrowDown } from "react-icons/io";
import ImageUploadItemContainer from "@/containers/informations/write/ImageUploadItemContainer";
import { useEditorStoreType } from "@/store/editorStore";
import ItemTag from "../common/ItemTag";
import { useDragScrollType } from "@/hooks/useDragScroll";
import PlaceModalContainer from "@/containers/informations/write/PlaceModalContainer";
import CategoryModalContainer from "@/containers/informations/write/CategoryModalContainer";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import QuillEditor from "./QuillEditor";
import { useFormContext } from "react-hook-form";

interface Props {
  pathname: string;
  editorStore: useEditorStoreType;
  locationModal: boolean;
  categoryModal: boolean;
  inputTagRef: React.RefObject<HTMLInputElement>;
  imagesHook: useDragScrollType;
  loading: boolean;
  onSubmit: () => void;
  showLocationModal: () => void;
  closeLocationModal: () => void;
  showCategoryModal: () => void;
  closeCategoryModal: () => void;
  onChangeHashTagHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InformationEditor = ({
  pathname,
  editorStore,
  locationModal,
  categoryModal,
  inputTagRef,
  imagesHook,
  loading,
  onSubmit,
  showLocationModal,
  closeLocationModal,
  showCategoryModal,
  closeCategoryModal,
  onChangeHashTagHandler,
}: Props) => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full flex-col">
      {locationModal && <PlaceModalContainer closeModal={closeLocationModal} />}
      {categoryModal && (
        <CategoryModalContainer closeModal={closeCategoryModal} />
      )}
      <h1 className="text-[1.75rem] font-bold text-black">
        {`정보 ${pathname}하기`}
      </h1>
      <p className="mt-6 font-medium text-gray1">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <div className="relative mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-[0.625rem]">
        <h2 className="w-[2.625rem] text-lg font-semibold text-black">
          제목<span className="text-main">*</span>
        </h2>
        <input
          className={`${formContext.formState.errors.informationTitle ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-full flex-grow rounded-full border-[0.0625rem] bg-transparent px-5 text-sm font-medium outline-none`}
          type="text"
          placeholder="제목을 입력하세요. (최대 50자)"
          {...formContext.register("informationTitle")}
          maxLength={50}
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
        <div className="relative flex h-[3.3125rem] flex-grow flex-row items-center gap-[0.625rem] max-[744px]:w-full">
          <h2 className="w-[2.625rem] text-lg font-semibold text-black">
            장소<span className="text-main">*</span>
          </h2>
          <button
            className={`${formContext.getValues("placeName") !== "" ? "text-black" : "text-gray2"} ${formContext.formState.errors.placeName ? "border-red-500" : "border-gray3 hover:border-main"} h-full flex-grow rounded-full border-[0.0625rem] bg-transparent pl-5 text-start text-sm font-medium outline-none`}
            type="button"
            onClick={showLocationModal}
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
          className={`${formContext.formState.errors.categoryId ? "border-red-500" : "border-gray3 hover:border-main"} relative flex h-[3.3125rem] flex-grow flex-row items-center justify-between gap-1 rounded-full border-[0.0625rem] px-7 py-3 text-lg font-semibold`}
          type="button"
          onClick={showCategoryModal}
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
        className="mb-2 mt-10 flex flex-row items-center gap-4 overflow-x-auto"
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
            <ImageUploadItemContainer index={index} />
          </div>
        ))}
      </div>
      <p className="text-sm font-medium text-gray1">
        사진 최대 용량은 10MB입니다.
      </p>
      <QuillEditor
        content={formContext.getValues("informationContent")}
        onChange={(value: string, length: number) => {
          formContext.setValue("informationContent", value);
          formContext.setValue("contentLength", length);
          formContext.trigger("informationContent");
        }}
      />
      <p className="pt-3 text-end text-sm font-medium text-gray1">
        {formContext.getValues("contentLength")}/500
      </p>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="flex w-44 flex-row items-center text-nowrap pt-3 text-lg font-bold text-black">
          해시태그<span className="text-main">*</span>
        </h2>
        <div className="relative flex w-full flex-col gap-2">
          <input
            className={`${formContext.getValues("hashtags").length >= 10 ? "bg-gray-100" : "bg-transparent"} ${formContext.formState.errors.hashtags ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] py-2 pl-5 text-sm font-medium outline-none hover:border-b-[0.0625rem]`}
            placeholder="#해시태그로 키워드를 써보세요! (2 ~ 15자)"
            disabled={formContext.getValues("hashtags").length >= 10}
            onKeyUp={onChangeHashTagHandler}
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
                  <ItemTag
                    key={index}
                    tag={hashtag}
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
              className="h-9 text-sm font-medium text-gray1 hover:text-main"
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
        <div className="relative flex flex-grow flex-col gap-4 max-[744px]:w-full">
          {formContext.getValues("tips").map((tip: string, index: number) => (
            <div key={index} className="relative w-full">
              {pathname === "등록" ? (
                <input
                  className={`${formContext.formState.errors.tips && tip.trim() === "" ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} ${index >= 1 ? "pr-14" : "pr-5"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] pl-5 text-sm outline-none`}
                  type="text"
                  placeholder="나만의 혼플 팁을 알려주세요."
                  onChange={(e) => {
                    const tips: string[] = formContext.getValues("tips");
                    tips[index] = e.target.value;
                    formContext.setValue("tips", tips);
                    formContext.trigger("tips");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ";") {
                      e.preventDefault();
                      e.persist();
                    }
                  }}
                />
              ) : (
                <input
                  className={`${formContext.formState.errors.tips && tip.trim() === "" ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} ${index >= 1 ? "pr-14" : "pr-5"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] pl-5 text-sm outline-none`}
                  type="text"
                  placeholder="나만의 혼플 팁을 알려주세요."
                  value={tip}
                  onChange={(e) => {
                    const tips: string[] = formContext.getValues("tips");
                    tips[index] = e.target.value;
                    formContext.setValue("tips", tips);
                    formContext.trigger("tips");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ";") {
                      e.preventDefault();
                      e.persist();
                    }
                  }}
                />
              )}

              {index >= 1 && (
                <MdClose
                  className="absolute right-[0.875rem] top-[0.625rem] cursor-pointer rounded-full bg-gray-100 p-2 text-main hover:scale-110"
                  size="2rem"
                  onClick={() => {
                    const tips: string[] = formContext.getValues("tips");
                    const filteredTips = tips.filter((_, idx) => idx !== index);
                    formContext.setValue("tips", filteredTips);
                    formContext.trigger("tips");
                  }}
                />
              )}
            </div>
          ))}
          {formContext.formState.errors.tips && (
            <p className="absolute -bottom-6 left-4 text-xs font-medium text-red-500">
              비어있는 Tip을 입력하거나 항목을 삭제해 주세요.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mt-3 flex flex-row items-center gap-5 text-sm font-medium text-gray1">
          <button
            className={`${formContext.getValues("tips").length <= 1 ? "text-gray3" : "hover:text-main"}`}
            type="button"
            onClick={() => {
              const tips: string[] = formContext.getValues("tips");
              tips.pop();
              formContext.setValue("tips", tips);
              formContext.trigger("tips");
            }}
            disabled={formContext.getValues("tips").length <= 1}
          >
            <span
              className={`${formContext.getValues("tips").length <= 1 ? "text-gray3" : "text-main"}`}
            >
              -
            </span>
            {" 항목 삭제"}
          </button>
          <button
            className="hover:text-main"
            type="button"
            onClick={() => {
              const tips = formContext.getValues("tips");
              tips.push("");
              formContext.setValue("tips", tips);
              formContext.trigger("tips");
            }}
          >
            <span className="text-main">+</span>
            {" 항목 추가"}
          </button>
        </div>
        <button
          className="mb-20 mt-10 flex h-11 w-[9.5rem] items-center justify-center rounded-full bg-main font-medium text-white shadow hover:scale-105"
          type="submit"
          onClick={() => onSubmit()}
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-row items-center gap-3">
              <Image
                className="animate-spin"
                src="/loading-icon.png"
                alt="loading-icon"
                width={20}
                height={20}
              />
              <p>등록 중...</p>
            </div>
          ) : (
            <p>{`정보 ${pathname}하기`}</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default InformationEditor;

import { Dispatch, SetStateAction } from "react";
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

interface Props {
  pathname: string;
  editorStore: useEditorStoreType;
  locationModal: boolean;
  categoryModal: boolean;
  inputTagRef: React.RefObject<HTMLInputElement>;
  imagesHook: useDragScrollType;
  hashtagsHook: useDragScrollType;
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
  hashtagsHook,
  loading,
  onSubmit,
  showLocationModal,
  closeLocationModal,
  showCategoryModal,
  closeCategoryModal,
  onChangeHashTagHandler,
}: Props) => {
  return (
    <div className="flex w-full flex-col">
      {locationModal && <PlaceModalContainer closeModal={closeLocationModal} />}
      {categoryModal && (
        <CategoryModalContainer closeModal={closeCategoryModal} />
      )}

      <h1 className="text-[1.75rem] font-bold text-black dark:text-slate-200">
        {`정보 ${pathname}하기`}
      </h1>
      <p className="mt-6 font-medium text-gray1 dark:text-slate-400">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <div className="mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-7">
        <h2 className="text-lg font-semibold text-black dark:text-slate-200">
          제목<span className="text-2xl text-main">*</span>
        </h2>
        <input
          className="h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          value={editorStore.title}
          onChange={(e) => editorStore.setEditor({ title: e.target.value })}
          required={true}
        />
      </div>
      <div className="mt-12 flex flex-row items-center gap-[2.625rem] max-[744px]:flex-col max-[744px]:items-start">
        <div className="flex h-[3.3125rem] flex-row items-center gap-7 max-[744px]:w-full">
          <h2 className="text-lg font-semibold text-black dark:text-slate-200">
            장소<span className="text-2xl text-main">*</span>
          </h2>
          <button
            className={`${editorStore.placeName !== "" ? "text-black" : "text-gray2"} h-full w-[12.3125rem] flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-start text-sm font-medium outline-none hover:border-main focus:border-main`}
            type="button"
            onClick={showLocationModal}
          >
            {editorStore.placeName !== ""
              ? editorStore.placeName
              : "장소명을 입력하세요."}
          </button>
        </div>
        <div onClick={showCategoryModal}>
          <button
            className="flex h-[3.3125rem] flex-row items-center gap-1 rounded-full border-[0.0625rem] border-gray3 px-7 py-3 text-lg font-semibold hover:border-main dark:text-slate-200"
            type="button"
          >
            {editorStore.categoryId !== 0 ? (
              editorStore.categoryName
            ) : (
              <p className="flex flex-row items-center">
                {"카테고리 선택"}
                <span className="text-2xl text-main">*</span>
              </p>
            )}
            <IoIosArrowDown />
          </button>
        </div>
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
        content={editorStore.content}
        onChange={(value: string, length: number) =>
          editorStore.setEditor({ content: value, contentLength: length })
        }
      />
      <p className="pt-3 text-end text-sm font-medium text-gray1">
        {editorStore.contentLength}/500
      </p>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="flex w-44 flex-row items-center pt-3 text-lg font-bold text-black dark:text-slate-200">
          해시태그<span className="text-2xl text-main">*</span>
        </h2>
        <div className="flex w-full flex-col gap-2">
          <input
            className={`${editorStore.hashtags.length >= 10 ? "bg-gray-100" : "bg-transparent"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] py-2 pl-5 text-sm font-medium outline-none hover:border-b-[0.0625rem] hover:border-main focus:border-main`}
            placeholder="#해시태그로 키워드를 써보세요!"
            disabled={editorStore.hashtags.length >= 10}
            onKeyUp={onChangeHashTagHandler}
            onKeyDown={(e) => {
              if (e.key === "#") {
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
          <div className="flex h-9 w-full flex-row items-center justify-between gap-2">
            <div
              className="flex flex-1 flex-row items-center gap-2 overflow-auto py-1 pl-5"
              ref={hashtagsHook.listRef}
              onMouseDown={hashtagsHook.onDragStart}
              onMouseMove={hashtagsHook.onDragMove}
              onMouseUp={hashtagsHook.onDragEnd}
              onMouseLeave={hashtagsHook.onDragEnd}
              onTouchStart={hashtagsHook.onTouchStart}
              onTouchMove={hashtagsHook.onTouchMove}
              onTouchEnd={hashtagsHook.onTouchEnd}
            >
              {editorStore.hashtags.map((hashtag, index) => (
                <ItemTag
                  key={index}
                  tag={hashtag}
                  borderColor="border-main"
                  textColor="text-main"
                  cursorPointer={true}
                  hover="hover:scale-105"
                  removable={true}
                  onClick={() =>
                    editorStore.setEditor({
                      hashtags: editorStore.hashtags.filter(
                        (_, i) => index !== i,
                      ),
                    })
                  }
                />
              ))}
            </div>
            <button
              className="text-sm font-medium text-gray1 hover:text-main dark:text-slate-400"
              type="button"
              onClick={() => {
                const hashtag = inputTagRef.current?.value ?? "";
                if (hashtag === "") {
                  return;
                }
                editorStore.addHashtag(hashtag);
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
        <h2 className="w-36 pt-3 text-lg font-bold text-black dark:text-slate-200">
          생생한 혼플 TIP<span className="text-2xl text-main">*</span>
        </h2>
        <div className="flex flex-grow flex-col gap-4 max-[744px]:w-full">
          {editorStore.tips.map((tip, index) => (
            <div key={index} className="relative w-full">
              <input
                className={`${index >= 1 ? "pr-14" : "pr-5"} h-[3.3125rem] w-full rounded-3xl border-[0.0625rem] border-gray3 pl-5 text-sm outline-none hover:border-main focus:border-main`}
                type="text"
                placeholder="나만의 혼플 팁을 알려주세요."
                value={tip}
                onChange={(e) => editorStore.changeTip(index, e.target.value)}
                required={true}
                onKeyDown={(e) => {
                  if (e.key === ";") {
                    e.preventDefault();
                    e.persist();
                  }
                }}
              />
              {index >= 1 && (
                <MdClose
                  className="absolute right-[0.875rem] top-[0.625rem] cursor-pointer rounded-full bg-gray-100 p-2 text-main hover:scale-110"
                  size="2rem"
                  onClick={() => {
                    editorStore.setEditor({
                      tips: editorStore.tips.filter((_, idx) => idx !== index),
                    });
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mt-3 flex flex-row items-center gap-5 text-sm font-medium text-gray1 dark:text-slate-400">
          <button
            className={`${editorStore.tips.length <= 1 ? "text-gray3 dark:text-slate-600" : "hover:text-main"}`}
            type="button"
            onClick={() =>
              editorStore.setEditor({
                tips: editorStore.tips.slice(0, editorStore.tips.length - 1),
              })
            }
            disabled={editorStore.tips.length <= 1}
          >
            <span
              className={`${editorStore.tips.length <= 1 ? "text-gray3" : "text-main"}`}
            >
              -
            </span>
            {" 항목 삭제"}
          </button>
          <button
            className="hover:text-main"
            type="button"
            onClick={() =>
              editorStore.setEditor({ tips: [...editorStore.tips, ""] })
            }
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

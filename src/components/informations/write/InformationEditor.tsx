import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ImageUploadItemContainer from "@/containers/informations/write/ImageUploadItemContainer";
import { useEditorStoreType } from "@/store/editorStore";
import ItemTag from "../common/ItemTag";
import { useDragScrollType } from "@/hooks/useDragScroll";
import PlaceModalContainer from "@/containers/informations/write/PlaceModalContainer";
import CategoryModalContainer from "@/containers/informations/write/CategoryModalContainer";
import Image from "next/image";

interface Props {
  pathname: string;
  editorStore: useEditorStoreType;
  locationModal: boolean;
  categoryModal: boolean;
  hashtag: string;
  imagesHook: useDragScrollType;
  hashtagsHook: useDragScrollType;
  loading: boolean;
  onSubmit: () => void;
  showLocationModal: () => void;
  closeLocationModal: () => void;
  showCategoryModal: () => void;
  closeCategoryModal: () => void;
  setHashtag: Dispatch<SetStateAction<string>>;
}

const InformationEditor = ({
  pathname,
  editorStore,
  locationModal,
  categoryModal,
  hashtag,
  imagesHook,
  hashtagsHook,
  loading,
  onSubmit,
  showLocationModal,
  closeLocationModal,
  showCategoryModal,
  closeCategoryModal,
  setHashtag,
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
      <div className="mt-12 flex flex-row items-center gap-[3.375rem] max-[744px]:flex-col max-[744px]:items-start">
        <div className="flex h-[3.3125rem] flex-row items-center gap-7 max-[744px]:w-full">
          <h2 className="text-lg font-semibold text-black dark:text-slate-200">
            장소<span className="text-2xl text-main">*</span>
          </h2>
          <input
            className="h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
            type="text"
            name="placeName"
            placeholder="장소명을 입력하세요."
            value={editorStore.placeName}
            onChange={(e) => {
              editorStore.setEditor({ placeName: e.target.value });
            }}
            onClick={showLocationModal}
            required={true}
          />
        </div>
        <div onClick={showCategoryModal}>
          <button
            className="flex flex-row items-center text-lg font-semibold dark:text-slate-200"
            type="button"
          >
            {editorStore.categoryId !== 0
              ? editorStore.categoryName
              : "카테고리 선택"}
            <span className="text-2xl text-main">*</span>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
      <div
        className="my-10 flex flex-row items-center gap-4 overflow-x-auto"
        ref={imagesHook.listRef}
        onMouseDown={imagesHook.onDragStart}
        onMouseMove={imagesHook.onDragMove}
        onMouseUp={imagesHook.onDragEnd}
        onMouseLeave={imagesHook.onDragEnd}
        onTouchStart={imagesHook.onTouchStart}
        onTouchMove={imagesHook.onTouchMove}
        onTouchEnd={imagesHook.onTouchEnd}
      >
        {editorStore.images.map((image, index) => (
          <div key={index}>
            <ImageUploadItemContainer index={index} />
          </div>
        ))}
      </div>
      <textarea
        className="h-[17.5rem] resize-none rounded-3xl border-[0.0625rem] border-gray3 bg-transparent p-6 text-sm font-medium outline-none hover:border-main focus:border-main"
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        name="content"
        value={editorStore.content}
        onChange={(e) => editorStore.setEditor({ content: e.target.value })}
        maxLength={500}
        required={true}
      />
      <p className="pt-3 text-end text-sm font-medium text-gray1">
        {editorStore.content.length}/500
      </p>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="flex w-44 flex-row items-center pt-3 text-lg font-bold text-black dark:text-slate-200">
          해시태그<span className="text-2xl text-main">*</span>
        </h2>
        <div className="flex w-full flex-col items-end gap-3 overflow-hidden">
          <div
            className="flex h-[3.3125rem] w-full flex-row items-center gap-2 overflow-x-hidden rounded-3xl border-[0.0625rem] pl-5 hover:border-main"
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
                hover="hover:scale-110"
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
            <input
              className="w-[14rem] border-main bg-transparent py-2 text-sm font-medium outline-none hover:border-b-[0.0625rem]"
              type="text"
              name="hashtag"
              placeholder="#해시태그로 키워드를 써보세요!"
              value={hashtag}
              onChange={(e) => {
                setHashtag(e.target.value.slice(0, 15));
              }}
              onKeyDown={(e) => {
                if (e.key === "#") {
                  e.preventDefault();
                  e.persist();
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  e.persist();
                  editorStore.addHashtag(hashtag);
                  setHashtag("");
                }
              }}
            />
          </div>
          <button
            className="text-sm font-medium text-gray1 hover:text-main dark:text-slate-400"
            type="button"
            onClick={() => {
              editorStore.addHashtag(hashtag);
              setHashtag("");
            }}
          >
            <span className="text-main">+</span>
            {" 해시태그 추가"}
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-row items-start gap-7 max-[744px]:flex-col max-[744px]:items-start max-[744px]:gap-2">
        <h2 className="w-36 pt-3 text-lg font-bold text-black dark:text-slate-200">
          생생한 혼플 TIP<span className="text-main">*</span>
        </h2>
        <div className="flex flex-grow flex-col gap-4 max-[744px]:w-full">
          {editorStore.tips.map((tip, index) => (
            <input
              key={index}
              className="h-[3.3125rem] rounded-3xl border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
              type="text"
              name="tip"
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

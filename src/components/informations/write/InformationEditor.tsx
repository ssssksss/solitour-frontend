import {
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  TouchEvent,
} from "react";
import PagePath from "../PagePath";
import CategoryModalContainer from "@/containers/informations/write/CategoryModalContainer";
import { IoIosArrowDown } from "react-icons/io";
import ImageUploadItemContainer from "@/containers/informations/write/ImageUploadItemContainer";
import { useEditorStoreType } from "@/store/editorStore";
import LocationModalContainer from "@/containers/informations/write/LocationModalContainer";

type MyProps = {
  editorStore: useEditorStoreType;
  locationModal: boolean;
  categoryModal: boolean;
  listRef: RefObject<HTMLDivElement>;
  hashtag: string;
  onSubmit: () => void;
  showLocationModal: () => void;
  closeLocationModal: () => void;
  showCategoryModal: () => void;
  closeCategoryModal: () => void;
  setHashtag: Dispatch<SetStateAction<string>>;
  onDragStart: (e: MouseEvent<HTMLDivElement>) => void;
  onDragMove: (e: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
};

const InformationEditor = ({
  editorStore,
  locationModal,
  categoryModal,
  listRef,
  hashtag,
  onSubmit,
  showLocationModal,
  closeLocationModal,
  showCategoryModal,
  closeCategoryModal,
  setHashtag,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MyProps) => {
  return (
    <form
      className="flex w-[60rem] flex-col max-[1024px]:w-[90%]"
      action={onSubmit}
    >
      {locationModal && (
        <LocationModalContainer closeModal={closeLocationModal} />
      )}
      {categoryModal && (
        <CategoryModalContainer closeModal={closeCategoryModal} />
      )}
      <PagePath category={"정보 등록하기"} />
      <h1 className="text-[1.75rem] font-bold text-black">정보 등록하기</h1>
      <p className="mt-6 font-medium text-gray1">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <div className="mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-7">
        <h2 className="text-lg font-semibold text-black">
          제목<span className="text-2xl text-main">*</span>
        </h2>
        <input
          className="h-full flex-grow rounded-3xl border-2 border-gray3 pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
          type="text"
          autoComplete="title"
          name="title"
          placeholder="제목을 입력하세요."
          value={editorStore.title}
          onChange={(e) => editorStore.changeField("title", e.target.value)}
          required={true}
        />
      </div>
      <div className="mt-12 flex flex-row items-center gap-[3.375rem] max-[640px]:flex-col max-[640px]:items-start">
        <div className="flex h-[3.3125rem] flex-row items-center gap-7 max-[640px]:w-full">
          <h2 className="text-lg font-semibold text-black">
            장소<span className="text-2xl text-main">*</span>
          </h2>
          <input
            className="h-full flex-grow rounded-3xl border-2 border-gray3 pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
            type="text"
            autoComplete="location"
            name="location"
            placeholder="장소명을 입력하세요."
            value={editorStore.location}
            onChange={(e) =>
              editorStore.changeField("location", e.target.value)
            }
            onClick={showLocationModal}
            required={true}
          />
        </div>
        <div onClick={showCategoryModal}>
          <button
            className="flex flex-row items-center text-lg font-semibold"
            type="button"
          >
            {editorStore.category !== "" && editorStore.subCategory !== ""
              ? `${editorStore.category} - ${editorStore.subCategory}`
              : "카테고리 선택"}
            <span className="text-2xl text-main">*</span>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
      <div
        className="my-10 flex flex-row items-center gap-4 overflow-x-auto"
        ref={listRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {editorStore.images.map((image, index) => (
          <div key={index}>
            <ImageUploadItemContainer index={index} />
          </div>
        ))}
      </div>
      <textarea
        className="h-[17.5rem] resize-none rounded-3xl border-2 border-gray3 p-6 text-sm font-medium outline-none hover:border-main focus:border-main"
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        autoComplete="content"
        name="content"
        value={editorStore.content}
        onChange={(e) => editorStore.changeField("content", e.target.value)}
        maxLength={500}
        required={true}
      />
      <p className="pt-3 text-end text-sm font-medium text-gray1">
        {editorStore.content.length}/500
      </p>
      <div className="mt-10 flex flex-row items-start gap-7 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-2">
        <h2 className="w-44 pt-3 text-lg font-bold text-black">해시태그</h2>
        <div className="flex min-h-[3.3125rem] w-full flex-row items-center overflow-x-auto rounded-3xl border-2 hover:border-main">
          <input
            className="mx-5 w-[13rem] border-main py-2 text-sm font-medium outline-none hover:border-b-2"
            type="text"
            autoComplete="hashtag"
            name="hashtag"
            placeholder="#해시태그로 키워드를 써보세요!"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                editorStore.addHashtag(hashtag);
                setHashtag("");
              }
            }}
          />
          <div className="flex w-[32rem] flex-wrap items-center gap-4 overflow-x-auto p-4">
            {editorStore.hashtags.map((value, index) => (
              <p
                key={index}
                className="cursor-pointer text-sm font-medium text-gray1 hover:scale-110"
                onClick={(e) => editorStore.removeHashtag(index)}
              >
                #{value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row items-start gap-7 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-2">
        <h2 className="w-36 pt-3 text-lg font-bold text-black">
          생생한 혼플 TIP<span className="text-main">*</span>
        </h2>
        <div className="flex flex-grow flex-col gap-4 max-[768px]:w-full">
          {editorStore.tips.map((tip, index) => (
            <input
              key={index}
              className="h-[3.3125rem] rounded-3xl border-2 border-gray3 pl-5 text-sm font-medium outline-none hover:border-main focus:border-main"
              type="text"
              autoComplete="tip"
              name="tip"
              placeholder="나만의 혼플 팁을 알려주세요."
              value={tip}
              onChange={(e) => editorStore.changeTip(index, e.target.value)}
              required={true}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mt-3 flex flex-row items-center gap-5 text-sm font-medium text-gray1">
          <button
            className={`${editorStore.tips.length <= 1 ? "text-gray3" : "hover:scale-110"}`}
            type="button"
            onClick={(e) => editorStore.removeTip()}
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
            className="hover:scale-110"
            type="button"
            onClick={(e) => editorStore.addTip()}
          >
            <span className="text-main">+</span>
            {" 항목 추가"}
          </button>
        </div>
        <button
          className="mb-20 mt-10 flex h-11 w-[9.5rem] items-center justify-center rounded-full bg-main font-medium text-white shadow hover:scale-105"
          type="submit"
        >
          정보 등록하기
        </button>
      </div>
    </form>
  );
};

export default InformationEditor;

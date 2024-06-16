import { ChangeEvent, MouseEvent, RefObject, TouchEvent } from "react";
import PagePath from "../PagePath";
import CategoryModalContainer from "@/containers/informations/write/CategoryModalContainer";
import { IoIosArrowDown } from "react-icons/io";
import ImageUploadItemContainer from "@/containers/informations/write/ImageUploadItemContainer";

type MyProps = {
  title: string;
  location: string;
  category: string;
  subCategory: string;
  images: string[];
  content: string;
  tips: string[];
  visible: boolean;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLocation: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeTip: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  addTip: () => void;
  removeTip: () => void;
  showModal: () => void;
  closeModal: () => void;
  listRef: RefObject<HTMLDivElement>;
  onDragStart: (e: MouseEvent<HTMLDivElement>) => void;
  onDragMove: (e: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: (e: MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
};

const InformationEditor = ({
  title,
  location,
  category,
  subCategory,
  images,
  content,
  tips,
  visible,
  onChangeTitle,
  onChangeLocation,
  onChangeContent,
  onChangeTip,
  addTip,
  removeTip,
  showModal,
  closeModal,
  listRef,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MyProps) => {
  return (
    <form className="flex w-[60rem] flex-col max-[1024px]:w-[90%]">
      {visible && <CategoryModalContainer closeModal={closeModal} />}
      <PagePath category={"정보 등록하기"} />
      <h1 className="text-3xl font-bold text-black">정보 등록하기</h1>
      <p className="mt-6 font-semibold text-gray1">
        혼자 여행할 때 <span className="text-main">유용한 정보</span>를 다른
        솔리들과 공유해보세요!
      </p>
      <div className="mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center space-x-7">
        <h2 className="text-lg font-semibold text-black">
          제목<span className="text-main">*</span>
        </h2>
        <input
          className="h-full flex-grow rounded-3xl border-2 border-gray3 pl-5 text-sm font-semibold outline-none hover:border-main focus:border-main"
          type="text"
          autoComplete="title"
          name="title"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={onChangeTitle}
          required={true}
        />
      </div>
      <div className="mt-12 flex flex-row items-center space-x-[3.375rem]">
        <select
          className="cursor-pointer bg-white text-lg font-semibold outline-none"
          name="location"
          value={location}
          onChange={onChangeLocation}
          required={true}
        >
          <option value="" disabled={true}>
            장소 선택*
          </option>
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="other">기타</option>
        </select>
        <div onClick={showModal}>
          <button
            className="flex flex-row items-center text-lg font-semibold"
            type="button"
          >
            {category !== "" && subCategory !== ""
              ? `${category} - ${subCategory}`
              : "카테고리 선택"}
            <span className="text-main">*</span>
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
        {images.map((image, index) => (
          <div key={index}>
            <ImageUploadItemContainer index={index} />
          </div>
        ))}
      </div>
      <textarea
        className="h-[17.5rem] resize-none rounded-3xl border-2 border-gray3 p-6 text-sm font-semibold outline-none hover:border-main focus:border-main"
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        autoComplete="content"
        name="content"
        value={content}
        onChange={onChangeContent}
        maxLength={500}
        required={true}
      />
      <p className="pt-3 text-end text-sm font-semibold text-gray1">
        {content.length}/500
      </p>
      <div className="mt-10 flex flex-row items-start space-x-7 max-[768px]:flex-col max-[768px]:items-start max-[768px]:space-x-0 max-[768px]:space-y-2">
        <h2 className="pt-3 text-lg font-semibold text-black">
          생생한 혼플 TIP<span className="text-main">*</span>
        </h2>
        <div className="flex flex-grow flex-col gap-4 max-[768px]:w-full">
          {tips.map((tip, index) => (
            <input
              key={index}
              className="h-[3.3125rem] rounded-3xl border-2 border-gray3 pl-5 text-sm font-semibold outline-none hover:border-main focus:border-main"
              type="text"
              autoComplete="tip"
              name="tip"
              placeholder="나만의 혼플 팁을 알려주세요."
              value={tip}
              onChange={(e) => onChangeTip(index, e)}
              required={true}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mt-3 flex flex-row items-center gap-5 text-sm font-semibold text-gray1">
          <button
            className={`${tips.length <= 1 ? "text-gray3" : "hover:scale-110"}`}
            type="button"
            onClick={removeTip}
            disabled={tips.length <= 1}
          >
            <span
              className={`${tips.length <= 1 ? "text-gray3" : "text-main"}`}
            >
              -
            </span>
            항목 삭제
          </button>
          <button className="hover:scale-110" type="button" onClick={addTip}>
            <span className="text-main">+</span>
            항목 추가
          </button>
        </div>
        <button
          className="mb-20 mt-10 flex h-11 w-[9.5rem] items-center justify-center rounded-full bg-gray1 font-black text-white shadow hover:scale-105"
          type="submit"
        >
          정보 등록하기
        </button>
      </div>
    </form>
  );
};

export default InformationEditor;

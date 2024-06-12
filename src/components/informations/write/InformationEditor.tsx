import PagePath from "../PagePath";
import ImageAdditionList from "./ImageAdditionList";

const InformationEditor = () => {
  return (
    <form className="flex w-[60rem] flex-col max-[1024px]:w-[90%]">
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
          required={true}
        />
      </div>
      <div className="mt-12 flex flex-row items-center space-x-[3.375rem]">
        <select
          className="cursor-pointer bg-white text-lg font-semibold outline-none"
          name="location"
          required={true}
        >
          <option value="" disabled={true} selected={true}>
            장소 선택*
          </option>
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="other">기타</option>
        </select>
        <select
          className="cursor-pointer bg-white text-lg font-semibold outline-none"
          name="category"
          required={true}
        >
          <option value="" disabled={true} selected={true}>
            카테고리 선택*
          </option>
          <option value="restaurant">맛집</option>
          <option value="accommondation">숙박</option>
          <option value="activity">액티비티</option>
        </select>
      </div>
      <ImageAdditionList />
      <textarea
        className="h-[17.5rem] resize-none rounded-3xl border-2 border-gray3 p-6 text-sm font-semibold outline-none hover:border-main focus:border-main"
        placeholder="장소 방문은 어땠나요? 장소 정보 및 나의 경험을 작성해 다른 솔리들에게 도움을 주세요."
        autoComplete="content"
        name="content"
        maxLength={500}
        required={true}
      />
      <p className="pt-3 text-end text-sm font-semibold text-gray1">0/500</p>
      <div className="mt-10 flex flex-row items-center space-x-7 max-[768px]:flex-col max-[768px]:items-start max-[768px]:space-x-0 max-[768px]:space-y-2">
        <h2 className="text-lg font-semibold text-black">
          생생한 혼플 TIP<span className="text-main">*</span>
        </h2>
        <input
          className="h-[3.3125rem] flex-grow rounded-3xl border-2 border-gray3 pl-5 text-sm font-semibold outline-none hover:border-main focus:border-main max-[768px]:w-full"
          type="text"
          autoComplete="tip"
          name="tip"
          placeholder="나만의 혼플 팁을 알려주세요."
          required={true}
        />
      </div>
      <div className="flex flex-col items-end">
        <button
          className="mt-3 text-sm font-semibold text-gray1 hover:scale-110"
          type="button"
        >
          <span className="text-main">+</span> 항목 추가
        </button>
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

import Image from "next/image";
import dynamic from "next/dynamic";
import QuillEditorSkeleton from "@/components/skeleton/common/QuillEditorSkeleton";
import { useFormContext } from "react-hook-form";
import HashSpinner from "@/shared/ui/hashSpinner/HashSpinner";
import DatePickerModal from "./DatePickerModal";
import AddressModal from "./AddressModal";

const QuillEditor = dynamic(
  () => import("@/components/diary/common/QuillEditor"),
  {
    ssr: false,
    loading: () => <QuillEditorSkeleton />,
  },
);

interface DiaryEditorProps {
  text: string;
  datePickerModal: boolean;
  addressModal: boolean;
  loading: boolean;
  openDateRangeModal: () => void;
  closeDateRangeModal: () => void;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  handleSubmit: () => void;
}

const DiaryEditor = ({
  text,
  datePickerModal,
  addressModal,
  loading,
  openDateRangeModal,
  closeDateRangeModal,
  openAddressModal,
  closeAddressModal,
  handleSubmit,
}: DiaryEditorProps) => {
  const formContext = useFormContext();

  return (
    <div className="flex w-full flex-col">
      {datePickerModal && <DatePickerModal closeModal={closeDateRangeModal} />}
      {addressModal && <AddressModal closeModal={closeAddressModal} />}
      <HashSpinner loading={loading} />
      <h1 className="text-[1.75rem] font-bold text-black">
        {`일기 ${text}하기`}
      </h1>
      <p className="mt-6 text-gray1">
        새로운 <span className="text-main">경험을 기록</span>하고 나만의
        추억카드를 만들어보세요!
      </p>
      <div className="relative mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-[0.625rem]">
        <h2 className="w-[2.625rem] text-nowrap text-lg font-semibold text-black">
          제목<span className="text-main">*</span>
        </h2>
        <input
          className={`${formContext.formState.errors.title ? "border-red-500" : "border-gray3 hover:border-main focus:border-main"} h-full w-full rounded-full border-[0.0625rem] bg-transparent pl-5 text-sm outline-hidden`}
          type="text"
          placeholder="제목을 입력하세요. (최대 50자)"
          {...formContext.register("title")}
          maxLength={50}
          onChange={(e) => {
            formContext.setValue("title", e.target.value);
            formContext.trigger("title");
          }}
        />
        {formContext.formState.errors.title && (
          <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
            {formContext.formState.errors.title.message as String}
          </p>
        )}
      </div>
      <div className="mt-10 flex flex-row items-center gap-40 max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-10">
        <div className="relative flex h-[3.3125rem] flex-row items-center gap-[0.625rem] max-[1024px]:w-full">
          <h2 className="w-[2.625rem] text-nowrap text-lg font-semibold text-black">
            날짜<span className="text-main">*</span>
          </h2>
          <button
            className={`${formContext.getValues("startDate") ? "text-black" : "text-gray2"} ${formContext.formState.errors.startDate ? "border-red-500" : "border-gray3 hover:border-main"} h-[3.3125rem] w-[21.75rem] grow rounded-full border-[0.0625rem] bg-transparent pl-5 text-start text-sm`}
            type="button"
            onClick={() => openDateRangeModal()}
          >
            {
              /* eslint-disable indent */
              formContext.getValues("startDate") !== null &&
              formContext.getValues("endDate") !== null ? (
                <p>
                  {formContext
                    .getValues("startDate")
                    .toLocaleDateString("ko-KR")}
                </p>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  {"YYYY.MM.DD"}
                  <Image
                    src="/icons/calendar-icon.svg"
                    alt="calendar-icon"
                    width={16}
                    height={16}
                  />
                </div>
              )
              /* eslint-enable indent */
            }
          </button>
          {formContext.formState.errors.startDate && (
            <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
              {formContext.formState.errors.startDate.message as String}
            </p>
          )}
        </div>
        <div className="relative flex h-[3.3125rem] grow flex-row items-center gap-[0.625rem] max-[1024px]:w-full">
          <h2 className="w-[2.625rem] text-nowrap text-lg font-semibold text-black">
            주소<span className="text-main">*</span>
          </h2>
          <button
            className={`${formContext.getValues("address") === "" ? "text-gray2" : "text-black"} ${formContext.formState.errors.address ? "border-red-500" : "border-gray3 hover:border-main"} h-full grow rounded-full border-[0.0625rem] bg-transparent pl-5 text-start text-sm outline-hidden`}
            type="button"
            onClick={() => openAddressModal()}
          >
            {formContext.getValues("address") === ""
              ? "주소를 입력하세요."
              : formContext.getValues("address")}
          </button>
          {formContext.formState.errors.address && (
            <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
              {formContext.formState.errors.address.message as String}
            </p>
          )}
        </div>
      </div>
      <div
        className={`${formContext.formState.errors.moodLevels ? "border-red-500" : "border-gray3"} relative mt-10 flex flex-col gap-5 rounded-2xl border-[0.0625rem] pb-[0.875rem] pt-6`}
      >
        <h2 className="pl-6 text-lg font-semibold text-black">
          하루 기분은 어땠나요?
        </h2>
        <div className="flex flex-wrap items-center">
          {["최고", "좋아", "무난", "슬퍼", "화나"].map((value, index) => (
            <button
              key={index + 1}
              className={`${formContext.getValues("moodLevels") === index + 1 ? "bg-lightGreen text-main" : "text-gray1"} flex h-[5.75rem] w-[6.5rem] flex-col items-center justify-between py-[0.5625rem] text-[0.9375rem] hover:bg-lightGreen hover:text-main`}
              onClick={() => {
                formContext.setValue("moodLevels", index + 1);
                formContext.trigger("moodLevels");
              }}
            >
              <div className="relative h-10 w-8">
                <Image
                  src={`/icons/mood-icon${index + 1}.svg`}
                  alt="mood-icon"
                  fill={true}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p>{value}</p>
            </button>
          ))}
        </div>
        {formContext.formState.errors.moodLevels && (
          <p className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.moodLevels.message as String}
          </p>
        )}
      </div>
      <QuillEditor />
      <button
        className="mb-[5.3125rem] mt-10 flex h-[2.625rem] w-[9.5rem] items-center justify-center self-end rounded-full bg-main text-[0.9375rem] text-white hover:scale-105"
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
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
            <p>{`${text} 중...`}</p>
          </div>
        ) : (
          <p>{`일기 ${text}하기`}</p>
        )}
      </button>
    </div>
  );
};

export default DiaryEditor;

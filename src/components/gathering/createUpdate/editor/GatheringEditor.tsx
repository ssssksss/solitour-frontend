import Breadcrumbs from "@/components/common/Breadcrumb";
import HashSpinner from "@/components/common/HashSpinner";
import GatheringEditorCategoryContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorCategoryContainer";
import GatheringEditorChattingLinkContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorChattingLinkContainer";
import GatheringEditorContentContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorContentContainer";
import GatheringEditorDeadlineContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorDeadlineContainer";
import GatheringEditorHashTagContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorHashTagContainer";
import GatheringEditorParticipantsFilterContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorParticipantsFilterContainer";
import GatheringEditorPeriodContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorPeriodContainer";
import GatheringEditorPlaceContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorPlaceContainer";
import GatheringEditorTitleContainer from "@/containers/gathering/createUpdate/editor/GatheringEditorTitleContainer";
import Image from "next/image";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useFormContext } from "react-hook-form";
import GatheringEditorTimeContainer from "../../../../containers/gathering/createUpdate/editor/GatheringEditorTimeContainer";

interface IGatheringEditorEditProps {
  isEdit: true;
  updateGatheringHandler: () => void;
  loading: boolean;
}

interface IGatheringEditorCreateProps {
  isEdit?: false;
  createGatheringHandler: () => void;
  loading: boolean;
}

// `isEdit` 값에 관계없이 적용 가능한 타입
type IGatheringEditorProps =
  | IGatheringEditorEditProps
  | IGatheringEditorCreateProps;

const GatheringEditor = (props: IGatheringEditorProps) => {
  const formContext = useFormContext();

  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <HashSpinner loading={props.loading} />
      <Breadcrumbs
        categories={[
          { label: "모임", href: "/gathering" },
          { label: props.isEdit ? "모임 수정하기" : "모임 등록하기", href: "" },
        ]}
      />
      <div className="flex flex-col gap-[1.5rem]">
        <h1 className={"text-3xl font-semibold"}>
          {props.isEdit ? "모임 수정하기" : "모임 등록하기"}
        </h1>
        <p>
          새로운 사람들과 <span className="text-main"> 모임을 만들어 </span>
          여행을 다채롭게 경험해보세요!
        </p>
      </div>
      <section
        className={
          "flex w-full max-w-full flex-wrap gap-x-[3.5rem] gap-y-[2.375rem] pt-[3rem]"
        }
      >
        <GatheringEditorTitleContainer />
        <div className="grid w-full gap-x-[1.875rem] gap-y-[2.375rem] max-[576px]:grid-cols-1 min-[576px]:grid-cols-2 min-[960px]:grid-cols-3">
          <GatheringEditorPeriodContainer />
          <GatheringEditorPlaceContainer />
          <GatheringEditorTimeContainer />
          <GatheringEditorDeadlineContainer />
          <GatheringEditorCategoryContainer />
          <GatheringEditorParticipantsFilterContainer />
        </div>
        <GatheringEditorContentContainer />
        <GatheringEditorChattingLinkContainer />
        <GatheringEditorHashTagContainer />
        <div className={"flex w-full justify-end"}>
          <button
            className={`flex h-[3rem] w-[9.5rem] flex-row items-center justify-center rounded-[2rem] px-[1rem] py-[.5rem] text-white disabled:bg-gray1 ${!formContext.formState.isValid ? "bg-gray1" : "bg-main hover:scale-105"}`}
            onClick={() => {
              if (!formContext.formState.isValid) {
                formContext.trigger();
                return;
              }
              props.isEdit == true
                ? props.updateGatheringHandler()
                : props.createGatheringHandler();
            }}
          >
            {props.loading ? (
              <div className="flex flex-row items-center gap-3">
                <Image
                  className="animate-spin"
                  src="/images/loading.webp"
                  alt="loading"
                  width={20}
                  height={20}
                />
                {props.isEdit ? "수정 중..." : "등록 중..."}
              </div>
            ) : (
              <p>{props.isEdit ? "모임 수정하기" : "모임 등록하기"}</p>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
export default GatheringEditor;

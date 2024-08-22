import GatheringEditorCategoryContainer from "@/containers/gathering/editor/GatheringEditorCategoryContainer";
import GatheringEditorContentContainer from "@/containers/gathering/editor/GatheringEditorContentContainer";
import GatheringEditorDeadlineContainer from "@/containers/gathering/editor/GatheringEditorDeadlineContainer";
import GatheringEditorHashTagContainer from "@/containers/gathering/editor/GatheringEditorHashTagContainer";
import GatheringEditorParticipantsFilterContainer from "@/containers/gathering/editor/GatheringEditorParticipantsFilterContainer";
import GatheringEditorPeriodContainer from "@/containers/gathering/editor/GatheringEditorPeriodContainer";
import GatheringEditorPlaceContainer from "@/containers/gathering/editor/GatheringEditorPlaceContainer";
import GatheringEditorTitleContainer from "@/containers/gathering/editor/GatheringEditorTitleContainer";
import Image from "next/image";
import Link from "next/link";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useFormContext } from "react-hook-form";
import GatheringEditorTimeContainer from "./GatheringEditorTimeContainer";

interface IGatheringEditorEditProps {
  isEdit: true;
  updateGatheringHandler: () => void;
}

interface IGatheringEditorCreateProps {
  isEdit?: false;
  createGatheringHandler: () => void;
}

// `isEdit` 값에 관계없이 적용 가능한 타입
type IGatheringEditorProps =
  | IGatheringEditorEditProps
  | IGatheringEditorCreateProps;

const GatheringEditor = (props: IGatheringEditorProps) => {
  const formContext = useFormContext();

  return (
    <div className={"flex w-full max-w-[60rem] flex-col"}>
      <div className="flex gap-[.25rem] text-[.625rem] text-gray2">
        <div className="text-gray1">
          <Link href={"/"}>
            <Image
              src={"/home-icon.svg"}
              alt={"home-icon-image"}
              width={10}
              height={10}
            />
          </Link>
        </div>
        <div> {">"} </div>
        <div>
          <Link href={"/gathering"}> 모임 </Link>
        </div>
        <div> {">"} </div>
        <div className={"font-bold text-gray1"}>
          {props.isEdit ? "모임 수정하기" : "모임 등록하기"}
        </div>
      </div>
      <div className="flex flex-col gap-[1.5rem]">
        <h1 className={"pt-[2.25rem] text-3xl font-semibold"}>
          {props.isEdit ? "모임 수정하기" : "모임 등록하기"}
        </h1>
        <p>
          새로운 사람들과 <span className="text-main"> 모임을 만들어 </span>
          여행을 다채롭게 경험해보세요!
        </p>
      </div>
      <section
        className={"flex w-full max-w-full flex-wrap gap-[2rem] pt-[3rem]"}
      >
        <GatheringEditorTitleContainer />
        <GatheringEditorPeriodContainer />
        <GatheringEditorPlaceContainer />
        <GatheringEditorTimeContainer />
        <GatheringEditorCategoryContainer />
        <GatheringEditorParticipantsFilterContainer />
        <GatheringEditorDeadlineContainer />
        <GatheringEditorContentContainer />
        <GatheringEditorHashTagContainer />
        <div className={"flex w-full justify-end"}>
          <button
            className={`h-[3.825rem] max-w-[10.825rem] rounded-[2rem] px-[2rem] py-[.5rem] text-white disabled:bg-gray1 ${!formContext.formState.isValid ? "bg-gray1" : "bg-main"}`}
            onClick={() => {
              if (!formContext.formState.isValid) {
                formContext.trigger();
              }
              props.isEdit == true
                ? props.updateGatheringHandler()
                : props.createGatheringHandler();
            }}
          >
            {props.isEdit ? "모임 수정하기" : "모임 등록하기"}
          </button>
        </div>
      </section>
    </div>
  );
};
export default GatheringEditor;

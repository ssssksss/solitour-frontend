import GatheringSetting from "@/components/gathering/write/GatheringSetting";
import GatheringCategoryContainer from "@/containers/gathering/write/GatheringCategoryContainer";
import GatheringContentContainer from "@/containers/gathering/write/GatheringContentContainer";
import GatheringPlaceContainer from "@/containers/gathering/write/GatheringPlaceContainer";
import Image from "next/image";
import Link from "next/link";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useFormContext } from "react-hook-form";
import GatheringSchedule from "./GatheringSchedule";

interface IGatheringEditorProps {
  categoryModal: {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
  settingModal: {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
  scheduleModal: {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
  placeModal: {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
  };
  createGatheringHandler: () => void;
}

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
        <div className={"font-bold text-gray1"}> 모임 등록하기 </div>
      </div>
      <div className="flex flex-col gap-[1.5rem]">
        <h1 className={"pt-[2.25rem] text-3xl font-semibold"}>모임 등록하기</h1>
        <p>
          새로운 사람들과 <span className="text-main"> 모임을 만들어 </span>
          여행을 다채롭게 경험해보세요!
        </p>
      </div>
      <section className={"flex flex-col gap-[2rem] pt-[3rem]"}>
        <GatheringCategoryContainer {...props.categoryModal} />
        <GatheringSetting {...props.settingModal} />
        <GatheringSchedule {...props.scheduleModal} />
        <GatheringPlaceContainer {...props.placeModal} />
        <GatheringContentContainer />
        <div className={"flex w-full justify-end"}>
          <button
            className={
              "h-[3.825rem] max-w-[10.825rem] rounded-[2rem] bg-main px-[2rem] py-[.5rem] text-white disabled:bg-gray1"
            }
            onClick={() => {
              props.createGatheringHandler();
            }}
            disabled={!formContext.formState.isValid}
          >
            모임 등록하기
          </button>
        </div>
      </section>
    </div>
  );
};
export default GatheringEditor;

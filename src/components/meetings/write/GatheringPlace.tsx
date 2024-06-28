import { Modal } from "@/components/common/modal/Modal";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import GatheringPlaceModal from "../modal/GatheringPlaceModal";

interface IGatheringPlaceProps {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
}

const GatheringPlace = (props: IGatheringPlaceProps) => {
    const formContext = useFormContext();

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            장소
            <span className="absolute right-[-.5rem] top-[-.5rem] text-lg text-main">
              *
            </span>
          </span>
        </div>
        <button
          onClick={() => props.openModal()}
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          장소 선택
        </button>
        <div>{formContext.getValues("placeName") && "OK"}</div>
        {typeof window != undefined && (
          <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
            <GatheringPlaceModal closeModal={() => props.closeModal()} />
          </Modal>
        )}
      </div>
      <div
        className={
          "flex h-[30rem] flex-col gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        {formContext.getValues("placeName") != undefined && (
          <Link
            className={
              "relative flex h-full flex-col items-center justify-center gap-[.25rem] rounded-[1rem]"
            }
            href={`${formContext.getValues("placeUrl")}`}
          >
            <div
              id="map"
              style={{ width: "100%", height: "calc(100% - 6rem)" }}
              className={
                "rounded-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            ></div>

            <div
              className={
                "flex h-[6rem] w-full flex-col justify-between gap-[1rem] rounded-[1rem] bg-white p-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
              }
            >
              {
                formContext.getValues("placeName") &&
                <>
                <div className={"flex items-center text-2xl font-bold"}>
                  {formContext.getValues("placeName")}
                </div>
                <div className={"flex items-center gap-[1rem]"}>
                  <Image
                    src={"/location-icon.svg"}
                    alt={"location-icon"}
                    width={14}
                    height={14}
                    />
                  <span> {formContext.getValues("placeAddress")} </span>
                </div>
              </>
                  }
            </div>
          </Link>
        )}
      </div>
    </article>
  );
};
export default GatheringPlace

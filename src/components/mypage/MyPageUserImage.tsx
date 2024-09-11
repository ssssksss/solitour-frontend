import { dragAndDropProps } from "@/types/DragAndDrop";
import Image from "next/image";
import UserImage from "../auth/UserImage";
import CropperComponent from "../common/cropper/CropperComponent";

interface IMyPageUserImage {
  dragAndDrop: dragAndDropProps;
  imageBase64Data: string;
  userImageUrl: string;
  userSex: string;
  isModalOpen: boolean;
  closeCropModal: () => void;
  onChangeImageUrl: (_: string) => void;
}
const MyPageUserImage = (props: IMyPageUserImage) => {
  return (
    <article
      className={"flex items-center justify-center pb-[5.25rem] pt-[4.25rem]"}
    >
      <div className={"flex flex-col items-center"}>
        <label
          className={
            "relative mb-[1rem] aspect-square w-[6.75rem] cursor-pointer rounded-[50%] bg-[#F2FAF7] outline outline-[1px] outline-offset-[1px] outline-[#B8EDD9]"
          }
          htmlFor={"imageUpload"}
          onDragEnter={props.dragAndDrop.onDragEnter}
          onDragLeave={props.dragAndDrop.onDragLeave}
          onDragOver={props.dragAndDrop.onDragOver}
          onDrop={props.dragAndDrop.onDropOrInputEvent}
        >
          <UserImage
            userImageAddress={`${props.userImageUrl}`}
            userSex={`${props.userSex}`}
            size={108}
          />
          <div
            className={
              "absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-white"
            }
          >
            <div className="relative h-[1.25rem] w-[1.25rem] ">
              <Image src={"/camera-icon.svg"} alt={"camera-icon-image"} fill />
            </div>
          </div>
          <input
            type={"file"}
            id={"imageUpload"}
            className="hidden"
            onChange={(e) => props.dragAndDrop.onDropOrInputEvent(e)}
          />
        </label>
      </div>
      {props.isModalOpen && props.imageBase64Data && (
        <CropperComponent
          imageBase64Data={props.imageBase64Data}
          closeCropModal={props.closeCropModal}
          onChangeImageUrl={props.onChangeImageUrl}
        />
      )}
    </article>
  );
};
export default MyPageUserImage
import { dragAndDropProps } from "@/types/DragAndDrop";
import { ModalState } from "@/types/ModalState";
import Image from "next/image";
import UserImage from "../auth/UserImage";
import CropperComponent from "../common/cropper/CropperComponent";
import { Modal } from "../common/modal/Modal";

interface IMyPageUserImage {
  dragAndDrop: dragAndDropProps;
  imageBase64Data: string;
  userImageUrl: string;
  userSex: string | null;
  modalState: ModalState,
  closeCropModal: () => void;
  onChangeImageUrl: (_: string) => void;
  deleteImage: () => void;
}
const MyPageUserImage = (props: IMyPageUserImage) => {
  return (
    <article
      className={"flex items-center justify-center pb-[5.25rem] pt-[4.25rem]"}
    >
      <div className={"group flex flex-col items-center"}>
        <label
          className={
            "relative aspect-square w-[6.75rem] cursor-pointer rounded-[50%] bg-[#F2FAF7] outline outline-[1px] outline-offset-[-1px] outline-[#B8EDD9]"
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
              "absolute bottom-0 right-0 flex aspect-square w-[2.375rem] items-center justify-center rounded-[50%] bg-[#F4F4F4]"
            }
          >
            <div className="relative h-[1.25rem] w-[1.25rem]">
              <Image
                src="/mypage/camera-icon.svg"
                alt="camera-icon-image"
                fill
              />
            </div>
          </div>
          <button
            className={
              "invisible absolute right-0 top-0 z-10 flex aspect-square w-[1rem] items-center justify-center rounded-[50%] bg-black group-hover:visible"
            }
            onClick={() => props.deleteImage()}
          >
            <Image
              src="/gathering/close-icon.svg"
              alt="close-icon-image"
              width={8}
              height={8}
            />
          </button>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={props.dragAndDrop.onDropOrInputEvent}
          />
        </label>
      </div>
      <Modal
        modalState={props.modalState}
      >
        <CropperComponent
          imageBase64Data={props.imageBase64Data}
          closeCropModal={props.closeCropModal}
          onChangeImageUrl={props.onChangeImageUrl}
        />
      </Modal>
    </article>
  );
};
export default MyPageUserImage;

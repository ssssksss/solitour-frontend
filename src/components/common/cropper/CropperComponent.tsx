import { IModalComponent } from "@/types/ModalState";
import { useState } from "react";
import Cropper from "react-easy-crop";
import ModalTemplate from "../modal/ModalTemplate";
import { getCroppedImage } from "@/shared/lib/utils";

interface ICropperComponent extends IModalComponent {
  imageBase64Data: string;
  closeCropModal: () => void;
  onChangeImageUrl: (_: string) => void;
}

const CropperComponent = ({
  imageBase64Data,
  closeCropModal,
  onChangeImageUrl,
  ...props
}: ICropperComponent) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!imageBase64Data || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImage(
      imageBase64Data,
      croppedAreaPixels,
      rotation,
    );
    onChangeImageUrl(croppedImage as string);
    closeCropModal();
  };

  return (
    <ModalTemplate className="flex h-[calc(100vh-1rem)] max-w-[calc(100vw-1rem)] flex-col justify-between">
      {props.closeButtonComponent}
      <div className={"relative h-[calc(100%-5rem)] w-full"}>
        <Cropper
          image={imageBase64Data}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1} // 자르는 비율
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round" // 이미지 편집 형태
          zoomWithScroll={true} // 스크롤 확대/축소 허용할지
        />
      </div>
      <div className="flex w-full">
        <button
          onClick={showCroppedImage}
          className="h-[4rem] w-full rounded-lg bg-main text-white shadow-md"
        >
          편집 완료
        </button>
      </div>
    </ModalTemplate>
  );
};
export default CropperComponent;

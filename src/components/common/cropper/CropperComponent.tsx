import { getCroppedImg } from "@/utils/getCroppedImg";
import { useState } from "react";
import Cropper from "react-easy-crop";

interface ICropperComponent {
  imageBase64Data: string;
  closeCropModal: () => void;
  onChangeImageUrl: (_: string) => void;
}
const CropperComponent = ({
  imageBase64Data,
    closeCropModal,
  onChangeImageUrl,
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

    const croppedImage = await getCroppedImg(
      imageBase64Data,
      croppedAreaPixels,
      rotation,
    );
    onChangeImageUrl(croppedImage as string);
    closeCropModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative h-full max-h-screen w-full max-w-screen-lg overflow-hidden rounded-lg bg-white p-4">
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
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-4">
          <button
            onClick={showCroppedImage}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
          >
            Crop & Save
          </button>
          <button
            onClick={closeCropModal}
            className="rounded-lg bg-red-600 px-4 py-2 text-white shadow-md hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default CropperComponent
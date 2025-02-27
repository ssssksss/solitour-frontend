import Image from "next/image";
import { RefObject } from "react";
import { MdClose } from "react-icons/md";
import { HashLoader } from "react-spinners";

interface Props {
  index: number;
  image: string;
  mainImageIndex: number;
  imageRef: RefObject<HTMLInputElement | null>;
  loading: boolean;
  onUploadButtonClicked: () => void;
  previewImage: () => void;
  setMainImageIndex: (index: number) => void;
  onRemove: (index: number) => void;
}

const ImageUploadItem = ({
  index,
  image,
  mainImageIndex,
  imageRef,
  loading,
  onUploadButtonClicked,
  previewImage,
  setMainImageIndex,
  onRemove,
}: Props) => {
  if (image !== "") {
    return (
      <div
        className="relative flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-between rounded-xl border-[0.0625rem] p-2 hover:border-main"
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setMainImageIndex(index)}
        onTouchEnd={() => setMainImageIndex(index)}
      >
        <div className="flex w-full flex-row justify-end">
          <MdClose
            className="z-10 cursor-pointer rounded-full bg-main p-1 text-white hover:scale-110"
            size={"1.75rem"}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
          />
        </div>
        <Image
          className="rounded-[0.625rem]"
          src={image}
          alt={"image"}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        {index === mainImageIndex && (
          <p className="z-10 mb-6 rounded-full bg-main px-3 py-[0.375rem] text-sm font-semibold text-white">
            대표 이미지
          </p>
        )}
        <div /> {/* empty tag */}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[9.375rem] w-40 items-center justify-center rounded-xl border-[0.0625rem] border-main">
        <HashLoader
          color="#00B488"
          loading={loading}
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
      </div>
    );
  }

  return (
    <label
      className={`${index >= 12 ? "hidden" : ""} flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-[0.0625rem] hover:border-main focus:border-main`}
      htmlFor="file"
      onClick={() => onUploadButtonClicked()}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-[0.0625rem] border-main text-xl text-main">
        +
      </div>
      <p className="pb-[0.375rem] pt-3 text-xs font-medium text-gray1">
        사진 추가
      </p>
      <p className="text-xs font-medium text-gray2">{index}/12</p>
      <input
        className="hidden"
        type="file"
        id="photo"
        name="photo"
        accept=".png, .jpeg, .jpg"
        onChange={previewImage}
        ref={imageRef}
      />
    </label>
  );
};

export default ImageUploadItem;

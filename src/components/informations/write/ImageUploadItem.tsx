import Image from "next/image";
import { RefObject } from "react";

type MyProps = {
  index: number;
  image: string;
  imageRef: RefObject<HTMLInputElement>;
  onUploadButtonClicked: () => void;
  previewImage: () => void;
};

const ImageUploadItem = ({
  index,
  image,
  imageRef,
  onUploadButtonClicked,
  previewImage,
}: MyProps) => {
  return (
    <button
      className="relative flex h-[9.375rem] w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 hover:border-main"
      type="button"
      onClick={onUploadButtonClicked}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-main text-xl text-main">
        +
      </div>
      <p className="pb-[0.375rem] pt-3 text-xs font-semibold text-gray1">
        사진 추가
      </p>
      <p className="text-xs font-semibold text-gray2">{index}/12</p>
      <input
        className="hidden"
        type="file"
        id="photo"
        name="photo"
        accept=".png, .jpeg, .jpg"
        onChange={previewImage}
        ref={imageRef}
      />
      {image !== "" && (
        <Image
          className="rounded-[0.625rem]"
          src={image}
          alt={"image"}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      )}
    </button>
  );
};

export default ImageUploadItem;

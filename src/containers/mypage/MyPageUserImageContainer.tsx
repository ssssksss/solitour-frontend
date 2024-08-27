import MyPageUserImage from "@/components/mypage/MyPageUserImage";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useState } from "react";

interface IMyPageUserImageContainer {
  userImageUrl: string;
  userSex: string;
}

const MyPageUserImageContainer = (props: IMyPageUserImageContainer) => {
  const [imageUrl, setImageUrl] = useState(props.userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    setIsModalOpen(true); // 이미지 편집을 위한 모달창
  }

  const closeCropModal = () => {
    setImageBase64Data("");
    setIsModalOpen(false);
  };

  const onChangeImageUrl = (url: string) => {
    setImageUrl(url);
  }

    const {
      isDragging,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDropOrInputEvent,
    } = useDragAndDrop({ imageUpload });

  return (
    <div className="flex flex-col py-4">
      <MyPageUserImage
        dragAndDrop={{
          isDragging,
          onDragEnter,
          onDragLeave,
          onDragOver,
          onDropOrInputEvent,
        }}
        userImageUrl={imageUrl}
        userSex={props.userSex}
        isModalOpen={isModalOpen}
        imageBase64Data={imageBase64Data}
        closeCropModal={closeCropModal}
        onChangeImageUrl={onChangeImageUrl}
      />
    </div>
  );
};

export default MyPageUserImageContainer;

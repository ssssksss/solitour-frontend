import MyPageUserImage from "@/components/mypage/MyPageUserImage";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import useModalState from "@/hooks/useModalState";
import useAuthStore from "@/stores/authStore";
import useToastifyStore from "@/stores/toastifyStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface IMyPageUserImageContainer {
  userImageUrl: string;
  userSex: string | null;
}

const MyPageUserImageContainer = (props: IMyPageUserImageContainer) => {
  const [imageUrl, setImageUrl] = useState(props.userImageUrl || "");
  const [imageBase64Data, setImageBase64Data] = useState<string>("");
  const modalState = useModalState();
  const authStore = useAuthStore();
  const toastifyStore = useToastifyStore();

  const imageUpload = (imageDataUrl: string) => {
    setImageBase64Data(imageDataUrl);
    modalState.openModal(); // 이미지 편집을 위한 모달창
  };

  const deleteImage = async () => {
    const response = await fetchWithAuth("/api/auth/user-image", {
      method: "DELETE",
      "Content-Type": "application/json",
    });

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "success",
        message: "이미지 삭제 실패",
      });
    }

    if (response.ok) {
      const { ...prevState } = authStore;
      if (props.userSex == "male") {
        setImageUrl("/icons/default-male-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
            address: "/icons/default-male-icon.svg",
          },
        });
      } else if (props.userSex == "female") {
        setImageUrl("/icons/default-female-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
            address: "/icons/default-female-icon.svg",
          },
        });
      } else if (!props.userSex) {
        setImageUrl("/icons/default-user-icon.svg");
        authStore.setUser({
          ...prevState,
          userImage: {
            ...authStore.userImage,
            address: "/icons/default-user-icon.svg",
          },
        });
      }
    }
  };

  const closeCropModal = () => {
    setImageBase64Data("");
    modalState.closeModal();
  };

  const onChangeImageUrl = (url: string) => {
    setImageUrl(url);
  };

  const {
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDropOrInputEvent,
  } = useDragAndDrop({ imageUpload });

  return (
    <div>
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
        modalState={modalState}
        imageBase64Data={imageBase64Data}
        closeCropModal={closeCropModal}
        onChangeImageUrl={onChangeImageUrl}
        deleteImage={deleteImage}
      />
    </div>
  );
};

export default MyPageUserImageContainer;

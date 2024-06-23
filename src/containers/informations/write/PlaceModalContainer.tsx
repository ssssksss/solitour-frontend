import PlaceModal from "@/components/informations/write/PlaceModal";
import useEditorStore from "@/store/editorStore";
import { ChangeEvent } from "react";

type MyProps = {
  closeModal: () => void;
};

const PlaceModalContainer = ({ closeModal }: MyProps) => {
  const { placeName, changeField } = useEditorStore();
  const onChangePlaceName = (e: ChangeEvent<HTMLInputElement>) => {
    changeField("placeName", e.target.value);
  };

  return (
    <PlaceModal
      placeName={placeName}
      onChangePlaceName={onChangePlaceName}
      closeModal={closeModal}
    />
  );
};

export default PlaceModalContainer;

import LocationModal from "@/components/informations/write/LocationModal";
import useEditorStore from "@/store/editorStore";
import { ChangeEvent, useState } from "react";

type MyProps = {
  closeModal: () => void;
};

const LocationModalContainer = ({ closeModal }: MyProps) => {
  const { location, changeField } = useEditorStore();
  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    changeField("location", e.target.value);
  };

  return (
    <LocationModal
      location={location}
      onChangeLocation={onChangeLocation}
      closeModal={closeModal}
    />
  );
};

export default LocationModalContainer;

"use client";

import InformationEditor from "@/components/informations/write/InformationEditor";
import useEditorStore from "@/store/editorStore";
import { ChangeEvent, useEffect, useState } from "react";

const InformationEditorContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const {
    title,
    location,
    category,
    content,
    tips,
    initialize,
    changeField,
    changeTip,
    addTip,
    removeTip,
  } = useEditorStore();
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    changeField("title", e.target.value);
  };

  const onChangeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    changeField("location", e.target.value);
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    changeField("category", e.target.value);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeField("content", e.target.value);
  };

  const onChangeTip = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    changeTip(index, e.target.value);
  };

  // 화면에서 벗어났을 때 form값을 모두 초기화함.
  useEffect(() => {
    return () => {
      initialize();
    };
  }, [initialize]);

  return (
    <InformationEditor
      title={title}
      location={location}
      category={category}
      content={content}
      tips={tips}
      visible={visible}
      onChangeTitle={onChangeTitle}
      onChangeLocation={onChangeLocation}
      onChangeCategory={onChangeCategory}
      onChangeContent={onChangeContent}
      onChangeTip={onChangeTip}
      addTip={addTip}
      removeTip={removeTip}
      showModal={showModal}
      closeModal={closeModal}
    />
  );
};

export default InformationEditorContainer;

"use client";

import GatheringEditor from "@/components/gathering/write/GatheringEditor";
import { gatheringCreateFormSchema } from "@/lib/examples/zod/schema/GatheringCreateFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const GatheringEditorContainer = () => {
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [isPlaceModal, setIsPlaceModal] = useState(false);
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(gatheringCreateFormSchema),
    defaultValues: {
      title: "",
      content: "",
      minAgeYear: new Date().getFullYear() - 20,
      maxAgeYear: new Date().getFullYear() - 59,
      allowedSex: "all",
      participantCount: 10,
      placeName: "",
      xAxis: "",
      yAxis: "",
      roadAddressName: "",
      deadline: "",
      scheduleStartDate: "",
      scheduleEndDate: "",
      hashtags: [],
      searchId: "",
      mainCategoryId: 0,
      subCategoryId: 0,
      placeUrl: "",
    },
  });

  const createGatheringHandler = async () => {
    const { hashtags, ...requestData } = methods.getValues();
    try {
      const response = await fetch("/api/gathering/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestData,
          hashtags: JSON.stringify(hashtags),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const id = data.id;
      if (id) {
        router.replace(`/gathering/${id}`);
      } else {
        throw new Error("ID not found in the response");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        categoryModal={{
          isModal: isCategoryModal,
          closeModal: () => setIsCategoryModal(false),
          openModal: () => setIsCategoryModal(true),
        }}
        settingModal={{
          isModal: isSettingModal,
          closeModal: () => setIsSettingModal(false),
          openModal: () => setIsSettingModal(true),
        }}
        scheduleModal={{
          isModal: isScheduleModal,
          closeModal: () => setIsScheduleModal(false),
          openModal: () => setIsScheduleModal(true),
        }}
        placeModal={{
          isModal: isPlaceModal,
          closeModal: () => setIsPlaceModal(false),
          openModal: () => setIsPlaceModal(true),
        }}
        createGatheringHandler={createGatheringHandler}
      />
    </FormProvider>
  );
};

export default GatheringEditorContainer;

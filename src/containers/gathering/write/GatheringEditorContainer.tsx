"use client";

import GatheringEditor from "@/components/gathering/write/GatheringEditor";
import { gatheringCreateFormSchema } from "@/lib/examples/zod/schema/GatheringCreateFormSchema";
import { convertRegionToTwoLetters } from "@/utils/constant/regionHashMap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
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
      startAge: new Date().getFullYear() - 20,
      endAge: new Date().getFullYear() - 59,
      allowedSex: "",
      personCount: 0,
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

    const { mainCategoryId, allowedSex, hashtags, searchId, placeName, xAxis, yAxis, roadAddressName, subCategoryId, ...requestData } = methods.getValues();
    try {
      const response = await fetchWithAuth("/api/gathering/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestData,
          placeRegisterRequest: {
            searchId: searchId,
            name: placeName,
            xAxis: Number(xAxis),
            yAxis: Number(yAxis), 
            address: roadAddressName,
      },
          allowedSex: allowedSex.toUpperCase(),
          gatheringCategoryId: +subCategoryId,
          zoneCategoryNameParent: convertRegionToTwoLetters(roadAddressName.split(" ")[0]),
          zoneCategoryNameChild: roadAddressName.split(" ")[1],
          tagRegisterRequests: hashtags.length > 0 ? hashtags.map(i=>{return {name: i}}) : []
    }),
      });
// TODO 에러 처리 작업 필요함
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      router.replace(`/gathering/${data.data.id}`)
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

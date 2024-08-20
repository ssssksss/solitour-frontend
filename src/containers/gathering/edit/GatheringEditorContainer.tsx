"use client";

import GatheringEditor from "@/components/gathering/edit/GatheringEditor";
import { gatheringCreateFormSchema } from "@/lib/examples/zod/schema/GatheringCreateFormSchema";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { convertRegionToTwoLetters } from "@/utils/constant/regionHashMap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IGatheringEditorContainer {
    gatheringData: GatheringDetailResponseDto
}

const GatheringEditorContainer = ({gatheringData}: IGatheringEditorContainer) => {
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [isPlaceModal, setIsPlaceModal] = useState(false);
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(gatheringCreateFormSchema),
    defaultValues: {
      title: gatheringData.title,
      content: gatheringData.content,
      startAge: gatheringData.startAge,
      endAge: gatheringData.endAge,
      allowedSex: gatheringData.allowedSex,
      personCount: gatheringData.personCount,
      placeName: gatheringData.placeResponse.name,
      xAxis: gatheringData.placeResponse.xaxis,
      yAxis: gatheringData.placeResponse.yaxis,
      roadAddressName: gatheringData.placeResponse.address,
      deadline: gatheringData.deadline,
      scheduleStartDate: gatheringData.scheduleStartDate,
      scheduleEndDate: gatheringData.scheduleEndDate,
      hashtags: gatheringData.tagResponses || [],
      searchId: gatheringData.placeResponse.searchId || 0,
      gatheringCategoryId: 0,
      mainCategoryName: "",
      subCategoryName: "",
    },
  });
  const params = useParams();

  const updateGatheringHandler = async () => {
  const { id } = params;
    const {
      gatheringCategoryId,
      allowedSex,
      hashtags,
      searchId,
      placeName,
      xAxis,
      yAxis,
      roadAddressName,
      ...requestData
    } = methods.getValues();
    try {
      const response = await fetchWithAuth(`/api/gatherings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...requestData,
          placeRegisterRequest: {
            searchId: searchId,
            name: placeName,
            xAxis: xAxis,
            yAxis: yAxis,
            address: roadAddressName,
          },
          allowedSex: allowedSex.toUpperCase(),
          gatheringCategoryId: gatheringCategoryId,
          zoneCategoryNameParent: convertRegionToTwoLetters(
            roadAddressName.split(" ")[0],
          ),
          zoneCategoryNameChild: roadAddressName.split(" ")[1],
          tagRegisterRequests:
            hashtags.length > 0
              ? hashtags.map((i) => {
                  return { name: i };
                })
              : [],
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
        updateGatheringHandler={updateGatheringHandler}
      />
    </FormProvider>
  );
};

export default GatheringEditorContainer;

"use client";

import GatheringEditor from "@/components/gathering/editor/GatheringEditor";
import { gatheringCreateFormSchema } from "@/lib/examples/zod/schema/GatheringCreateFormSchema";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { convertRegionToTwoLetters } from "@/utils/constant/regionHashMap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

interface IGatheringEditContainer {
    gatheringData: GatheringDetailResponseDto
}

const GatheringEditContainer = ({gatheringData}: IGatheringEditContainer) => {
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
      deadline: format(
        new Date(gatheringData.deadline),
        "yyyy-MM-dd HH:mm",
      ),
      scheduleStartDate: format(
        new Date(gatheringData.scheduleStartDate),
        "yyyy-MM-dd HH:mm",
      ),
      scheduleEndDate: format(
        new Date(gatheringData.scheduleEndDate),
        "yyyy-MM-dd HH:mm",
      ),
      hashtags: gatheringData.tagResponses || [],
      searchId: gatheringData.placeResponse.searchId || 0,
      gatheringCategoryId: gatheringData.gatheringCategoryResponse.id,
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
      const response = await fetchWithAuth(`/api/gathering/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          ...requestData,
          placeModifyRequest: {
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
      if (response.status != 201) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      router.replace(`/gathering/${data.id}`)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  

  return (
      <FormProvider {...methods}>
      <GatheringEditor
        updateGatheringHandler={updateGatheringHandler}
        isEdit={true}
      />
    </FormProvider>
  );
};

export default GatheringEditContainer;

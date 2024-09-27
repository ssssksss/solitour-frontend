"use client";

import GatheringEditor from "@/components/gathering/createUpdate/editor/GatheringEditor";
import { GatheringCreateFormSchema } from "@/lib/zod/schema/GatheringCreateFormSchema";
import useToastifyStore from "@/store/toastifyStore";
import { GatheringDetailResponseDto } from "@/types/GatheringDto";
import { convertRegionToTwoLetters } from "@/utils/constant/regionHashMap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface IGatheringUpdateContainer {
  gatheringData: GatheringDetailResponseDto;
}

const GatheringUpdateContainer = ({
  gatheringData,
}: IGatheringUpdateContainer) => {
  const router = useRouter();
  const toastifyStore = useToastifyStore();
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(GatheringCreateFormSchema),
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
      deadline: format(new Date(gatheringData.deadline), "yyyy-MM-dd HH:mm"),
      scheduleStartDate: format(
        new Date(gatheringData.scheduleStartDate),
        "yyyy-MM-dd HH:mm",
      ),
      scheduleEndDate: format(
        new Date(gatheringData.scheduleEndDate),
        "yyyy-MM-dd HH:mm",
      ),
      hashtags:
        gatheringData.tagResponses.length > 0
          ? gatheringData.tagResponses.map((i: { name: string }) => i.name)
          : [],
      searchId: gatheringData.placeResponse.searchId || 0,
      gatheringCategoryId: gatheringData.gatheringCategoryResponse.id,
      openChattingUrl: gatheringData.openChattingUrl,
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
      setLoading(true);
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
          zoneCategoryNameChild:
            convertRegionToTwoLetters(roadAddressName.split(" ")[0]) === "세종"
              ? "세종"
              : roadAddressName.split(" ")[1],
          tagRegisterRequests:
            hashtags.length > 0 ? hashtags.map((i) => ({ name: i })) : [],
        }),
      });

      if (!response.ok) {
        setLoading(false);
        toastifyStore.setToastify({
          type: "error",
          message: "모임 수정 중에 에러가 발생했습니다.",
        });
        throw new Error("Network response was not ok");
      }

      // const data = await response.json();
      // router.replace(`/gathering/${data.id}`);
      router.replace("/gathering");
      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    methods.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        updateGatheringHandler={updateGatheringHandler}
        isEdit={true}
        loading={loading}
      />
    </FormProvider>
  );
};

export default GatheringUpdateContainer;

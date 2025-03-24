"use client";

import { GatheringCreateFormSchema } from "@/features/gathering/model/GatheringCreateFormSchema";
import { convertLocationToTwoLetters } from "@/shared/lib/utils";
import { fetchWithAuth } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useToastifyStore } from "@/shared/model";
import { GatheringEditor } from "@/features/gatheringEditor";
import { GatheringDetail } from "@/entities/gathering";

interface GatheringUpdateEditorProps {
  gatheringDetail: GatheringDetail;
}

export const GatheringUpdateEditor = ({
  gatheringDetail,
}: GatheringUpdateEditorProps) => {
  const router = useRouter();
  const toastifyStore = useToastifyStore();
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(GatheringCreateFormSchema),
    defaultValues: {
      title: gatheringDetail.title,
      content: gatheringDetail.content,
      startAge: gatheringDetail.startAge,
      endAge: gatheringDetail.endAge,
      allowedSex: gatheringDetail.allowedSex,
      personCount: gatheringDetail.personCount,
      placeName: gatheringDetail.placeResponse.name,
      xAxis: gatheringDetail.placeResponse.xaxis,
      yAxis: gatheringDetail.placeResponse.yaxis,
      roadAddressName: gatheringDetail.placeResponse.address,
      deadline: format(new Date(gatheringDetail.deadline), "yyyy-MM-dd HH:mm"),
      scheduleStartDate: format(
        new Date(gatheringDetail.scheduleStartDate),
        "yyyy-MM-dd HH:mm",
      ),
      scheduleEndDate: format(
        new Date(gatheringDetail.scheduleEndDate),
        "yyyy-MM-dd HH:mm",
      ),
      hashtags:
        gatheringDetail.tagResponses.length > 0
          ? gatheringDetail.tagResponses.map((i: { name: string }) => i.name)
          : [],
      searchId: gatheringDetail.placeResponse.searchId || 0,
      gatheringCategoryId: gatheringDetail.gatheringCategoryResponse.id,
      openChattingUrl: gatheringDetail.openChattingUrl,
    },
  });
  const params = useParams();

  const handleSubmit = async () => {
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
          zoneCategoryNameParent: convertLocationToTwoLetters(
            roadAddressName.split(" ")[0],
          ),
          zoneCategoryNameChild:
            convertLocationToTwoLetters(roadAddressName.split(" ")[0]) ===
            "세종"
              ? "세종"
              : roadAddressName.split(" ")[1],
          tagRegisterRequests:
            hashtags.length > 0 ? hashtags.map((i) => ({ name: i })) : [],
        }),
      });

      if (!response.ok) {
        setLoading(false);
        toastifyStore.setToastifyState({
          type: "error",
          message: "모임 수정 중에 에러가 발생했습니다.",
        });
        throw new Error("Network response was not ok");
      }

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
        text="수정"
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </FormProvider>
  );
};

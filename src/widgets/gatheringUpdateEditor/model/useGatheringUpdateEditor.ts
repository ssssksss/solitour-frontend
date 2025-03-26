"use client";

import {
  GatheringDetail,
  GatheringUpdateRequest,
  updateGathering,
} from "@/entities/gathering";
import { GatheringFormSchema } from "@/features/gatheringEditor";
import { convertLocationToTwoLetters } from "@/shared/lib/utils";
import { useToastifyStore } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useGatheringUpdateEditor = (gatheringDetail: GatheringDetail) => {
  const router = useRouter();
  const { setToastifyState } = useToastifyStore();
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(GatheringFormSchema),
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
      searchId: gatheringDetail.placeResponse.searchId || "0",
      gatheringCategoryId: gatheringDetail.gatheringCategoryResponse.id,
      openChattingUrl: gatheringDetail.openChattingUrl,
    },
  });
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async () => {
    try {
      setLoading(true);

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

      const data: GatheringUpdateRequest = {
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
          convertLocationToTwoLetters(roadAddressName.split(" ")[0]) === "세종"
            ? "세종"
            : roadAddressName.split(" ")[1],
        tagRegisterRequests:
          hashtags.length > 0 ? hashtags.map((i) => ({ name: i })) : [],
      };

      await updateGathering(Number(id), data);
      router.replace(`/gathering/${id}`);
      router.refresh();
    } catch (error) {
      setToastifyState({
        type: "error",
        message: "모임 수정 중에 에러가 발생했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    methods.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, methods, handleSubmit };
};

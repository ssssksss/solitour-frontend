"use client";

import { createGathering, GatheringCreateRequest } from "@/entities/gathering";
import { GatheringFormSchema } from "@/features/gatheringEditor";
import { convertLocationToTwoLetters } from "@/shared/lib/utils";
import { useToastifyStore } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useGatheringCreateEditor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toastifyStore = useToastifyStore();
  const methods = useForm({
    resolver: zodResolver(GatheringFormSchema),
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
      gatheringCategoryId: 0,
      openChattingUrl: "",
    },
  });

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

      const data: GatheringCreateRequest = {
        ...requestData,
        placeRegisterRequest: {
          searchId: searchId,
          name: placeName,
          xAxis: Number(xAxis),
          yAxis: Number(yAxis),
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

      const result = await createGathering(data);
      router.replace(`/gathering/${result.data.id}`);
    } catch (error) {
      toastifyStore.setToastifyState({
        type: "error",
        message: "모임 생성 중에 에러가 발생했습니다.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, methods, handleSubmit };
};

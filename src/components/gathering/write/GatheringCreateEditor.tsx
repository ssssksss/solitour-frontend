"use client";

import GatheringEditor from "@/components/gathering/createUpdate/editor/GatheringEditor";
import { GatheringCreateFormSchema } from "@/lib/zod/schema/GatheringCreateFormSchema";
import useToastifyStore from "@/stores/toastifyStore";
import { convertRegionToTwoLetters } from "@/utils/constant/regionHashMap";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const GatheringCreateEditor = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const toastifyStore = useToastifyStore();
  const methods = useForm({
    resolver: zodResolver(GatheringCreateFormSchema),
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

  const createGatheringHandler = async () => {
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
      const response = await fetchWithAuth("/api/gathering", {
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
          message: "모임 생성 중에 에러가 발생했습니다.",
        });
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      router.replace(`/gathering/${data.data.id}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <GatheringEditor
        createGatheringHandler={createGatheringHandler}
        loading={loading}
      />
    </FormProvider>
  );
};

export default GatheringCreateEditor;

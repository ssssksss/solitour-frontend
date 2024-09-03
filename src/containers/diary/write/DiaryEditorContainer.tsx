"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryCreateFormSchema } from "@/lib/zod/schema/DiaryCreateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DiaryEditorContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(DiaryCreateFormSchema),
    defaultValues: {
      userId: authStore.id,
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      address: [""],
      image: "",
      moodLevels: [],
      contents: [],
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    const { title, image, startDate, endDate, contents, moodLevels, address } =
      methods.getValues();

    const data: CreateDiaryRequestDto = {
      title: title,
      titleImage: image,
      startDatetime: startDate,
      endDatetime: endDate,
      diaryDayRequests: Array.from(
        { length: diaryEditorStore.days },
        (_, index) => ({
          content: contents[index],
          feelingStatus: FEELING_STATUS[moodLevels[index]],
          place: address[index],
        }),
      ),
    };

    setLoading(true);

    const response = await fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      alert("일기 작성에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    const diaryId = await response.text();
    router.push(`/diary/${diaryId}`);
    router.refresh();
  };

  // 화면에서 벗어났을 때 초기화
  useEffect(() => {
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="등록"
        diaryEditorStore={diaryEditorStore}
        dateRangeModal={dateRangeModal}
        addressModal={addressModal}
        loading={loading}
        showDateRangeModal={() => setDateRangeModal(true)}
        closeDateRangeModal={() => setDateRangeModal(false)}
        showAddressModal={() => setAddressModal(true)}
        closeAddressModal={() => setAddressModal(false)}
        setCurrentDay={(day: number) =>
          diaryEditorStore.setDiaryEditor({ currentDay: day })
        }
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default DiaryEditorContainer;

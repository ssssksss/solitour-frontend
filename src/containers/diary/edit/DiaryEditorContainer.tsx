"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryUpdateFormSchema } from "@/lib/zod/schema/DiaryUpdateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { GetDiaryResponseDto, UpdateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  diaryData: GetDiaryResponseDto;
}

const DiaryEditorContainer = ({ diaryData }: Props) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(DiaryUpdateFormSchema),
    defaultValues: {
      userId: authStore.id,
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      address: [""],
      image: "",
      moodLevels: [0],
      contents: [""],
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    const imageUrl =
      parse(methods.getValues("contents")[0])
        .querySelector("img")
        ?.getAttribute("src") ?? "";

    if (imageUrl === "") {
      alert("Day1에 최소 1장의 이미지를 등록해 주세요.");
      return;
    }

    methods.setValue("image", imageUrl);

    if (!methods.formState.isValid) {
      methods.trigger();
      return;
    }

    const { title, image, startDate, endDate, contents, moodLevels, address } =
      methods.getValues();

    const data: UpdateDiaryRequestDto = {
      title: title,
      titleImage: image,
      startDatetime: startDate,
      endDatetime: endDate,
      diaryDayRequests: Array.from(
        { length: diaryEditorStore.days },
        (_, index) => ({
          content: sanitizeHtml(contents[index], sanitizeOption),
          feelingStatus: FEELING_STATUS[moodLevels[index]],
          place: address[index],
        }),
      ),
    };

    setLoading(true);

    const response = await fetch(
      `/api/diary?diaryId=${diaryData.diaryContentResponse.diaryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      alert("일기 수정에 실패하였습니다.");
      setLoading(false);
      throw new Error(response.statusText);
    }

    const diaryId = await response.text();
    router.push(`/diary/${diaryId}`);
    router.refresh();
  };

  useEffect(() => {
    diaryEditorStore.setDiaryEditor({
      days: diaryData.diaryContentResponse.diaryDayContentResponses
        .diaryDayContentDetail.length,
      currentDay: 1,
    });

    methods.setValue("title", diaryData.diaryContentResponse.title);
    methods.setValue(
      "startDate",
      new Date(
        new Date(
          new Date(diaryData.diaryContentResponse.startDatetime).getTime() +
            1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "endDate",
      new Date(
        new Date(
          new Date(diaryData.diaryContentResponse.endDatetime).getTime() +
            1000 * 60 * 60 * 24,
        ).toLocaleDateString("ko-KR"),
      ),
    );
    methods.setValue(
      "address",
      diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
        (value) => value.place,
      ),
    );
    methods.setValue(
      "moodLevels",
      diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
        (value) => Number(FEELING_STATUS[value.feelingStatus]),
      ),
    );
    methods.setValue(
      "contents",
      diaryData.diaryContentResponse.diaryDayContentResponses.diaryDayContentDetail.map(
        (value) => value.content,
      ),
    );

    // 화면에서 벗어났을 때 초기화
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <DiaryEditor
        text="수정"
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

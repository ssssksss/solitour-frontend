"use client";

import DiaryEditor from "@/components/diary/write/DiaryEditor";
import sanitizeOption from "@/constants/common/sanitizeOption";
import { FEELING_STATUS } from "@/constants/diary/feelingStatus";
import { DiaryCreateFormSchema } from "@/lib/zod/schema/DiaryCreateFormSchema";
import useAuthStore from "@/store/authStore";
import useDiaryEditorStore from "@/store/diaryEditorStore";
import { CreateDiaryRequestDto } from "@/types/DiaryDto";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { parse } from "node-html-parser";

const DiaryEditorContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const diaryEditorStore = useDiaryEditorStore();
  const [dateRangeModal, setDateRangeModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO
    e.preventDefault();
    alert("테스트");

    // // Validate from fields using Zod
    // const validatedFields = DiaryCreateFormSchema.safeParse({
    //   userId: authStore.id,
    //   title: diaryEditorStore.title,
    //   startDate: diaryEditorStore.startDate,
    //   endDate: diaryEditorStore.endDate,
    //   address: diaryEditorStore.address,
    //   image:
    //     parse(diaryEditorStore.contents[0])
    //       .querySelector("img")
    //       ?.getAttribute("src") ?? "",
    //   moodLevels: diaryEditorStore.moodLevels,
    //   contents: diaryEditorStore.contents.map((content) =>
    //     sanitizeHtml(content, sanitizeOption),
    //   ),
    // });

    // // If validation fails, return errors early. Otherwise, continue.
    // if (!validatedFields.success) {
    //   alert(validatedFields.error.issues[0].message);
    //   return;
    // }

    // const data: CreateDiaryRequestDto = {
    //   title: validatedFields.data.title,
    //   titleImage: validatedFields.data.image,
    //   startDatetime: validatedFields.data.startDate,
    //   endDatetime: validatedFields.data.endDate,
    //   diaryDayRequests: Array.from(
    //     { length: diaryEditorStore.days },
    //     (_, index) => ({
    //       content: validatedFields.data.contents[index],
    //       feelingStatus: FEELING_STATUS[validatedFields.data.moodLevels[index]],
    //       place: validatedFields.data.address[index],
    //     }),
    //   ),
    // };

    // setLoading(true);

    // const response = await fetch("/api/diary", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    //   cache: "no-store",
    // });

    // if (!response.ok) {
    //   alert("일기 작성에 실패하였습니다.");
    //   setLoading(false);
    //   throw new Error(response.statusText);
    // }

    // const diaryId = await response.text();
    // router.push(`/diary/${diaryId}`);
    // router.refresh();
  };

  // 화면에서 벗어났을 때 초기화
  useEffect(() => {
    return () => {
      diaryEditorStore.initialize();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default DiaryEditorContainer;

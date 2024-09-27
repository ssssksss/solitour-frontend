"use client"

import GatheringApplicantList from "@/components/gathering/read/detail/GatheringApplicantList";
import useAuthStore from "@/store/authStore";
import useGatheringStore from "@/store/gatheringStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams } from "next/navigation";
import { useState } from "react";


interface IGatheringApplicantListContainer {
  postUserId: number;
}

const GatheringApplicantListContainer =
  (props: IGatheringApplicantListContainer) => {
    const authStore = useAuthStore();
    const gatheringStore = useGatheringStore();
    const params = useParams();
    const [sort, setSort] = useState("");
    const [isSortOpen, setIsSortOpen] = useState(false); 

    const updateGatheringApplicantStatusHandler = async (
      status: "WAIT" | "CONSENT" | "REFUSE",
      userId: number,
    ) => {
      const res = await fetchWithAuth(`/api/gathering/apply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          gatheringStatus: status,
          applyId: params.id,
        }),
      });

      if (res.ok) {
        let _prevStatus = "";
        const temp = gatheringStore.gatheringApplicantsResponses.map((i) => {
          if (i.userGatheringResponse.id == userId) {
            _prevStatus = i.gatheringStatus;
            i.gatheringStatus = status;
          }
          return i;
        });
        gatheringStore.setGathering({
          gatheringApplicantsResponses: temp,
          currentParticipants: gatheringStore.currentParticipants + (_prevStatus == "CONSENT" ? -1 : status == "CONSENT" ? +1 : 0)
        })
      }
    };

    const sortHandler = (value: string) => {
      setSort(value);
      setIsSortOpen(false);
    }

    if (props.postUserId == authStore.id && gatheringStore.gatheringApplicantsResponses) {
      return (
        <GatheringApplicantList
          gatheringApplicantsResponses={
            gatheringStore.gatheringApplicantsResponses
          }
          updateGatheringApplicantStatusHandler={
            updateGatheringApplicantStatusHandler
          }
          isFullParticipants={
            gatheringStore.currentParticipants == gatheringStore.personCount
          }
          sort={sort}
          sortHandler={sortHandler}
          setIsSortOpen={setIsSortOpen}
          isSortOpen={isSortOpen}
          isFinish={gatheringStore.isFinish}
        />
      );
    }

    return <></>;

  };
export default GatheringApplicantListContainer
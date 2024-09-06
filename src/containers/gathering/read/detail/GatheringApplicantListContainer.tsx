"use client"

import GatheringApplicantList from "@/components/gathering/read/detail/GatheringApplicantList";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams } from "next/navigation";
import { useState } from "react";


interface IApplicant {
  userGatheringResponse: {
    profileUrl: string;
    nickname: string;
    age: number;
    sex: "male" | "female";
    id: number;
  };
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE";
}

interface IGatheringApplicantListContainer {
  postUserId: number;
  applicants: IApplicant[];
}

const GatheringApplicantListContainer =
  (props: IGatheringApplicantListContainer) => {
    const authStore = useAuthStore();
    const [applicants, setApplicants] = useState(props.applicants);
    const params = useParams();

    
    const updateGatheringApplicantStatus = async (
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
        const temp = applicants.map((i) => {
          if (i.userGatheringResponse.id == userId) {
            i.gatheringStatus = status;
          }
          return i;
        });
        setApplicants(temp);
      }
    };

    if (props.postUserId == authStore.id && applicants) {
      return <GatheringApplicantList applicants={applicants} updateGatheringApplicantStatus={updateGatheringApplicantStatus} />
    }

    return <></>;

  };
export default GatheringApplicantListContainer
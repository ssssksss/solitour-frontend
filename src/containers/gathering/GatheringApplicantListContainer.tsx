"use client"

import GatheringApplicantList from "@/components/gathering/GatheringApplicantList";
import useAuthStore from "@/store/authStore";


interface IApplicant {
  userGatheringResponse: {
    profileUrl: string;
    nickname: string;
    age: number;
    sex: "male" | "female";
  };
  gatheringStatus: "WAIT" | "CONSENT" | "REFUSE";
}

interface IGatheringApplicantListContainer {
  postUserId: number;
  applicants: IApplicant[];
}

const GatheringApplicantListContainer =
  ({postUserId, applicants}: IGatheringApplicantListContainer) => {
    const authStore = useAuthStore();
    if (postUserId == authStore.id) {
      return <GatheringApplicantList applicants={applicants} />
    }

    return <></>;
  };
export default GatheringApplicantListContainer
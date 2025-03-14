interface GatheringInfo {
  gatheringId: number;
  title: string;
  zoneCategoryParentName: string;
  zoneCategoryChildName: string;
  viewCount: number;
  isBookMark: boolean;
  likeCount: number;
  gatheringCategoryName: string;
  nickname: string;
  scheduleStartDate: string;
  scheduleEndDate: string;
  deadline: string;
  allowedSex: string;
  startAge: number;
  endAge: number;
  personCount: number;
  nowPersonCount: number;
  isLike: boolean;
}

export async function getNewGatheringList() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return response.json() as Promise<GatheringInfo[]>;
}

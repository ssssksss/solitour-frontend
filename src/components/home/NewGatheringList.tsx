import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItemHome from "../common/GatheringItemHome";

async function getNewGatheringList() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/gatherings/home`,
    {
      method: "GET",
      next: { revalidate: 60, tags: ["getNewGatheringList"] },
    },
  );

  if (!response.ok) {
    // This will activate the closest 'error.tsx' Error Boundary.
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

const NewGatheringList = async () => {
  const elements: GatheringRecommend[] = await getNewGatheringList();

  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:w-[120.6rem] max-[744px]:grid-cols-6 max-[744px]:grid-rows-1">
      {elements?.map((data, index) => (
        <GatheringItemHome key={index} data={data} />
      ))}
    </div>
  );
};

export default NewGatheringList;

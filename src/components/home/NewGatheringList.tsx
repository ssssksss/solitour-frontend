
// async function getNewGatheringList() {
//   const response = await fetch(
//     `${process.env.BACKEND_URL}/api/greatGathering`,
//     {
//       method: "GET",
//       next: { revalidate: 60, tags: ["getNewGatheringList"] },
//     },
//   );

//   if (!response.ok) {
//     // This will activate the closest 'error.tsx' Error Boundary.
//     throw new Error("Failed to fetch data");
//   }

//   return response.json() as Promise<GatheringResponseDto>;
// }

const NewGatheringList = async () => {
  // const data = await getNewGatheringList();

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="mt-6 flex w-fit flex-wrap items-center justify-center gap-3 max-[755px]:flex-row max-[755px]:flex-nowrap min-[756px]:grid min-[756px]:grid-cols-2 min-[756px]:w-full">
      {/* {data.map((post, index) => (
        <GatheringItem
          key={index}
          id={index + 1}
          {...post}
        />
      ))} */}
    </div>
  );
};

export default NewGatheringList;

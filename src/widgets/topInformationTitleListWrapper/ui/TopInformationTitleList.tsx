import { getTopInformationTitleList } from "@/entities/information";
import { TopTitleList } from "@/shared/ui/topTitleList";

export const TopInformationTitleList = async () => {
  const topInformationTitleList = await getTopInformationTitleList();

  return (
    <div className="-mt-28 w-full max-[1024px]:-mt-24">
      <TopTitleList
        title="여행"
        href="informations"
        topTitleList={topInformationTitleList}
      />
    </div>
  );
};

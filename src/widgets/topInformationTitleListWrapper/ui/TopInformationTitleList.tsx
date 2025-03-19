import { getTopInformationTitleList } from "@/entities/information";
import { TopTitleList } from "@/shared/ui/topTitleList";

export const TopInformationTitleList = async () => {
  const topInformationTitleList = await getTopInformationTitleList();

  return (
    <TopTitleList
      title="여행"
      href="informations"
      topTitleList={topInformationTitleList}
    />
  );
};

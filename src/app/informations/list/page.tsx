import { InformationCategoryListWrapper } from "@/widgets/informationCategoryListWrapper";
import { InformationList } from "@/widgets/informationList";

export default async function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <InformationCategoryListWrapper />
      <InformationList />
    </div>
  );
}

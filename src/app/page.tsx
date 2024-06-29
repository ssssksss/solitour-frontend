import TabList from "@/components/home/TabList";
import BestInformationListContainer from "@/containers/home/BestInformationListContainer";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import NewMeetingListContainer from "@/containers/home/NewMeetingListContainer";

// todo
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeCarouselContainer />
      <TabList />
      <BestInformationListContainer />
      <NewMeetingListContainer />
    </div>
  );
}

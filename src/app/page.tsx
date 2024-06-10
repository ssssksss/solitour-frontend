import BestInformationList from "@/components/home/BestInformationList";
import NewMeetingList from "@/components/home/NewMeetingList";
import TabList from "@/components/home/TabList";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";

// todo
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeCarouselContainer />
      <TabList />
      <BestInformationList />
      <NewMeetingList />
    </div>
  );
}

import PopularList from "@/components/home/PopularList";
import TabList from "@/components/home/TabList";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import HomeHeaderContainer from "@/containers/home/HomeHeaderContainer";

// todo
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeHeaderContainer />
      <HomeCarouselContainer />
      <TabList />
      <PopularList />
    </div>
  );
}

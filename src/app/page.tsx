import PopularList from "@/components/home/PopularList";
import TabList from "@/components/home/TabList";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";

// todo
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeCarouselContainer />
      <TabList />
      <PopularList />
    </div>
  );
}

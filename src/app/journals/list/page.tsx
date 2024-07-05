import JournalList from "@/components/journals/JournalList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "여행일기",
  description: "Solitour 여행일기 페이지",
};

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <JournalList />
    </div>
  );
}

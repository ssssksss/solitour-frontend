"use client";

import NewMeetingList from "@/components/home/NewMeetingList";
import useDragScroll from "@/hooks/useDragScroll";

const NewMeetingListContainer = () => {
  const scrollHook = useDragScroll();

  return <NewMeetingList scrollHook={scrollHook} />;
};

export default NewMeetingListContainer;

"use client";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Image from "next/image";
import { useState } from "react";

interface IGatheringBookmark {
  isBookmarked: boolean;
}

const GatheringBookmark = (props: IGatheringBookmark) => {
  const { id: userId } = useAuthStore();
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);

    const newIsBookmarked = !isBookmarked;

    setIsBookmarked(newIsBookmarked);

    try {
      const response = await fetchWithAuth("/api/bookmark/gathering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBookmarked: newIsBookmarked }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsBookmarked(isBookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      disabled={loading || userId < 1}
      className={`${userId > 0 ? "hover:scale-125" : "cursor-default"} flex flex-row items-center gap-1 text-sm ${loading ? "text-gray-400" : "text-gray-600"}`}
    >
      <div className="relative h-4 w-4 text-white">
        {isBookmarked ? (
          <Image
            src="/common/bookmark-active-icon.svg"
            alt="bookmark-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src="/common/bookmark-empty-icon.svg"
            alt="bookmark-icon"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
    </button>
  );
};

export default GatheringBookmark;

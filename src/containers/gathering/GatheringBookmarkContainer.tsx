"use client";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Image from "next/image";
import { useState } from "react";

interface IGatheringBookMarkContainer {
    isBookMark: boolean;
    postId: number;
}

const GatheringBookMarkContainer = (props: IGatheringBookMarkContainer) => {
    const { id: userId } = useAuthStore();
    const [isBookMark, setIsLike] = useState(props.isBookMark);
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        if (loading) return;
        e.preventDefault();
        setLoading(true);
        
        const newIsLike = !isBookMark;
        setIsLike(newIsLike);
        
        try {
            const response = await fetchWithAuth("/api/bookmark/gathering", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: props.postId }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            setIsLike(isBookMark);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={`${userId < 1 && `cursor-default`}  relative h-7 w-5`}
            onClick={userId > 0 ? handleClick : undefined}
            disabled={loading}
            >
                {props.isBookMark ? (
                <Image
                    src="/gathering/bookmark-active-icon.svg"
                    alt="bookmark-icon"
                    fill={true}
                    style={{
                    objectFit: "contain",
                    }}
                    />
                ) : (
                <Image
                src="/gathering/bookmark-empty-icon.svg"
                    alt="bookmark-icon"
                    fill={true}
                    style={{
                    objectFit: "contain",
                    }}
                />
            )}
            </button>
    );
};

export default GatheringBookMarkContainer;

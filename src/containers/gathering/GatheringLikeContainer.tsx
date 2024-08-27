"use client";
import GatheringLike from "@/components/gathering/write/GatheringLike";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";

interface IGatheringLikeContainer {
    likes: number;
    isLike: boolean;
    gatheringId: number;
}

const GatheringLikeContainer = (props: IGatheringLikeContainer) => {
    const { id: userId } = useAuthStore();
    const [isLike, setIsLike] = useState(props.isLike);
    const [likes, setLikes] = useState(props.likes);
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        if (loading) return;
        e.preventDefault();
        setLoading(true);
        
        const newIsLike = !isLike;
        const newLikes = newIsLike ? likes + 1 : likes - 1;
        
        setIsLike(newIsLike);
        setLikes(newLikes);
        
        try {
            const response = await fetchWithAuth('/api/gathering/like', {
                method: 'POST',
                body: JSON.stringify({ id: props.gatheringId })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            setIsLike(isLike);
            setLikes(likes);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GatheringLike
            {...props}
            loading={loading}
            userId={userId}
            handleClick={handleClick}
        />
    );
};

export default GatheringLikeContainer;

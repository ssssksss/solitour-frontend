import GatheringSupportManagement from "@/components/gathering/GatheringSupportManagement";
import useAuthStore from "@/store/authStore";
import { useParams } from "next/navigation";

interface IGatheringSupportManagementContainer {
    postUserId: number;
}
const GatheringSupportManagementContainer = ({
  postUserId,
}: IGatheringSupportManagementContainer) => {
    const authStore = useAuthStore();
    const params = useParams();
    
    const applyGathering = async () => {
        const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
            method: "POST"
        })
    }

    const cancelGathering = async () => {
        const res = await fetch(`/api/gathering/apply?id=${params.id}`, {
          method: "DELETE",
        });
    }

    return (
      <GatheringSupportManagement
        postUserId={postUserId}
        userId={authStore.id}
        applyGathering={applyGathering}
        cancelGathering={cancelGathering}
      />
    );
};
export default GatheringSupportManagementContainer
"use client";

import InformationViewer from "@/components/informations/detail/InformationViewer";
import useAuthStore from "@/store/authStore";

interface Props {
  informationId: number;
}

const InformationViewerContainer = ({ informationId }: Props) => {
  const { id } = useAuthStore();

  return <InformationViewer informationId={informationId} userId={id} />;
};

export default InformationViewerContainer;

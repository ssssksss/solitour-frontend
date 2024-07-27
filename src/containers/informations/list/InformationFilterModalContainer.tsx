"use client";

import InformationFilterModal from "@/components/informations/list/InformationFilterModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

const InformationFilterModalContainer = ({ closeModal }: Props) => {
  const [place, setPlace] = useState<string>(
    useSearchParams().get("place") ?? "",
  );
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`${pathname}?page=1&place=${place}`, { scroll: false });
    closeModal();
  };

  return (
    <InformationFilterModal
      place={place}
      setPlace={setPlace}
      closeModal={closeModal}
      onClick={onClick}
    />
  );
};

export default InformationFilterModalContainer;

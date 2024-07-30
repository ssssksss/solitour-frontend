"use client";

import InformationFilterModal from "@/components/informations/list/InformationFilterModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

const InformationFilterModalContainer = ({ closeModal }: Props) => {
  const searchParams = useSearchParams();
  const [place, setPlace] = useState<string>(searchParams.get("place") ?? "");
  const order = searchParams.get("order") ?? "latest";
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`${pathname}?page=1&place=${place}&order=${order}`, {
      scroll: false,
    });
    closeModal();
  };

  return (
    <InformationFilterModal
      place={place}
      order={order}
      setPlace={setPlace}
      closeModal={closeModal}
      onClick={onClick}
    />
  );
};

export default InformationFilterModalContainer;

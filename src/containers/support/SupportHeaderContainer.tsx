"use client"

import { useSearchParams } from "next/navigation";
import SupportHeader from "../../components/support/SupportHeader";
import SupportBodyContainer from "./SupportBodyContainer";

interface ISupportHeaderContainer {

}
const SupportHeaderContainer = (props: ISupportHeaderContainer) => {

    const searchParams = useSearchParams();

    return (
      <div>
        <SupportHeader active={searchParams.get("menu")} />
        <SupportBodyContainer active={searchParams.get("menu")} />
      </div>
    );
};
export default SupportHeaderContainer
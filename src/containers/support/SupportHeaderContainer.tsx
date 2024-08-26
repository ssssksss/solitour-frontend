"use client"

import { useSearchParams } from "next/navigation";
import SupportHeader from "../../components/support/SupportHeader";
import SupportBodyContainer from "./SupportBodyContainer";

interface ISupportHeaderContainer {

}
const SupportHeaderContainer = (props: ISupportHeaderContainer) => {

    const searchParams = useSearchParams();
    const tabs = [
      { name: "서비스소개", value: "about" },
      { name: "공지사항", value: "notice" },
      { name: "자주 묻는 질문", value: "faq" },
      { name: "Q&A", value: "qna" },
      { name: "문의하기", value: "contact" },
      { name: "약관/정책", value: "terms" },
    ];

    return (
      <div>
        <SupportHeader tabs={tabs} active={searchParams.get("menu")} />
        <SupportBodyContainer active={searchParams.get("menu")} />
      </div>
    );
};
export default SupportHeaderContainer
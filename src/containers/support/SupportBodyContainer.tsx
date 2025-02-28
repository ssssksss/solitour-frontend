import SupportAbout from "@/components/support/about/SupportAbout";
import SupportNoticeContainer from "./SupportNoticeContainer";
import SupportFAQList from "@/components/support/SupportFAQList";
import SupportTerms from "@/components/support/SupportTerms";

interface ISupportBodyContainer {
  active: string | null;
}
const SupportBodyContainer = ({ active }: ISupportBodyContainer) => {
  return (
    <>
      {active == "about" && <SupportAbout />}
      {active == "notice" && <SupportNoticeContainer />}
      {active == "faq" && <SupportFAQList />}
      {active == "terms" && <SupportTerms />}
    </>
  );
};
export default SupportBodyContainer;

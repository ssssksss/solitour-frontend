import SupportAboutContainer from "./SupportAboutContainer";
import SupportContactContainer from "./SupportContactContainer";
import SupportFAQContainer from "./SupportFAQContainer";
import SupportNoticeContainer from "./SupportNoticeContainer";
import SupportQnAContainer from "./SupportQnAContainer";
import SupportTermsContainer from "./SupportTermsContainer";



interface ISupportBodyContainer {
    active: string | null;
}
const SupportBodyContainer = ({active}: ISupportBodyContainer) => {
  return (
      <>
        {
          active == "about" && <SupportAboutContainer />
        }
        {
        active == "notice" && <SupportNoticeContainer />
        }
        {
          active == "faq" && <SupportFAQContainer />
        }
        {
          active == "qna" && <SupportQnAContainer />
        }
        {
          active == "terms" && <SupportTermsContainer />
        }
        {
          active == "contact" && <SupportContactContainer />
        }
      </>
  );
};
export default SupportBodyContainer
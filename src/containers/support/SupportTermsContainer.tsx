import SupportTerms from "@/components/support/SupportTerms";
import { useEffect } from "react";

interface ISupportTermsContainer {

}
const SupportTermsContainer = (props: ISupportTermsContainer) => {

  useEffect(() => {
    // 페이지가 로드된 후 URL의 해시를 감지
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // `#` 제거
      if (element) {
        // 요소를 뷰포트에 부드럽게 스크롤
        element.scrollIntoView({ behavior: "smooth" });

        // 요소의 위치를 얻어서 60px 위로 스크롤 조정
        const offset = 90;
        const elementTop = element.getBoundingClientRect().top;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        window.scrollTo({
          top: scrollTop + elementTop - offset,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <SupportTerms />
  );
};
export default SupportTermsContainer

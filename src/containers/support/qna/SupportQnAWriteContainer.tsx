"use client"

import SupportQnAWrite from "@/components/support/qna/SupportQnAWrite";

interface ISupportQnAWriteContainer {

}
const SupportQnAWriteContainer = (props: ISupportQnAWriteContainer) => {

    const submitHandle = (value: string) => {
    }

  return <SupportQnAWrite onSubmit={submitHandle} />;
};
export default SupportQnAWriteContainer
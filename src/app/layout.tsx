import Footer from "@/components/common/Footer";
import FloatingButtonContainer from "@/containers/common/FloatingButtonContainer";
import HeaderContainer from "@/containers/common/HeaderContainer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";

const notoSansKr = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Solitour | %s",
    default: "Solitour - 새로운 나를 찾는 여행",
  },
  description: "Solitour",
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={"h-full"}>
      <meta
        name="google-site-verification"
        content="4uK8QzlAEyT9nriZXww7-TpyUEm5Pgz6FAbEBy0F4_4"
      />
      <meta
        name="naver-site-verification"
        content="4da70e879bd32d934e1a503b1a86d3e3cae4e0a3"
      />
      {/* <body className={`${notoSansKr.className} flex h-full flex-col`}> */}
      <body className={`flex h-full flex-col`}>
        <HeaderContainer />
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[60rem] flex-col items-center max-[1024px]:w-full max-[1024px]:px-[3.375rem] max-[744px]:px-6">
            {children}
          </div>
        </div>

        <Footer />
        <FloatingButtonContainer />
        <div id="modal-root"></div>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

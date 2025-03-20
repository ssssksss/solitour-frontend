import ReactToastifyComponent from "@/components/common/ReactToastifyComponent";
import "./globals.css";
import { FloatingButton } from "@/widgets/floatingButton";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.solitourist.com"),
  title: {
    template: "Solitour | %s",
    default: "Solitour - 새로운 나를 찾는 여행",
  },
  description:
    "Solitour(솔리투어)는 사용자들이 여행한 정보를 기록하고 공유하여 정보나 팁 등을 이미지와 함께 제공하거나, 사용자들이 모임 기간, 모임 마감일, 성별, 나이, 장소, 참여 인원 등을 설정하여 모임을 등록하고, 모임에 신청할 수 있는 서비스를 제공합니다. 또한 본인의 여행 기록을 남길 수 있는 서비스도 제공합니다.",
  keywords: [
    "Solitour",
    "Solitourist",
    "솔리투어",
    "여행",
    "정보",
    "모임",
    "일기",
    "여행일기",
  ],
  openGraph: {
    title: "Solitour - 새로운 나를 찾는 여행",
    description:
      "Solitour(솔리투어)는 사용자들이 여행한 정보를 기록하고 공유하여 정보나 팁 등을 이미지와 함께 제공하거나, 사용자들이 모임 기간, 모임 마감일, 성별, 나이, 장소, 참여 인원 등을 설정하여 모임을 등록하고, 모임에 신청할 수 있는 서비스를 제공합니다. 또한 본인의 여행 기록을 남길 수 있는 서비스도 제공합니다.",
    url: "https://www.solitourist.com/",
    siteName: "솔리투어",
    images: [
      {
        url: "/images/carousel-image1.avif",
        width: 1440,
        height: 600,
        alt: "솔리투어 메인 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
    <html lang="ko" className="h-full">
      <meta
        name="google-site-verification"
        content="3mtzBvqxMZ31vvaa0SmQaIJEiY6HUHLnyMqM5qGZvVU"
      />
      <meta
        name="naver-site-verification"
        content="f3050a18a497b05cce9e8a446425f3182c3c368b"
      />
      <body className="flex h-full flex-col">
        <ReactToastifyComponent />
        <Header />
        <div className="flex w-full items-center justify-center">
          <div className="flex w-[60rem] flex-col items-center max-[1024px]:w-full max-[1024px]:px-[3.375rem] max-[744px]:px-6">
            {children}
          </div>
        </div>
        <Footer />
        <FloatingButton />
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

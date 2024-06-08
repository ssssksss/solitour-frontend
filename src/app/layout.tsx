import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import FloatingButtonContainer from "@/containers/common/FloatingButtonContainer";
import Footer from "@/components/common/Footer";
import HeaderContainer from "@/containers/common/HeaderContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Solitour | %s",
    default: "Solitour - 새로운 나를 찾는 여행",
  },
  description: "Solitour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <HeaderContainer />
        {children}
        <Footer />
        <FloatingButtonContainer />
      </body>
    </html>
  );
}

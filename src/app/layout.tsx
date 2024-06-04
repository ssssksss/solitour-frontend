import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import FloatingButtonContainer from "@/containers/common/FloatingButtonContainer";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Solitour | %s",
    default: "Solitour - 나 혼자 여행자를 위한 공간",
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
        {children}
        <Footer />
        <FloatingButtonContainer />
      </body>
    </html>
  );
}

import HeaderContainer from "@/containers/common/HeaderContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderContainer />
      {children}
    </div>
  );
}

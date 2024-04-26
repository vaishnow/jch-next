import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japan Career Hub",
  description:
    "Japan Career Hub is a frontend project on the theme work opportunities in japan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

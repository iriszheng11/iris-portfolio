import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iris - Designer Portfolio",
  description:
    "Iris 是一名专注于 Web3、金融科技和内容社区产品的 UI/UX Designer。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

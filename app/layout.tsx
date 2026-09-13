import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://iris-designer-portfolio.iris6208.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Iris — Designing Digital Worlds",
  description:
    "Iris 是一名专注于 Web3、金融科技和内容社区产品的 UI/UX Designer，把复杂系统变成清晰、有趣、值得信任的数字体验。",
  openGraph: {
    title: "Iris — Designing Digital Worlds",
    description: "Product Designer · Web3 · Fintech",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Iris — Digital Worlds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iris — Designing Digital Worlds",
    description: "Product Designer · Web3 · Fintech",
    images: ["/og.png"],
  },
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

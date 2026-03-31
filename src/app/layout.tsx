import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "myTabi | インバウンド旅行インフルエンサー",
  description:
    "日本の魅力を世界へ届ける。SNSを活用したインバウンド観光PRで、訪日旅行者の「行きたい」を創ります。",
  openGraph: {
    title: "myTabi | インバウンド旅行インフルエンサー",
    description:
      "日本の魅力を世界へ届ける。SNSを活用したインバウンド観光PRで、訪日旅行者の「行きたい」を創ります。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream-50 text-bark-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

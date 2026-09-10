import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelly Feng — Software Engineer",
  icons: { icon: `${process.env.PAGES_BASE_PATH || ""}/icon.svg` },
  description:
    "Hey, I’m Kelly. I build web apps, AI agents, and the bits that connect them. Based in Toronto. Here’s some of my work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

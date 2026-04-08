import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TopNav } from "@/components/top-nav";
import { getSessionViewer } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dayboard",
  description: "Personal operating system for goals, lists, mind, body, and finance.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=5", sizes: "any" },
      { url: "/icon.svg?v=5", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=5",
    apple: "/apple-icon.png?v=5",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const viewer = await getSessionViewer();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5efe4] text-slate-950">
        <TopNav viewer={viewer} />
        {children}
      </body>
    </html>
  );
}

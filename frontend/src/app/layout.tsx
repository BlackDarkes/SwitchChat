import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { AppProviders } from "./providers/AppProviders";
import { cn } from "@/shared/lib/utils";

import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwitchChat",
  description: "SwitchChat is a new way to chat with your friends!",
  icons: {
    icon: "/favicon.png",
  },
  authors: [
    {
      name: "DaniilGorgeev(BlackDarkes)",
      url: "https://github.com/BlackDarkes",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

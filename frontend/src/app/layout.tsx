import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";

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

export default function RootLayout({
  children,
  chats,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  chats: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="light">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <main className="flex max-h-screen h-screen max-w-screen w-screen">
            <section className="shrink-0 w-[clamp(400px,45vw,760px)] bg-primary-bg border-r-2 border-border-color max-md:w-full">
              {children}
              <div>{chats}</div>
            </section>

            <aside className="w-[max(100%,1160px)] bg-accent-bg max-md:hidden">{sidebar}</aside>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

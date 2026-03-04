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
            <section className="w-[clamp(300px,45vw,760px)] shrink-0">
              {children}
              <div>{chats}</div>
            </section>

            <aside className="w-[max(100%,1160px)]">{sidebar}</aside>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

export default function MainLayout({
  children,
  chats,
  messages,
}: {
  children: React.ReactNode;
  chats: React.ReactNode;
  messages: React.ReactNode;
}) {
  return (
    <main className="flex max-h-screen h-screen max-w-screen w-screen overflow-hidden">
      <section className="shrink-0 w-[clamp(400px,45vw,760px)] bg-primary-bg border-r-2 border-border-color max-md:w-full">
        {children}
        <div className="h-[calc(100%-clamp(83px,10vh,86px))]">{chats}</div>
      </section>

      {/* <aside className="flex flex-col justify-between w-[max(100%,1160px)] max-h-screen bg-accent-bg max-md:hidden"> */}
      <aside className="flex flex-col justify-between w-[max(100%,1160px)] max-h-screen bg-accent-bg max-md:fixed max-md:top-0 max-md:right-0 max-md:w-full max-md:h-full ">
        {messages}
      </aside>
    </main>
  );
}

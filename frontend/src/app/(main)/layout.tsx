export default function MainLayout({
  children,
  chats,
  sidebar,
}: {
  children: React.ReactNode;
  chats: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main className="flex max-h-screen h-screen max-w-screen w-screen">
      <section className="shrink-0 w-[clamp(400px,45vw,760px)] bg-primary-bg border-r-2 border-border-color max-md:w-full">
        {children}
        <div>{chats}</div>
      </section>

      <aside className="w-[max(100%,1160px)] bg-accent-bg max-md:hidden">
        {sidebar}
      </aside>
    </main>
  );
}

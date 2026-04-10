import { Toaster } from "sonner";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" closeButton={true} duration={5000} />
    </>
  );
}

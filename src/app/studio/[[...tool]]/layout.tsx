export const metadata = {
  title: "Sanity Studio | Wenche Veileder",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100]">
      {children}
    </div>
  );
}

export const metadata = {
  title: "Opto Diode CMS Studio",
  description: "Content management studio for Opto Diode Corporation website",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

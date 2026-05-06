export const metadata = {
  title: 'Festag - Software development, made structured.',
  description: 'A system for building software with clarity and visibility.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

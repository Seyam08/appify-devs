import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Appify Admin Dashboard",
  description: "Responsive analytics dashboard with KPIs, charts, filters, and production-ready UI patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}

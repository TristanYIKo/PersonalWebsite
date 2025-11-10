import type { Metadata } from "next";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Tristan Ko - Portfolio",
  description: "Personal portfolio website showcasing projects and work experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StickyHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}

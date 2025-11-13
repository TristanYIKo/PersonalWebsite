import type { Metadata } from "next";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationProvider } from "@/components/navigation-wrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Tristan Ko - Portfolio",
  description: "Personal portfolio website showcasing projects and work experience",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo.png" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <link rel="shortcut icon" href="/assets/logo.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavigationProvider>
            <StickyHeader />
            {children}
            <Footer />
          </NavigationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

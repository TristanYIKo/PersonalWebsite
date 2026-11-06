import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tristan Ko — Portfolio",
  description:
    "Management Engineering student at the University of Waterloo. Projects and experience across data, software, and analytics.",
  icons: {
    icon: "/assets/Logo.png",
    shortcut: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* A refresh always starts at the top. Only on a refresh (so a shared link to /#projects
            still lands on Projects when first opened): stop the browser restoring the old scroll
            position, drop any #section from the address, and put the page back at the top once the
            browser has finished its own jump to that section, unless the visitor has already
            started scrolling. */}
        <Script id="start-at-top" strategy="beforeInteractive">
          {`try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){history.scrollRestoration="manual";if(location.hash){history.replaceState(null,"",location.pathname+location.search)}var stop=false,up=function(){if(!stop)window.scrollTo({top:0,left:0,behavior:"instant"})};["wheel","touchstart","keydown","mousedown"].forEach(function(t){addEventListener(t,function(){stop=true},{once:true,passive:true})});up();addEventListener("DOMContentLoaded",up);addEventListener("load",function(){up();setTimeout(up,0);setTimeout(up,150)})}}catch(e){}`}
        </Script>
        {/* The scroll-triggered pieces start hidden and are revealed by script; without it, show everything. */}
        <noscript>
          <style>{".sx,.fall{opacity:1!important}"}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

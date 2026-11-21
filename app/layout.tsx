import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import TopBar from "./components/TopBar";
import Terminal from "./components/Terminal";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Anh, Product",
    template: "Anh, %s",
  },
  description:
    "Anh Nguyen works in product at Zalopay and builds the tech talents program at Project X Vietnam.",
  authors: [{ name: "Anh Nguyen" }],
  openGraph: {
    title: "Anh — product, payments & growth",
    description: "Zalopay and Project X Vietnam.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0e56fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1128" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("anh.docked")==="1")document.documentElement.dataset.docked="1"}catch(e){}try{var t=localStorage.getItem("anh.theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.landing,.float-dock{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">
          skip to content
        </a>
        <TopBar />
        <Terminal />
        <main id="main" className="wrap">
          {children}
        </main>
        <footer className="wrap foot">
          <span>© {new Date().getFullYear()} Anh Nguyen</span>
          <span>Brisbane · Ho Chi Minh City</span>
        </footer>
      </body>
    </html>
  );
}

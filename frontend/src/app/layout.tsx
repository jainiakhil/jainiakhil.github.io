import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fredoka } from "next/font/google";
import { ThemeProvider } from "src/components/providers/ThemeProvider";
import { AnimationProvider } from "src/components/providers/AnimationProvider";
import LaserFireflyCursor from "src/components/ui/LaserFireflyCursor";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akhil Jaini — Stargazer & Astrophysicist",
  description: "A personal corner of the web where I share my research on the night sky, the code I write, and the places I've been.",
  keywords: ["Akhil Jaini", "Astrophysics", "Night Sky", "Research", "FRB", "Creative Engineering"],
  authors: [{ name: "Akhil Jaini" }],
  openGraph: {
    title: "Akhil Jaini — Stargazer & Astrophysicist",
    description: "A dreamy personal portfolio sharing astrophysical research, code, and adventures under the stars.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhil Jaini — Astrophysicist",
    description: "A dreamy personal portfolio sharing astrophysical research, code, and adventures under the stars.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${fredoka.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <AnimationProvider>
            {children}
            <LaserFireflyCursor />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

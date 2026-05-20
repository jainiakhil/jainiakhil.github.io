import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fredoka } from "next/font/google";
import { ThemeProvider } from "src/components/providers/ThemeProvider";
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
  title: "Voyaging the Cosmos — Portfolio of an Astrophysicist & Engineer",
  description: "A highly interactive, space-themed personal portfolio showcasing astrophysical research projects, scientific publications, astronomical calculations, and creative engineering code.",
  keywords: ["Astrophysics", "Space Engineering", "FRB Research", "Data Visualization", "Fullstack Engineer", "Research Portfolio"],
  authors: [{ name: "Astrophysicist & Engineer Portfolio" }],
  openGraph: {
    title: "Voyaging the Cosmos — Portfolio of an Astrophysicist & Engineer",
    description: "An immersive, playful, yet professional portfolio showcasing stellar research and software systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmos Voyager — Astrophysics Portfolio",
    description: "An immersive digital voyage through transient searches, orbital engineering, and web development.",
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
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

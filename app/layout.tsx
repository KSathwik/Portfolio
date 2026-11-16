import type { Metadata } from "next";
import { Caveat, Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  style: "normal",
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/* Handwriting, used sparingly: margin notes, the banner sketch, photo captions. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://portfolio-sathwik-k.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Sathwik Katkam — Software Engineer, AI & Backend",
  description:
    "I build Python backends and retrieval systems that hold up in production: RAG pipelines, multi-agent workflows and the FastAPI services around them.",
  keywords: [
    "Sathwik Katkam",
    "Software Engineer",
    "Backend Developer",
    "Generative AI",
    "RAG",
    "LangChain",
    "Python",
    "FastAPI",
    "React",
    "Next.js",
    "Azure",
  ],
  authors: [{ name: "Sathwik Katkam" }],
  creator: "Sathwik Katkam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sathwik Katkam — Software Engineer, AI & Backend",
    description:
      "Python backends and retrieval systems that hold up in production: RAG pipelines, multi-agent workflows and FastAPI services.",
    siteName: "Sathwik Katkam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathwik Katkam — Software Engineer, AI & Backend",
    description:
      "Python backends and retrieval systems that hold up in production: RAG pipelines, multi-agent workflows and FastAPI services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sathwik Katkam",
              url: SITE_URL,
              image: `${SITE_URL}/images/sathwik-portrait.jpg`,
              email: "mailto:sathwikkatkam@gmail.com",
              jobTitle: "Associate Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Primesoft Solutions Pvt Ltd",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "ACE Engineering College",
              },
              sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

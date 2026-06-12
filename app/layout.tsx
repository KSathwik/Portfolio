import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sathwik Katkam | Associate Software Engineer",
  description:
    "Associate Software Engineer specializing in Backend Development, Generative AI, RAG, and Enterprise Applications. Building AI-powered solutions with Python, FastAPI, LangChain, and Cloud Technologies.",
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
    url: "https://sathwikkatkam.dev",
    title: "Sathwik Katkam | Associate Software Engineer",
    description:
      "Associate Software Engineer specializing in Backend Development, Generative AI, and Enterprise Applications.",
    siteName: "Sathwik Katkam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathwik Katkam | Associate Software Engineer",
    description:
      "Associate Software Engineer specializing in Backend Development, Generative AI, and Enterprise Applications.",
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sathwik Katkam",
              url: "https://sathwikkatkam.dev",
              jobTitle: "Associate Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Primesoft Solutions Pvt Ltd",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "ACE Engineering College",
              },
              sameAs: [
                "https://github.com/KSathwik",
                "https://linkedin.com/in/katkam-sathwik-5b5285202",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

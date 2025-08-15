import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  display: "swap",
});

const SITE_URL = "https://temp-mailr.com/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TempMailr — Free Temporary Disposable Email",
  description:
    "Generate free temporary email addresses instantly to protect your privacy. No signup required. Inbox auto-refresh.",
  keywords: [
    "temporary email",
    "disposable email",
    "temp mail",
    "tempmailr",
    "mail.tm",
    "fake email",
    "anonymous email",
    "throwaway email",
    "burner email",
    "temp email generator",
    "one-time email",
    "secure temporary email",
    "free temp mail",
    "temporary inbox",
    "spam protection email",
    "receive email online",
    "free disposable email",
    "online temp email",
    "private temp email",
    "temporary email service",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "TempMailr — Free Temporary Email",
    description:
      "Generate free temporary email addresses instantly. Protect your privacy with disposable inboxes.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "TempMailr" },
    ],
    siteName: "TempMailr",
  },
  twitter: {
    card: "summary_large_image",
    title: "TempMailr — Free Temporary Email",
    description:
      "Generate free temporary email addresses instantly. No signup.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: {
    google: "", // Add Google Search Console code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TempMailr",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-gray-50 text-gray-900">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}

        {/* Schema.org JSON-LD */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}

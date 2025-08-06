import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Medagent.pl - Ubezpieczenie OC Lekarza online ",
  description:
    "Szukasz sprawdzonego rozwiązania w zakresie ubezpieczenia OC Lekarza? Polisa OnLine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="dns-prefetch" href="//cloudflare.com" />
      <link rel="dns-prefetch" href="//challenges.cloudflare.com" />
      <link
        rel="preconnect"
        href="https://cloudflare.com"
        crossOrigin="use-credentials"
      />
      <link
        rel="preconnect"
        href="https://challenges.cloudflare.com"
        crossOrigin="use-credentials"
      />
      {/* Cloudflare CAPTCHA */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      {/* Google Tag Manager */}

      <link
        rel="preconnect"
        href="https://www.googletagmanager.com"
        crossOrigin="use-credentials"
      />

      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <Script id="googletagmanager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env["NEXT_PUBLIC_GTM"]}');`}
      </Script>

      <body className={`bg-white`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ProgressProvider } from "../components/ProgressProvider";
import MyKitButton from "../components/MyKitButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uxvault.in"),
  title: {
    default: "UX Process Vault – UX Templates, Kits & Guided Workflows",
    template: "%s | UX Process Vault"
  },
  description:
    "Find production-ready UX templates, research canvases, and guided workflows. Speed up your design process from discovery to validation.",
  applicationName: "UX Process Vault",
  keywords: [
    "UX templates",
    "design resources",
    "user research",
    "design thinking",
    "wireframes",
    "design systems"
  ],
  authors: [{ name: "UX Process Vault" }],
  creator: "UX Process Vault",
  publisher: "UX Process Vault",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.uxvault.in",
    siteName: "UX Process Vault",
    title: "UX Process Vault – UX Templates, Kits & Guided Workflows",
    description:
      "Find production-ready UX templates, research canvases, and guided workflows. Speed up your design process from discovery to validation.",
    images: [
      {
        url: "https://www.uxvault.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UX Process Vault"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "UX Process Vault – UX Templates, Kits & Guided Workflows",
    description:
      "Find production-ready UX templates, research canvases, and guided workflows. Speed up your design process from discovery to validation.",
    images: ["https://www.uxvault.in/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <header className="border-b border-black/10 bg-white/80 backdrop-blur">
            <div className="container-page flex items-center justify-between py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                UX Process Vault
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium">
                <Link href="/" className="text-black/70 hover:text-black">
                  Vault
                </Link>
                <Link href="/kit" className="text-black/70 hover:text-black">
                  Kits
                </Link>
                <Link href="/process" className="text-black/70 hover:text-black">
                  Guided
                </Link>
                <MyKitButton />
              </nav>
            </div>
          </header>
          <main className="container-page py-10">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}

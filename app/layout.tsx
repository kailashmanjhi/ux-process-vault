import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ProgressProvider } from "../components/ProgressProvider";
import MyKitButton from "../components/MyKitButton";

export const metadata: Metadata = {
  title: "UX Process Vault",
  description: "MVP for validating product-market fit."
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

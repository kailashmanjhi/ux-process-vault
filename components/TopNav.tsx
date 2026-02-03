import Link from "next/link";

export default function TopNav() {
  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          UX Process Vault
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/process" className="text-black/70 hover:text-black">
            Process
          </Link>
        </nav>
      </div>
    </header>
  );
}

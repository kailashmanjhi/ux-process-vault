import Link from "next/link";
import { getAllAssets } from "../lib/data";
import AssetFinder from "../components/AssetFinder";
import MomentumCard from "../components/MomentumCard";

export default function HomePage() {
  const assets = getAllAssets();

  return (
    <>
    <section className="space-y-16">
      <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
        <div className="card p-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            UX Process Vault
          </h1>
          <p className="mt-4 max-w-2xl text-black/70">
            Find the right UX asset in minutes — templates, canvases, and guides.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#browse"
              className="inline-flex items-center rounded-full bg-ink px-6 py-2 text-sm font-medium text-white"
            >
              Browse Assets
            </a>
            <Link
              href="/process"
              className="inline-flex items-center rounded-full border border-black/20 px-6 py-2 text-sm font-medium"
            >
              Follow Guided Process
            </Link>
          </div>
        </div>
        <MomentumCard assets={assets} />
      </div>

      <AssetFinder assets={assets} />

      <section className="space-y-6">
        <div>
          <h2 className="section-title">Start here</h2>
          <p className="muted mt-2">
            Choose a situation and grab a ready-made kit.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <p className="text-xs uppercase tracking-wide text-black/50">
              Discover
            </p>
            <h3 className="mt-3 text-lg font-semibold">Discover</h3>
            <p className="mt-2 text-sm text-black/70">
              Understand the problem and gather evidence.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Lean UX Audit</li>
              <li>Research Signal Map</li>
              <li>Competitive Snapshot</li>
              <li>Assumption Mapping Canvas</li>
            </ul>
            <Link
              href="/kit?focus=discover"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Kit
            </Link>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-wide text-black/50">
              Define
            </p>
            <h3 className="mt-3 text-lg font-semibold">Define</h3>
            <p className="mt-2 text-sm text-black/70">
              Turn insights into a clear problem and scope.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Research Signal Map</li>
              <li>Competitive Snapshot</li>
              <li>Metric Alignment Brief</li>
              <li>Recruiting Screener</li>
            </ul>
            <Link
              href="/kit?focus=define"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Kit
            </Link>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-wide text-black/50">
              Design
            </p>
            <h3 className="mt-3 text-lg font-semibold">Design</h3>
            <p className="mt-2 text-sm text-black/70">
              Create flows, wireframes, and validate solutions.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Wireframing Starter</li>
              <li>Usability Test Plan</li>
              <li>Design Critique Checklist</li>
            </ul>
            <Link
              href="/kit?focus=design"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Kit
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="section-title">Recommended bundles</h2>
          <p className="muted mt-2">
            Quick collections to move a project forward.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Discover</h3>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Lean UX Audit</li>
              <li>Research Signal Map</li>
              <li>Competitive Snapshot</li>
            </ul>
            <Link
              href="/kit?bundle=discover"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Bundle
            </Link>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Define</h3>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Research Signal Map</li>
              <li>Competitive Snapshot</li>
              <li>Metric Alignment Brief</li>
            </ul>
            <Link
              href="/kit?bundle=define"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Bundle
            </Link>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold">Design</h3>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              <li>Wireframing Starter</li>
              <li>Usability Test Plan</li>
              <li>Design Critique Checklist</li>
            </ul>
            <Link
              href="/kit?bundle=design"
              className="mt-5 inline-flex items-center text-sm font-medium text-accent"
            >
              Open Bundle
            </Link>
          </div>
        </div>
      </section>
    </section>
    {/* SEO: Semantic structured content (hidden visually) */}
    <div className="sr-only">
      <h1>UX Process Vault</h1>
      <p>
        UX Process Vault is a production-ready library of templates, research
        canvases, frameworks, and guides for UX designers. Accelerate your design
        process from user discovery through problem definition to solution design
        and validation.
      </p>
      <h2>Find Assets for Every Stage</h2>
      <ul>
        <li>Discover: Research templates, audit canvases, and signal maps</li>
        <li>Define: Problem synthesis tools, screeners, and alignment briefs</li>
        <li>Design: Wireframing guides, test plans, and critique checklists</li>
      </ul>
    </div>
    </>
  );
}

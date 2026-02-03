"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Asset } from "../lib/types";
import SaveToKitButton from "./SaveToKitButton";

const filters = [
  "All",
  "Research",
  "Interviews",
  "Audit",
  "Synthesis",
  "Wireframing",
  "Testing"
];

function deriveTags(asset: Asset): string[] {
  const title = asset.title.toLowerCase();
  const tags: string[] = [];

  if (title.includes("interview")) tags.push("Interviews");
  if (title.includes("audit")) tags.push("Audit");
  if (title.includes("synthesis")) tags.push("Synthesis");
  if (title.includes("wireframe")) tags.push("Wireframing");
  if (title.includes("test")) tags.push("Testing");

  if (!tags.length) tags.push("Research");

  return tags;
}

export default function AssetFinder({ assets }: { assets: Asset[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const tags = deriveTags(asset);
      const matchesFilter =
        activeFilter === "All" || tags.includes(activeFilter);
      if (!matchesFilter) return false;

      if (!q) return true;
      const haystack = [
        asset.title,
        asset.description,
        asset.type,
        asset.format,
        asset.whenToUse
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [assets, activeFilter, query]);

  return (
    <section id="browse" className="space-y-6">
      <div>
        <h2 className="section-title">Browse assets</h2>
        <p className="muted mt-2">
          Search the vault and filter by what you need right now.
        </p>
      </div>

      <div className="space-y-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search UX assets (audit, interview, wireframe…)"
          className="w-full rounded-2xl border border-black/20 bg-white px-5 py-3 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-3 py-1 text-xs ${
                activeFilter === filter
                  ? "border-ink bg-ink text-white"
                  : "border-black/20 text-black/70"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((asset) => {
          const title = asset.title;
          const tags = deriveTags(asset);
          const bestFor = asset.whenToUse
            ? asset.whenToUse
            : `Best for ${tags[0]}`;
          const typeLabel =
            asset.type.charAt(0).toUpperCase() + asset.type.slice(1);
          return (
            <div key={asset.slug} className="card flex h-full flex-col p-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-black/70">
                  {asset.description}
                </p>
                <div className="mt-4 text-xs text-black/60">
                  <div>Type: {typeLabel}</div>
                  <div>Format: {asset.format}</div>
                  <div className="mt-2">{bestFor}</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                {asset.fileUrl ? (
                  <a
                    href={asset.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-accent"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-sm text-black/40">Coming soon</span>
                )}
                <SaveToKitButton assetId={asset.slug} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

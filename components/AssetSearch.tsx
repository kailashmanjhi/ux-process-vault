"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SaveToKitButton from "./SaveToKitButton";
import type { Asset } from "../lib/types";

function matchesQuery(asset: Asset, query: string) {
  const target = [
    asset.title,
    asset.description,
    asset.type,
    asset.format
  ]
    .join(" ")
    .toLowerCase();
  return target.includes(query.toLowerCase());
}

export default function AssetSearch({ assets }: { assets: Asset[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return assets.filter((asset) => matchesQuery(asset, query));
  }, [assets, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">Search Assets</h2>
          <p className="muted mt-2">
            Find assets by title, description, type, or format.
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search assets..."
          className="w-full rounded-full border border-black/20 bg-white px-4 py-2 text-sm md:max-w-sm"
        />
      </div>

      {query.trim() ? (
        results.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((asset) => (
              <div key={asset.slug} className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{asset.title}</h3>
                  <SaveToKitButton assetId={asset.slug} />
                </div>
                <p className="mt-2 text-sm text-black/70">{asset.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/60">
                  <span>Type: {asset.type}</span>
                  <span>Format: {asset.format}</span>
                  <span>Time: {asset.timeToUseMinutes} min</span>
                </div>
                <Link
                  href={`/assets/${asset.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-accent"
                >
                  View Asset
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-sm text-black/60">
            No assets matched your search.
          </div>
        )
      ) : null}
    </section>
  );
}

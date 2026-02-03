"use client";

import { useState } from "react";

const STORAGE_KEY = "uxpv_feedback";

type FeedbackEntry = {
  assetId: string;
  helpful: boolean;
  reason?: string;
  createdAt: string;
};

function readFeedback(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFeedback(entries: FeedbackEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const reasons = [
  "Not actionable",
  "Missing examples",
  "Too long",
  "Not relevant",
  "Other"
];

export default function FeedbackWidget({ assetId }: { assetId: string }) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = (entry: FeedbackEntry) => {
    const entries = readFeedback();
    writeFeedback([...entries, entry]);
    setSubmitted(true);
  };

  const handleHelpful = (value: boolean) => {
    setHelpful(value);
    if (value) {
      submit({
        assetId,
        helpful: true,
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleReason = (value: string) => {
    setReason(value);
    submit({
      assetId,
      helpful: false,
      reason: value,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6">
      <h3 className="text-sm font-semibold">Was this asset useful?</h3>
      {submitted ? (
        <p className="mt-3 text-sm text-black/60">Thanks for the feedback.</p>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleHelpful(true)}
              className={`rounded-full border px-4 py-1 text-sm ${
                helpful === true
                  ? "border-ink bg-ink text-white"
                  : "border-black/20"
              }`}
            >
              👍 Yes
            </button>
            <button
              type="button"
              onClick={() => handleHelpful(false)}
              className={`rounded-full border px-4 py-1 text-sm ${
                helpful === false
                  ? "border-ink bg-ink text-white"
                  : "border-black/20"
              }`}
            >
              👎 Not really
            </button>
          </div>

          {helpful === false ? (
            <div className="flex flex-wrap gap-2">
              {reasons.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleReason(item)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    reason === item
                      ? "border-ink bg-ink text-white"
                      : "border-black/20 text-black/70"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

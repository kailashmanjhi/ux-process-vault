"use client";

import { useState } from "react";

const STORAGE_KEY = "uxpv_waitlist";

type WaitlistEntry = {
  email: string | null;
  assetId: string;
  createdAt: string;
};

function readWaitlist(): WaitlistEntry[] {
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

function writeWaitlist(entries: WaitlistEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function UnlockProModal({ assetId }: { assetId: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    const entry: WaitlistEntry = {
      email: email.trim() ? email.trim() : null,
      assetId,
      createdAt: new Date().toISOString()
    };
    const entries = readWaitlist();
    writeWaitlist([...entries, entry]);
    setSubmitted(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSubmitted(false);
        }}
        className="inline-flex items-center rounded-full border border-black/20 px-5 py-2 text-sm font-medium"
      >
        Unlock Pro
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Unlock UX Process Vault Pro
                </h2>
                <p className="mt-2 text-sm text-black/70">
                  Get premium templates + audit kits. Join the waitlist.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-black/60 hover:text-black"
              >
                Close
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-black/10 bg-mist px-4 py-3 text-sm">
                You&apos;re on the list.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium">
                  Email (optional)
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-lg border border-black/20 px-3 py-2 text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={submit}
                  className="inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
                >
                  Join Waitlist
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

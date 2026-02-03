"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadKitState } from "../lib/kitStore";

export default function MyKitButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(loadKitState().length);
    const handler = () => setCount(loadKitState().length);
    window.addEventListener("storage", handler);
    window.addEventListener("uxpv-kit-update", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("uxpv-kit-update", handler);
    };
  }, []);

  return (
    <Link
      href="/kit"
      className="relative inline-flex items-center rounded-full bg-ink px-4 py-2 text-xs font-medium text-white"
    >
      My Kit
      {count > 0 ? (
        <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

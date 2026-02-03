import type { AssetStatus } from "../lib/types";

const styles: Record<AssetStatus, string> = {
  todo: "bg-black/10 text-black/70",
  doing: "bg-amber-100 text-amber-900",
  done: "bg-emerald-100 text-emerald-900"
};

const labels: Record<AssetStatus, string> = {
  todo: "Todo",
  doing: "Doing",
  done: "Done"
};

export default function StatusPill({ status }: { status: AssetStatus }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

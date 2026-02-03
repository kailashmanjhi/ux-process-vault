export default function ProgressBar({
  value,
  total
}: {
  value: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-black/60">
        <span>{value} done</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-black/10">
        <div
          className="h-2 rounded-full bg-ink"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

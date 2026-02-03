import Link from "next/link";
import { getAssetBySlug } from "../../../lib/data";
import { notFound } from "next/navigation";
import SaveToKitButton from "../../../components/SaveToKitButton";
import FeedbackWidget from "../../../components/FeedbackWidget";
import MarkDoneToggle from "../../../components/MarkDoneToggle";

export default function AssetPage({
  params
}: {
  params: { id: string };
}) {
  const asset = getAssetBySlug(params.id);

  if (!asset) {
    notFound();
  }

  const title = asset.title ?? "Asset";
  const description = asset.description ?? "";

  return (
    <section className="space-y-8">
      <div className="card p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-black/50">
              {asset.type}
            </p>
            <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
            <p className="mt-3 text-black/70">{description}</p>
          </div>
          {asset.is_premium ? (
            <span className="rounded-full bg-ink px-3 py-1 text-xs text-white">
              Premium
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 text-sm text-black/70 md:grid-cols-2">
          <div>
            <span className="font-medium text-black">Format:</span> {asset.format}
          </div>
          <div>
            <span className="font-medium text-black">Time to use:</span> {asset.timeToUseMinutes} min
          </div>
          <div>
            <span className="font-medium text-black">When to use:</span> {asset.whenToUse}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold">Inputs Required</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70">
              {asset.inputsRequired.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-black/70">
              {asset.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {asset.fileUrl ? (
            <a
              href={asset.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
            >
              Open Asset
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center rounded-full bg-black/20 px-5 py-2 text-sm font-medium text-black/50"
            >
              Coming soon
            </button>
          )}
          <SaveToKitButton assetId={asset.slug} />
          <MarkDoneToggle assetId={asset.slug} />

          <Link
            href={`/process/${asset.stage}/${asset.taskSlug}`}
            className="inline-flex items-center rounded-full border border-black/20 px-5 py-2 text-sm font-medium"
          >
            Back
          </Link>
        </div>
      </div>

      <FeedbackWidget assetId={asset.slug} />
    </section>
  );
}

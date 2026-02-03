import { getAllAssets } from "../../lib/data";
import KitSavedGrid from "../../components/KitSavedGrid";

export default function KitPage() {
  const assets = getAllAssets();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="section-title">Your Kit</h1>
        <p className="muted mt-2">
          Saved assets live here so you can return anytime.
        </p>
      </div>
      <KitSavedGrid assets={assets} />
    </section>
  );
}

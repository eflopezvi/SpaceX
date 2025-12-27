import { getLatestLaunch, getLaunches } from "@/lib/spacex";
import LaunchDashboard from "@/components/LaunchDashboard";

export default async function Page() {
  const [latest, launches] = await Promise.all([getLatestLaunch(), getLaunches()]);

  const sorted = [...launches].sort(
    (a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
  );

  return (
    <main className="min-h-screen bg-black-950 text-white-50">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          SpaceX Mission Control
        </h1>
        <p className="mt-2 text-sm text-white-400">
          Browse launches, inspect details, and open media links.
        </p>

        <div className="mt-6">
          <LaunchDashboard latest={latest} launches={sorted} />
        </div>
      </div>
    </main>
  );
}

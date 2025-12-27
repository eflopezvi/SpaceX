"use client";

import { useMemo, useState } from "react";
import type { Launch } from "@/types/spacex";
import LaunchList from "./LaunchList";
import LaunchDetails from "./LaunchDetails";

type Props = {
  latest: Launch;
  launches: Launch[];
};

export default function LaunchDashboard({ latest, launches }: Props) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(latest.id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return launches;
    return launches.filter((l) => l.name.toLowerCase().includes(q));
  }, [launches, query]);

  const selected = useMemo(() => {
    return filtered.find((l) => l.id === selectedId) ?? launches.find((l) => l.id === selectedId) ?? latest;
  }, [filtered, launches, selectedId, latest]);

  const isEmpty = filtered.length === 0;

  return (
    <div className="grid gap-4 md:grid-cols-[360px_1fr]">
      <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search launches..."
            className="w-full rounded-xl border border-white/10 bg-black-950/40 px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"
          />
        </div>

        <div className="mt-3">
          {isEmpty ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white-300">
              No launches match your search.
            </div>
          ) : (
            <LaunchList
              launches={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
        </div>
      </aside>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
        <LaunchDetails launch={selected} />
      </section>
    </div>
  );
}

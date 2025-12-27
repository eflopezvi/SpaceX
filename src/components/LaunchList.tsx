import type { Launch } from "@/types/spacex";

type Props = {
  launches: Launch[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export default function LaunchList({ launches, selectedId, onSelect }: Props) {
  return (
    <ul className="max-h-[70vh] overflow-auto pr-1">
      {launches.map((l) => {
        const active = l.id === selectedId;
        const badge =
          l.upcoming ? "UPCOMING" : l.success === true ? "SUCCESS" : l.success === false ? "FAILED" : "UNKNOWN";

        return (
          <li key={l.id} className="mb-2 last:mb-0">
            <button
              onClick={() => onSelect(l.id)}
              className={[
                "w-full rounded-xl border p-3 text-left transition",
                active
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-black-950/20 hover:bg-white/5",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium leading-snug">{l.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Flight #{l.flight_number} • {formatDate(l.date_utc)}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] tracking-wide text-zinc-200">
                  {badge}
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

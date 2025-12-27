"use client";

import { useMemo, useState } from "react";
import type { Launch } from "@/types/spacex";
import Modal from "./Modal";

function formatFullDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LaunchDetails({ launch }: { launch: Launch }) {
  const [openVideo, setOpenVideo] = useState(false);

  const patch = launch.links.patch?.large ?? launch.links.patch?.small ?? null;
  const youtubeId = launch.links.youtube_id ?? null;

  const status = useMemo(() => {
    if (launch.upcoming) return { label: "Upcoming", tone: "text-amber-300" };
    if (launch.success === true) return { label: "Success", tone: "text-emerald-300" };
    if (launch.success === false) return { label: "Failed", tone: "text-rose-300" };
    return { label: "Unknown", tone: "text-zinc-300" };
  }, [launch]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-tight">{launch.name}</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Flight #{launch.flight_number} • {formatFullDate(launch.date_utc)}
          </p>
          <p className={"mt-2 text-sm " + status.tone}>Status: {status.label}</p>
        </div>

        {patch ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={patch}
            alt={`${launch.name} patch`}
            className="h-24 w-24 rounded-2xl border border-white/10 bg-white/5 object-cover"
          />
        ) : (
          <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/10 bg-white/5 text-xs text-zinc-400">
            No patch
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black-950/20 p-3">
          <p className="text-xs text-gray-400">Rocket</p>
          <p className="mt-1 break-all text-sm">{launch.rocket}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black-950/20 p-3">
          <p className="text-xs text-gray-400">Launchpad</p>
          <p className="mt-1 break-all text-sm">{launch.launchpad}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black-950/20 p-3">
          <p className="text-xs text-gray-400">Links</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {youtubeId ? (
              <button
                onClick={() => setOpenVideo(true)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                Open video
              </button>
            ) : null}

            {launch.links.wikipedia ? (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                Wikipedia
              </a>
            ) : null}

            {launch.links.article ? (
              <a
                href={launch.links.article}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
              >
                Article
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">Details</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          {launch.details ?? "No details provided for this launch."}
        </p>
      </div>

      <Modal open={openVideo} title="Webcast" onClose={() => setOpenVideo(false)}>
        {youtubeId ? (
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-sm text-zinc-300">No YouTube ID available.</p>
        )}
      </Modal>
    </>
  );
}

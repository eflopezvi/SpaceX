import { Launch } from "@/types/spacex";

const BASE = "https://api.spacexdata.com/v5";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`SpaceX API error: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getLatestLaunch(): Promise<Launch> {
  return fetchJSON<Launch>(`${BASE}/launches/latest`);
}

export async function getLaunches(): Promise<Launch[]> {
  return fetchJSON<Launch[]>(`${BASE}/launches`);
}

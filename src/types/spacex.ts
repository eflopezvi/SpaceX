export type LaunchLinks = {
  patch?: { small?: string | null; large?: string | null } | null;
  webcast?: string | null;
  youtube_id?: string | null;
  wikipedia?: string | null;
  article?: string | null;
};

export type Launch = {
  id: string;
  name: string;
  details: string | null;
  date_utc: string;
  flight_number: number;
  upcoming: boolean;
  success: boolean | null;
  rocket: string;
  launchpad: string;
  links: LaunchLinks;
};

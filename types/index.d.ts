import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imageUrl: string;
  label: string;
  route: string;
}

export interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
}

export interface BadgeCounts {
  BRONZE: number;
  SILVER: number;
  GOLD: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

import { SOURCE_OF_TRUTH_URLS } from "@/data/content";

/**
 * Site URL resolution reading strictly from the single source of truth in content.ts.
 */
export function getSiteUrl(): string {
  return SOURCE_OF_TRUTH_URLS.portfolio;
}

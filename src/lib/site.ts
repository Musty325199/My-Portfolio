/**
 * Robust site URL resolution for production, staging, and local dev.
 * Automatically handles Vercel environment variables and user configuration.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // If a valid production URL is specified in env (not localhost)
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/+$/, "");
  }

  // Vercel auto-provided production domain (e.g. musty-dev.vercel.app)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Vercel deployment URL fallback
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Production default domain
  if (process.env.NODE_ENV === "production") {
    return "https://musty-dev.vercel.app";
  }

  // Local development
  return envUrl || "http://localhost:3000";
}

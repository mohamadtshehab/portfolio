/** Canonical site origin for metadata, sitemap, and robots (no trailing slash). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  if (process.env.URL?.trim()) return process.env.URL.trim().replace(/\/+$/, '');
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  return 'http://localhost:3000';
}

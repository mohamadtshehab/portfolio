export const budgetValues = ['not-sure', 'under-5000', '5000-10000', '10000-25000', '25000-50000', '50000-plus'] as const;
export const sizeValues = ['solo', '2-10', '11-50', '51-200', '200-plus'] as const;
export const fieldLimits = { name: 200, company: 200, website: 500, business: 2000, bottleneck: 3000, size: 30, budget: 30, email: 254, whatsapp: 40 };
export type Application = Record<keyof typeof fieldLimits, string>;
export const emptyApplication: Application = { name: '', company: '', website: '', business: '', bottleneck: '', size: '', budget: '', email: '', whatsapp: '' };

export function isValidWebsite(value: string): boolean {
  const website = value.trim();
  if (!website) return true;
  if (/\s|\\/.test(website)) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(website) && !/^https?:\/\//i.test(website)) return false;

  try {
    const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return false;
    const labels = url.hostname.toLowerCase().replace(/\.$/, '').split('.');
    if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return false;
    return /^(?:[a-z]{2,}|xn--[a-z0-9-]{2,})$/.test(labels[labels.length - 1]);
  } catch {
    return false;
  }
}

export function validateApplication(body: unknown): Application | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const input = body as Record<string, unknown>;
  const data = { ...emptyApplication };
  for (const key of Object.keys(fieldLimits) as (keyof Application)[]) {
    if (input[key] !== undefined && typeof input[key] !== 'string') return null;
    data[key] = typeof input[key] === 'string' ? input[key].trim() : '';
    if (data[key].length > fieldLimits[key]) return null;
  }
  if (!data.name || !data.company || !data.business || !data.bottleneck) return null;
  if (!sizeValues.some(value => value === data.size) || !budgetValues.some(value => value === data.budget)) return null;
  if (!data.email && !data.whatsapp) return null;
  if (!isValidWebsite(data.website)) return null;
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return null;
  if (data.whatsapp && (!/^\+?[\d\s().-]+$/.test(data.whatsapp) || data.whatsapp.replace(/\D/g, '').length < 7 || data.whatsapp.replace(/\D/g, '').length > 15)) return null;
  return data;
}

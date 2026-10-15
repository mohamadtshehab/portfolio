import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import BusinessPage from './BusinessPage';

export const metadata: Metadata = {
  title: 'For Business | Mohamad Shehab',
  description: 'Find where AI can create real business value, then turn research-informed ideas into working solutions.',
  alternates: { canonical: '/business' },
  openGraph: {
    title: 'Research-Informed AI for Business | Mohamad Shehab',
    description: 'Find where AI can create real business value, then turn research-informed ideas into working solutions.',
    url: '/business', locale: 'en_US', alternateLocale: ['ar_AR'], type: 'website',
    images: [{ url: '/my-image1.jpg', alt: 'Mohamad Shehab' }],
  },
  twitter: { card: 'summary', title: 'Research-Informed AI for Business | Mohamad Shehab', description: 'Find where AI can create real business value, then turn research-informed ideas into working solutions.', images: ['/my-image1.jpg'] },
};

export default async function Page() {
  const storedLanguage = (await cookies()).get('business-language')?.value;
  const hasLanguageCookie = storedLanguage === 'ar' || storedLanguage === 'en';
  const initialLanguage = hasLanguageCookie ? storedLanguage : 'en';
  return <BusinessPage initialLanguage={initialLanguage} hasLanguageCookie={hasLanguageCookie} />;
}

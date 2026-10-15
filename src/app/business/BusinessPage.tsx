'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import FloatingNav from '../components/FloatingNav';
import { content, type Language } from './content';
import BusinessSelect from './BusinessSelect';
import { budgetValues, sizeValues, fieldLimits, emptyApplication, isValidWebsite, type Application } from '@/lib/businessApplication';
import styles from './business.module.css';

const businessTypes = ['retail', 'food', 'services', 'manufacturing', 'healthcare', 'education', 'technology', 'other'] as const;

export default function BusinessPage({ initialLanguage, hasLanguageCookie }: { initialLanguage: Language; hasLanguageCookie: boolean }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [languageReady, setLanguageReady] = useState(hasLanguageCookie);
  const [languageSwitching, setLanguageSwitching] = useState(false);
  const [data, setData] = useState<Application>({ ...emptyApplication });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState(false);
  const [missingSelect, setMissingSelect] = useState<'business' | 'size' | 'budget' | null>(null);
  const [businessType, setBusinessType] = useState('');
  const [otherBusiness, setOtherBusiness] = useState('');
  const [checkedProblems, setCheckedProblems] = useState<Record<number, boolean>>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const languageSwitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();
  const copy = content[language];
  const sectionEntrance = {
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
  };
  const navLinks = [
    { href: '#who-i-am', label: copy.nav.who },
    { href: '#approach', label: copy.nav.approach },
    { href: '#case-study', label: copy.nav.caseStudy },
    { href: '#problems', label: copy.nav.challenges },
    { href: '#application', label: copy.nav.contact },
    { href: '/', label: copy.portfolio },
  ];

  useEffect(() => {
    let preferredLanguage = initialLanguage;
    try {
      const saved = localStorage.getItem('business-language');
      if (!hasLanguageCookie && (saved === 'ar' || saved === 'en')) preferredLanguage = saved;
      localStorage.setItem('business-language', preferredLanguage);
    } catch { /* The page still works when storage is unavailable. */ }
    setLanguage(preferredLanguage);
    document.cookie = `business-language=${preferredLanguage}; Path=/business; Max-Age=31536000; SameSite=Lax`;
    setLanguageReady(true);
    const original = document.documentElement.lang;
    return () => { document.documentElement.lang = original; };
  }, [hasLanguageCookie, initialLanguage]);

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);
  useEffect(() => () => { if (languageSwitchTimer.current) clearTimeout(languageSwitchTimer.current); }, []);

  useEffect(() => {
    const root = document.documentElement;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    let frame = 0;

    const updateParticles = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const bottom = Math.max(0, root.scrollHeight - viewport);
      const topFadeDistance = Math.min(viewport * .65, bottom / 2);
      const bottomFadeDistance = Math.min(viewport * .4, bottom / 2);
      const fadeOut = 1 - clamp(window.scrollY / Math.max(1, topFadeDistance));
      const fadeIn = clamp((window.scrollY - (bottom - bottomFadeDistance)) / Math.max(1, bottomFadeDistance));
      root.style.setProperty('--business-particles-opacity', String(Math.max(fadeOut, fadeIn)));
    };
    const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateParticles); };
    const observer = new ResizeObserver(scheduleUpdate);
    if (pageRef.current) observer.observe(pageRef.current);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    updateParticles();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty('--business-particles-opacity');
    };
  }, []);

  function changeLanguage(next: Language) {
    if (next === language || languageSwitching || languageSwitchTimer.current !== null) return;
    const applyLanguage = () => {
      setLanguage(next);
      try { localStorage.setItem('business-language', next); } catch { /* Optional persistence. */ }
      document.cookie = `business-language=${next}; Path=/business; Max-Age=31536000; SameSite=Lax`;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyLanguage();
      return;
    }
    setLanguageSwitching(true);
    languageSwitchTimer.current = setTimeout(() => {
      applyLanguage();
      setLanguageSwitching(false);
      languageSwitchTimer.current = null;
    }, 180);
  }

  function update(key: keyof Application, value: string) {
    setData(previous => ({ ...previous, [key]: value }));
    if (key === missingSelect) setMissingSelect(null);
    if (key === 'website') websiteRef.current?.setCustomValidity('');
    if (key === 'email' || key === 'whatsapp') {
      setContactError(false);
      emailRef.current?.setCustomValidity('');
      whatsappRef.current?.setCustomValidity('');
    }
    if (status === 'error') setStatus('idle');
  }

  function chooseBusinessType(value: string) {
    const index = businessTypes.findIndex(type => type === value);
    if (index < 0) return;
    setBusinessType(value);
    setMissingSelect(null);
    update('business', value === 'other' ? otherBusiness : content.en.businessTypes[index]);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const missing = !businessType ? 'business' : (['size', 'budget'] as const).find(key => !data[key]);
    if (missing) {
      setMissingSelect(missing);
      document.getElementById(`business-${missing}`)?.focus();
      return;
    }
    if (!isValidWebsite(data.website)) {
      websiteRef.current?.setCustomValidity(language === 'ar' ? 'يرجى إدخال نطاق صالح، مثل example.com.' : 'Please enter a valid domain, such as example.com.');
      websiteRef.current?.reportValidity();
      return;
    }
    if (!data.email.trim() && !data.whatsapp.trim()) {
      setContactError(true);
      emailRef.current?.focus();
      return;
    }
    if (data.whatsapp.trim() && (data.whatsapp.replace(/\D/g, '').length < 7 || data.whatsapp.replace(/\D/g, '').length > 15)) {
      whatsappRef.current?.setCustomValidity(language === 'ar' ? 'يرجى إدخال رقم واتساب صالح مع رمز الدولة.' : 'Please enter a valid WhatsApp number with country code.');
      whatsappRef.current?.reportValidity();
      return;
    }
    setContactError(false);
    setStatus('sending');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/business', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, language, selectedProblems: Object.entries(checkedProblems).filter(([, checked]) => checked).map(([index]) => Number(index)), companyFax: form.get('companyFax') }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setData({ ...emptyApplication });
      setBusinessType('');
      setOtherBusiness('');
      setCheckedProblems({});
    } catch { setStatus('error'); }
  }

  function field(key: keyof Application, options: { type?: string; multiline?: boolean; optional?: boolean; autocomplete?: string } = {}) {
    const id = `business-${key}`;
    const shared = {
      id, name: key, value: data[key], required: !options.optional,
      maxLength: fieldLimits[key], disabled: status === 'sending',
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(key, event.target.value),
    };
    return <div className={options.multiline ? styles.fullField : styles.field}>
      <label htmlFor={id}>{copy.labels[key]}{options.optional && key !== 'email' && key !== 'whatsapp' && <span className={styles.optional}> ({copy.optional})</span>}</label>
      {options.multiline ? <textarea {...shared} rows={3} placeholder={key === 'bottleneck' ? copy.bottleneckPlaceholder : undefined} /> :
        <input {...shared} ref={key === 'email' ? emailRef : key === 'whatsapp' ? whatsappRef : key === 'website' ? websiteRef : undefined} type={options.type || 'text'} autoComplete={options.autocomplete}
          dir={['email', 'whatsapp', 'website'].includes(key) ? 'ltr' : 'auto'}
          placeholder={key === 'website' ? 'example.com' : key === 'whatsapp' ? '+44 7700 900000' : undefined}
          pattern={key === 'whatsapp' ? '\\+?[0-9 ()\\.\\-]{7,40}' : undefined}
          aria-describedby={key === 'email' || key === 'whatsapp' ? 'business-contact-hint' : undefined}
          aria-invalid={key === 'email' || key === 'whatsapp' ? contactError : undefined} />}
    </div>;
  }

  return <div ref={pageRef} className={styles.page} lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} data-language-switching={languageSwitching} aria-busy={languageSwitching} style={{ visibility: languageReady ? 'visible' : 'hidden' }}>
    <FloatingNav links={navLinks} hintLabel={copy.nav.menu} openLabel={copy.nav.openMenu} closeLabel={copy.nav.closeMenu} direction={language === 'ar' ? 'rtl' : 'ltr'} wide animateOnLoad
      extra={<div className={`flex items-center justify-center gap-0.5 border-t border-white/10 pt-2 lg:border-t-0 lg:pt-0 ${language === 'ar' ? 'lg:mr-1 lg:border-r lg:pr-2' : 'lg:ml-1 lg:border-l lg:pl-2'}`} dir="ltr" role="group" aria-label="Language / اللغة">
        <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}
          className={`min-h-10 lg:min-h-0 rounded-full px-2 py-1.5 text-sm font-medium transition-colors ${language === 'en' ? 'bg-white/10 text-teal-100' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>English</button>
        <button type="button" lang="ar" aria-pressed={language === 'ar'} onClick={() => changeLanguage('ar')}
          className={`min-h-10 lg:min-h-0 rounded-full px-2 py-1.5 text-sm font-medium transition-colors ${language === 'ar' ? 'bg-white/10 text-teal-100' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>العربية</button>
      </div>} />

    <main>
      <section className={styles.hero} aria-labelledby="business-title">
        <motion.div initial={reducedMotion ? false : { opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className={styles.heroCopy}>
          <h1 id="business-title">{copy.headline}</h1>
          {'subheader' in copy && <p className={styles.heroSubheader}>{copy.subheader}</p>}
        </motion.div>
        <motion.figure initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className={styles.portrait}>
          <div className={styles.photo}><Image src="/my-image1.jpg" alt={copy.photoAlt} fill priority sizes="(max-width: 767px) 240px, (max-width: 1024px) 32vw, 350px" /></div>
        </motion.figure>
      </section>

      <motion.section id="who-i-am" className={styles.section} aria-labelledby="who-title" {...sectionEntrance}>
        <h2 id="who-title"><span className={styles.sectionNumber} aria-hidden>01</span>{copy.whoTitle}</h2>
        <div className={styles.sectionIntro}>
          {copy.whoParagraphs.map((paragraph, index) => <p key={index}>{paragraph.map((segment, part) => 'strong' in segment && segment.strong ? <strong key={part}>{segment.text}</strong> : <span key={part}>{segment.text}</span>)}</p>)}
        </div>
      </motion.section>

      <motion.section id="approach" className={styles.section} aria-labelledby="approach-title" {...sectionEntrance}>
        <h2 id="approach-title"><span className={styles.sectionNumber} aria-hidden>02</span>{copy.approachTitle}</h2>
        <div className={styles.sectionIntro}>
          <p>{copy.judgment}</p>
          <p className={styles.processIntro}><strong>{copy.processIntro}</strong></p>
        </div>
        <div className={styles.connectedVerticalSteps}>
          {copy.steps.map((step, stepIndex) => (
            <article className={styles.designStep} key={step.title}>
              <span className={styles.designNumber} aria-hidden>{`0${stepIndex + 1}`}</span>
              <div className={styles.designStepCopy}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="case-study" className={styles.section} aria-labelledby="case-title" {...sectionEntrance}>
        <h2 id="case-title"><span className={styles.sectionNumber} aria-hidden>03</span>{copy.caseTitle}</h2>
        <article className={styles.caseCard}>
          <div className={styles.caseHeader}><h3>{copy.caseLabel}</h3></div>
          <div className={styles.caseIntro}><p>{copy.caseIntro}</p><p>{copy.caseProcess}</p><p>{copy.currentText}</p><p className={styles.local}>{copy.local}</p><p>{copy.futureText}</p><p>{copy.caseOutcome}</p></div>
        </article>
      </motion.section>

      <motion.section id="problems" className={styles.section} aria-labelledby="problems-title" {...sectionEntrance}>
        <h2 id="problems-title"><span className={styles.sectionNumber} aria-hidden>04</span>{copy.problemsTitle}</h2><p className={styles.sectionLead}>{copy.problemsIntro}</p>
        <div className={styles.problems}>{copy.problems.map((problem, index) => <article key={index}>
          <label className={styles.problemChoice}>
            <input className={styles.problemCheckbox} type="checkbox" checked={!!checkedProblems[index]} onChange={(event) => setCheckedProblems((previous) => ({ ...previous, [index]: event.target.checked }))} aria-labelledby={`problem-title-${index}`} />
            <span className={styles.problemCopy}><span className={styles.problemTitle} id={`problem-title-${index}`}>{problem.title}</span><span className={styles.problemDescription}>{problem.text}</span></span>
          </label>
        </article>)}</div>
        {Object.values(checkedProblems).some(Boolean) && <p className={styles.selectionHint} role="status">{copy.selectedProblemsHint}</p>}
      </motion.section>

      <motion.section id="application" className={`${styles.section} ${styles.application}`} aria-labelledby="application-title" {...sectionEntrance}>
        <div className={styles.applicationIntro}><h2 id="application-title"><span className={styles.sectionNumber} aria-hidden>05</span>{copy.applicationTitle}</h2><p>{copy.applicationIntro}</p>{status !== 'success' && <p className={styles.review}>{copy.review}</p>}</div>
        {status === 'success' ? <div className={styles.success} ref={successRef} tabIndex={-1} role="status"><CheckCircle2 size={32} aria-hidden /><h3>{copy.successTitle}</h3><p>{copy.successReview}</p></div> :
          <form onSubmit={submit} className={styles.form}>
            <div className={styles.fields}>
              {field('name', { autocomplete: 'name' })}{field('company', { autocomplete: 'organization' })}
              {field('website', { optional: true, autocomplete: 'url' })}
              <BusinessSelect id="business-business" name="businessType" label={copy.labels.business} placeholder={copy.choose}
                values={businessTypes} options={copy.businessTypes} value={businessType} onChange={chooseBusinessType}
                disabled={status === 'sending'} invalid={missingSelect === 'business'} fullWidth />
              {businessType === 'other' && <div className={styles.fullField}>
                <label htmlFor="business-other">{copy.otherBusinessLabel}</label>
                <textarea id="business-other" name="business" rows={3} value={otherBusiness} required dir="auto"
                  maxLength={fieldLimits.business} disabled={status === 'sending'} placeholder={copy.otherBusinessPlaceholder}
                  onChange={event => { setOtherBusiness(event.target.value); update('business', event.target.value); }} />
              </div>}
              {field('bottleneck', { multiline: true })}
              {(['size', 'budget'] as const).map(key => <BusinessSelect key={key} id={`business-${key}`} name={key} label={copy.labels[key]}
                placeholder={copy.choose} values={key === 'size' ? sizeValues : budgetValues} options={key === 'size' ? copy.sizes : copy.budgets}
                value={data[key]} onChange={value => update(key, value)} disabled={status === 'sending'} invalid={missingSelect === key} />)}
              <div className={styles.contactFields}>
                <p id="business-contact-hint" className={styles.contactHint}>{copy.contactHint}</p>
                {field('email', { type: 'email', optional: true, autocomplete: 'email' })}{field('whatsapp', { type: 'tel', optional: true, autocomplete: 'tel' })}
              </div>
            </div>
            <div className={styles.honeypot} aria-hidden="true"><label htmlFor="company-fax">Company fax</label><input id="company-fax" name="companyFax" tabIndex={-1} autoComplete="off" /></div>
            {contactError && <p className={styles.error} role="alert">{copy.contactError}</p>}
            {status === 'error' && <p className={styles.error} role="alert">{copy.error} <a href="mailto:iammohamadshehab@gmail.com" dir="ltr">iammohamadshehab@gmail.com</a></p>}
            <button type="submit" disabled={status === 'sending'} className={styles.primary}>{status === 'sending' ? copy.submitting : copy.submit}<ArrowUpRight size={18} aria-hidden /></button>
          </form>}
      </motion.section>
    </main>
  </div>;
}

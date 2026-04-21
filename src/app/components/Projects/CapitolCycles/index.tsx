"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IMAGE_BASE, storyChapters } from "./storyChapters";

const chapterHash = (slug: string) => `capitol-${slug}`;

const CapitolCycles = () => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [figureIndex, setFigureIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const total = storyChapters.length;
  const ch = storyChapters[chapterIndex];
  const figures = ch.figures;
  const figureCount = figures.length;
  const fig = figureCount > 0 ? figures[figureIndex] : null;

  const stepLabel = `Step ${chapterIndex + 1} of ${total}`;

  const goToIndex = useCallback((i: number) => {
    const next = Math.max(0, Math.min(i, total - 1));
    setChapterIndex(next);
    setFigureIndex(0);
    const slug = storyChapters[next].slug;
    const h = `#${chapterHash(slug)}`;
    if (window.location.hash !== h) {
      window.history.pushState({ capitolChapter: next }, "", h);
    }
  }, [total]);

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      const i = storyChapters.findIndex((c) => chapterHash(c.slug) === raw);
      if (i >= 0) {
        setChapterIndex(i);
        setFigureIndex(0);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const advanceFindingOrStage = useCallback(() => {
    if (figureCount === 0) {
      if (chapterIndex < total - 1) goToIndex(chapterIndex + 1);
      return;
    }
    if (figureIndex < figureCount - 1) {
      setFigureIndex((i) => i + 1);
      return;
    }
    if (chapterIndex < total - 1) {
      goToIndex(chapterIndex + 1);
    }
  }, [chapterIndex, figureCount, figureIndex, goToIndex, total]);

  const regressFindingOrStage = useCallback(() => {
    if (figureCount === 0) {
      if (chapterIndex > 0) goToIndex(chapterIndex - 1);
      return;
    }
    if (figureIndex > 0) {
      setFigureIndex((i) => i - 1);
      return;
    }
    if (chapterIndex > 0) {
      const prevCh = storyChapters[chapterIndex - 1];
      const prevFigures = prevCh.figures;
      setChapterIndex(chapterIndex - 1);
      setFigureIndex(Math.max(0, prevFigures.length - 1));
      const h = `#${chapterHash(prevCh.slug)}`;
      if (window.location.hash !== h) {
        window.history.pushState(
          { capitolChapter: chapterIndex - 1 },
          "",
          h,
        );
      }
    }
  }, [chapterIndex, figureCount, figureIndex, goToIndex]);

  const canRegressFindingOrStage =
    figureCount === 0
      ? chapterIndex > 0
      : figureIndex > 0 || chapterIndex > 0;

  useEffect(() => {
    if (lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        advanceFindingOrStage();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (canRegressFindingOrStage) regressFindingOrStage();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    advanceFindingOrStage,
    canRegressFindingOrStage,
    lightbox,
    regressFindingOrStage,
  ]);

  const goToFigure = (i: number) => {
    setFigureIndex(i);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto text-left">
      <div className="mb-6 rounded-xl border border-white/10 bg-transparent p-5 sm:p-6 ring-1 ring-white/5">
        <h4 className="text-lg font-semibold text-white">
          Capitol Cycles — guided analysis
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
          One stage at a time; each finding shows the business question, decision insight,
          and chart together. Use{" "}
          <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-xs text-white/85">
            ←
          </kbd>{" "}
          /{" "}
          <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-xs text-white/85">
            →
          </kbd>{" "}
          when the lightbox is closed to move between findings or stages.
        </p>
      </div>

      <div
        className="sticky top-0 z-20 mb-6 space-y-2.5 border border-white/10 border-b-white/10 bg-[#061a1c]/95 px-3 py-2.5 shadow-sm backdrop-blur-md sm:space-y-3 sm:rounded-xl sm:px-4 sm:py-3 sm:ring-1 sm:ring-white/5"
        role="navigation"
        aria-label="Analysis walkthrough"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 pr-0 sm:pr-2">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-teal-200/90 sm:text-[0.65rem] sm:tracking-[0.14em]">
              {stepLabel}
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-white sm:line-clamp-none sm:truncate sm:text-base sm:leading-normal">
              {ch.title}
            </p>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={chapterIndex + 1}
              aria-valuemin={1}
              aria-valuemax={total}
              aria-label="Walkthrough progress"
            >
              <div
                className="h-full rounded-full bg-teal-400/80 transition-[width] duration-300 ease-out"
                style={{ width: `${((chapterIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex w-full shrink-0 items-stretch gap-2 sm:w-auto sm:items-center">
            <button
              type="button"
              onClick={() => goToIndex(chapterIndex - 1)}
              disabled={chapterIndex <= 0}
              className="min-h-11 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 sm:min-h-0 sm:flex-initial sm:py-2"
            >
              Back
            </button>
            {chapterIndex >= total - 1 ? (
              <span className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-2 py-2 text-center text-xs font-medium leading-tight text-white/55 sm:min-h-0 sm:flex-initial sm:px-3 sm:py-2 sm:text-sm">
                End of walkthrough
              </span>
            ) : (
              <button
                type="button"
                onClick={() => goToIndex(chapterIndex + 1)}
                className="min-h-11 flex-1 rounded-lg border border-teal-400/40 bg-teal-500/20 px-3 py-2.5 text-sm font-medium text-teal-100 transition hover:border-teal-300/60 hover:bg-teal-500/30 sm:min-h-0 sm:flex-initial sm:py-2"
              >
                Continue
              </button>
            )}
          </div>
        </div>
        <div
          className="-mx-1 flex gap-2 overflow-x-auto overflow-y-visible px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Jump to stage"
        >
          {storyChapters.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => goToIndex(i)}
              title={c.title}
              aria-label={`${c.title}, stage ${i + 1}`}
              aria-current={i === chapterIndex ? "step" : undefined}
              className={`shrink-0 rounded-lg border px-3 py-2 text-center text-xs font-medium transition sm:min-h-0 sm:px-2.5 sm:py-1.5 ${
                i === chapterIndex
                  ? "border-teal-400/50 bg-teal-500/25 text-teal-100"
                  : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white/90"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <section
        key={ch.slug}
        id={chapterHash(ch.slug)}
        className="scroll-mt-36 rounded-xl border border-white/10 bg-white/[0.06] p-5 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline gap-2 gap-y-1">
          <h5 className="text-xl font-bold text-white sm:text-2xl">
            {ch.title}
          </h5>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
          {ch.blurb}
        </p>

        {figureCount > 0 && fig ? (
          <div className="mt-6 space-y-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/50">
                Finding {figureIndex + 1} of {figureCount} in this stage
              </p>
            {figureCount > 1 ? (
              <div
                className="flex flex-wrap gap-1.5"
                aria-label="Jump to finding in this stage"
              >
                {figures.map((f, i) => (
                  <button
                    key={f.file}
                    type="button"
                    onClick={() => goToFigure(i)}
                    aria-label={`Finding ${i + 1}`}
                    aria-current={i === figureIndex ? "true" : undefined}
                    className={`min-h-8 min-w-8 rounded-md border text-xs font-medium transition ${
                      i === figureIndex
                        ? "border-teal-400/45 bg-teal-500/20 text-teal-100"
                        : "border-white/12 bg-white/[0.04] text-white/65 hover:border-white/25"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {figureCount > 0 && fig ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] ring-1 ring-white/5">
            <div className="border-b border-white/10 px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-teal-200/90">
                Question this chart answers
              </p>
              <p className="mt-2 text-sm font-medium leading-snug text-white sm:text-base">
                {fig.question}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/45">
                Decision insight
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                {fig.insight}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightbox(`${IMAGE_BASE}/${fig.file}`)}
              className="group relative w-full overflow-hidden rounded-b-xl bg-transparent text-left transition hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-300/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IMAGE_BASE}/${fig.file}`}
                alt={fig.question}
                className="mx-auto block h-auto w-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
              />
              <p className="border-t border-white/10 px-3 py-2 text-xs text-white/50 capitalize sm:text-sm">
                {fig.file.replace(/\.[^.]+$/, "").replace(/-/g, " ")}
              </p>
            </button>
          </div>
        ) : null}
      </section>


      {lightbox ? (
        <button
          type="button"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-theme/85 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
          aria-label="Close image"
        >
          <span className="absolute right-4 top-4 text-sm font-medium text-white/70">
            Esc or click to close
          </span>
          <div className="relative max-h-[90vh] max-w-[min(1200px,95vw)]">
            <Image
              src={lightbox}
              alt="Expanded figure"
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default CapitolCycles;

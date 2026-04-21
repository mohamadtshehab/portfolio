"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_ARTICLE = {
  title: "Retrieval-Augmented Prompting Improves Faithful Summarization of Long Scientific Articles",
  venue: "Journal of Applied Machine Research · Vol. 14, No. 2 (illustrative)",
  body: [
    "Abstract — Long-form scientific PDFs are difficult for general-purpose language models to summarize faithfully because relevant evidence is spread across sections and figures. We study a retrieval-augmented pipeline that chunks documents, embeds passages, and conditions generation only on retrieved context for a given query.",
    "Introduction — Prior work on summarization often conditions on the full document or on the first N tokens, which can miss methodological detail buried in later sections. We argue that explicit retrieval scoped to a single document reduces hallucinated citations while keeping latency manageable for interactive tools such as browser assistants.",
    "Methods — We segment each paper into section-aware chunks (~1.5k characters with overlap), store embeddings in a vector database keyed by document_id, and answer questions with an agent that may invoke a search tool before responding. Evaluation uses a small benchmark of expert-written questions with reference spans.",
    "Discussion — In our illustrative setting, constraining retrieval to one document at query time is critical: it prevents the model from blending facts from unrelated papers and mirrors how a reader expects an on-page assistant to behave.",
  ],
} as const;

const DEMO_DOCUMENT_ID = "doc_7f3a9c2e";

const PREDEFINED_QA = [
  {
    id: "q1",
    question: "What problem does this paper address?",
    answer:
      "It addresses faithful summarization and Q&A over long scientific articles where evidence is scattered across sections. The authors argue that conditioning only on retrieved chunks from the same document reduces hallucinations compared to using the full text or a fixed prefix.",
  },
  {
    id: "q2",
    question: "How do they chunk the document?",
    answer:
      "They use section-aware chunks of roughly 1,500 characters with overlap so that boundaries do not split arguments awkwardly. Chunks are embedded and stored under a document_id so search stays scoped to that article only.",
  },
  {
    id: "q3",
    question: "Why is document_id important for retrieval?",
    answer:
      "Filtering vector search by document_id ensures the assistant only pulls passages from the paper the user opened. That mirrors an on-page research tool and stops the model from mixing in unrelated works.",
  },
  {
    id: "q4",
    question: "What kind of model behavior do they describe?",
    answer:
      "They describe an agentic setup: the model can call a search tool, inspect retrieved spans, then answer—rather than a single fixed retrieve-then-read pass. That matches the LangGraph-style loop in the real jstor-rag backend.",
  },
] as const;

const JstorRag = () => {
  const [demoPhase, setDemoPhase] = useState<"article" | "digesting" | "ready">("article");
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const digestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (digestTimerRef.current) clearTimeout(digestTimerRef.current);
    };
  }, []);

  const runDigest = () => {
    if (demoPhase !== "article") return;
    if (digestTimerRef.current) clearTimeout(digestTimerRef.current);
    setDemoPhase("digesting");
    setActiveQuestionId(null);
    digestTimerRef.current = setTimeout(() => {
      digestTimerRef.current = null;
      setDemoPhase("ready");
    }, 1400);
  };

  const resetDemo = () => {
    if (digestTimerRef.current) {
      clearTimeout(digestTimerRef.current);
      digestTimerRef.current = null;
    }
    setDemoPhase("article");
    setActiveQuestionId(null);
  };

  const activeAnswer = PREDEFINED_QA.find((q) => q.id === activeQuestionId);

  return (
    <div className="relative mx-auto w-full max-w-5xl text-left">
      <div className="rounded-xl border border-teal-400/25 bg-white/[0.04] p-5 ring-1 ring-teal-400/10 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,340px)]">
          <div className="rounded-lg border border-white/10 bg-[#0a1214]/90 p-4 sm:p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/45">Article view</p>
            <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-white sm:text-xl">
              {DEMO_ARTICLE.title}
            </h3>
            <p className="mt-2 text-xs italic text-white/50">{DEMO_ARTICLE.venue}</p>
            <div className="mt-4 max-h-[280px] space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed text-white/80 sm:max-h-[320px]">
              {DEMO_ARTICLE.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runDigest}
                disabled={demoPhase !== "article"}
                className="rounded-lg border border-teal-400/45 bg-teal-500/20 px-4 py-2.5 text-sm font-semibold text-teal-100 transition hover:border-teal-300/60 hover:bg-teal-500/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {demoPhase === "digesting" ? "Digesting…" : "Digest this article"}
              </button>
              {demoPhase !== "article" ? (
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-white/35 hover:bg-white/10"
                >
                  Reset
                </button>
              ) : null}
              {demoPhase === "ready" ? (
                <span className="text-xs text-teal-200/90">
                  Indexed <strong className="font-semibold text-teal-100">12</strong> chunks ·{" "}
                  <code className="rounded bg-black/35 px-1.5 py-0.5 text-[0.7rem] text-white/85">
                    {DEMO_DOCUMENT_ID}
                  </code>
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-[200px] flex-col rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/45">Side panel (chat)</p>
            {demoPhase !== "ready" ? (
              <div className="mt-4 flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-sm text-white/50">
                  {demoPhase === "digesting"
                    ? "Chunking, embedding, and storing in Chroma…"
                    : "Digest the article to unlock questions about this paper only."}
                </p>
              </div>
            ) : (
              <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3">
                <p className="text-xs text-white/55">Pick a question (answers are pre-written for this demo):</p>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_QA.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveQuestionId(q.id)}
                      className={`rounded-full border px-3 py-1.5 text-left text-xs font-medium transition ${
                        activeQuestionId === q.id
                          ? "border-teal-400/50 bg-teal-500/25 text-teal-100"
                          : "border-white/15 bg-white/[0.06] text-white/80 hover:border-white/30"
                      }`}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
                <div className="mt-auto min-h-[120px] space-y-2 rounded-lg border border-white/10 bg-black/25 p-3">
                  {activeAnswer ? (
                    <>
                      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-white/40">You</p>
                      <p className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white/90">{activeAnswer.question}</p>
                      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-teal-200/80">Assistant</p>
                      <p className="rounded-lg border border-teal-400/20 bg-teal-950/40 px-3 py-2 text-sm leading-relaxed text-white/85">
                        {activeAnswer.answer}
                      </p>
                    </>
                  ) : (
                    <p className="py-6 text-center text-xs text-white/45">Select a question to see a grounded-style reply.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JstorRag;

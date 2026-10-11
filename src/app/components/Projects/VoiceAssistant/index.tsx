"use client";

import { useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  FileText,
  Mic,
  Play,
  RotateCcw,
  Square,
  Volume2,
} from "lucide-react";
import { samples } from "./samples";
import { useGuidedReplay } from "./useGuidedReplay";
import styles from "./voiceAssistant.module.css";

const steps = [
  {
    phase: "listening",
    title: "Listen",
    activeTitle: "Listening",
    tool: "Silero VAD",
    icon: Mic,
  },
  {
    phase: "transcribing",
    title: "Transcribe",
    activeTitle: "Transcribing",
    tool: "faster-whisper",
    icon: FileText,
  },
  {
    phase: "generating",
    title: "Generate",
    activeTitle: "Generating",
    tool: "Ollama · Phi",
    icon: BrainCircuit,
  },
  {
    phase: "speaking",
    title: "Speak",
    activeTitle: "Speaking",
    tool: "Piper",
    icon: Volume2,
  },
] as const;

function Waveform({
  values,
  progress,
  active,
}: {
  values: readonly number[];
  progress: number;
  active: boolean;
}) {
  return (
    <div className={styles.waveform} aria-hidden="true">
      {values.map((value, index) => (
        <span
          key={index}
          className={`${styles.bar} ${index / values.length < progress ? styles.played : ""} ${active ? styles.activeBar : ""}`}
          style={{ height: `${8 + value * 76}%` }}
        />
      ))}
    </div>
  );
}

export default function VoiceAssistant() {
  const [selected, setSelected] = useState(0);
  const replay = useGuidedReplay();
  const sample = samples[selected];
  const running = replay.phase !== "ready" && replay.phase !== "complete";
  const activeIndex = steps.findIndex((step) => step.phase === replay.phase);
  const completed = replay.phase === "complete";
  const currentStep = steps[Math.max(0, activeIndex)];
  const CurrentIcon = completed ? Check : currentStep.icon;
  const isSpeaking = replay.phase === "speaking";
  const waveform = isSpeaking || completed ? sample.answerWaveform : sample.questionWaveform;
  const status = completed
    ? "Reply delivered"
    : running
      ? `${currentStep.activeTitle}…`
      : "Ready when you are";

  return (
    <div className={`${styles.demo} text-white`}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-2xl font-semibold sm:text-3xl">Choose a question, press play, and follow the four steps inside a local voice assistant.</h4>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Sample questions">
          {samples.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              onClick={() => {
                replay.reset();
                setSelected(index);
              }}
              className={`${styles.sample} ${selected === index ? styles.selected : ""}`}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      <ol className={styles.steps} aria-label="Voice assistant pipeline">
        {steps.map((step, index) => {
          const active = activeIndex === index;
          const done = completed || (activeIndex > index);
          const Icon = step.icon;
          return (
            <li key={step.phase} className={`${styles.step} ${active ? styles.activeStep : ""} ${done ? styles.doneStep : ""}`} aria-current={active ? "step" : undefined}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className={styles.stepNumber}>{done ? <Check size={14} aria-hidden="true" /> : `0${index + 1}`}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon size={21} className={active || done ? "text-teal-200" : "text-white/45"} aria-hidden="true" />
                <span className="font-semibold">{step.title}</span>
              </div>
              <p className="mt-2 text-xs text-white/55">{step.tool}</p>
              {index < steps.length - 1 ? <ArrowRight className={styles.connector} size={18} aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>

      <div className={styles.player}>
        <div className="flex items-center gap-3">
          <div className={`${styles.statusIcon} ${running ? styles.runningIcon : ""}`}><CurrentIcon size={25} aria-hidden="true" /></div>
          <div>
            {running || completed ? (
              <p className="text-xs text-white/50">
                {running ? `Step ${activeIndex + 1} of 4` : "All four steps complete"}
              </p>
            ) : null}
            <p className="mt-1 text-lg font-semibold" role="status">{status}</p>
          </div>
        </div>

        <Waveform values={waveform} progress={completed ? 1 : replay.progress} active={replay.phase === "listening" || isSpeaking} />
        {running ? (
          <p className="mb-5 text-center text-xs text-white/50">
            {isSpeaking ? "Playing the Piper reply" : replay.phase === "listening" ? "Playing the sample question" : "Processing the captured question"}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={styles.playButton} onClick={() => running ? replay.reset() : void replay.run(sample)}>
            {running ? <Square size={17} aria-hidden="true" /> : completed ? <RotateCcw size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
            {running ? "Stop demo" : completed ? "Replay demo" : "Start demo"}
          </button>
        </div>
        {replay.error ? <p className="mt-4 text-sm text-rose-200" role="alert">{replay.error}</p> : null}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/45">Pipeline stages and generation are illustrated, rather than live model inference.</p>
    </div>
  );
}

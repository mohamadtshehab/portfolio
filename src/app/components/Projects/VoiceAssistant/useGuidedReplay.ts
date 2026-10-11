"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { samples } from "./samples";

export type ReplayPhase =
  | "ready"
  | "listening"
  | "transcribing"
  | "generating"
  | "speaking"
  | "complete";

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Replay stopped", "AbortError"));
    };
    const timer = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
  });
}

export function useGuidedReplay() {
  const [phase, setPhase] = useState<ReplayPhase>("ready");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      audioRef.current?.pause();
      audioRef.current?.removeAttribute("src");
    };
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    audioRef.current?.pause();
    setPhase("ready");
    setProgress(0);
    setError("");
  }, []);

  async function run(sample: (typeof samples)[number]) {
    reset();
    const controller = new AbortController();
    controllerRef.current = controller;
    const { signal } = controller;
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

    function playClip(src: string) {
      return new Promise<void>((resolve, reject) => {
        let settled = false;
        const cleanup = () => {
          clearTimeout(loadTimer);
          audio.removeEventListener("playing", onPlaying);
          audio.removeEventListener("timeupdate", onProgress);
          audio.removeEventListener("ended", onEnd);
          audio.removeEventListener("error", onError);
          signal.removeEventListener("abort", onAbort);
        };
        const onProgress = () => {
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setProgress(audio.currentTime / audio.duration);
          }
        };
        const onPlaying = () => clearTimeout(loadTimer);
        const onEnd = () => {
          if (settled) return;
          settled = true;
          cleanup();
          setProgress(1);
          resolve();
        };
        const onError = () => {
          if (settled) return;
          settled = true;
          cleanup();
          audio.pause();
          reject(new Error("The audio could not be played. Press Start demo to try again."));
        };
        const onAbort = () => {
          if (settled) return;
          settled = true;
          cleanup();
          audio.pause();
          reject(new DOMException("Replay stopped", "AbortError"));
        };
        const loadTimer = window.setTimeout(onError, 12000);
        setProgress(0);
        audio.addEventListener("playing", onPlaying);
        audio.addEventListener("timeupdate", onProgress);
        audio.addEventListener("ended", onEnd);
        audio.addEventListener("error", onError);
        signal.addEventListener("abort", onAbort, { once: true });
        audio.src = src;
        // The first clip starts directly from the visitor's click. Reuse this
        // media element for the answer so playback retains user activation.
        void audio.play().catch(onError);
        if (signal.aborted) onAbort();
      });
    }

    try {
      setPhase("listening");
      await playClip(sample.questionAudio);
      setPhase("transcribing");
      await wait(1350, signal);
      setPhase("generating");
      await wait(500 + sample.answer.split(" ").length * 180, signal);
      setPhase("speaking");
      await playClip(sample.answerAudio);
      setPhase("complete");
      controllerRef.current = null;
    } catch (cause) {
      if (signal.aborted) return;
      setPhase("ready");
      setError(cause instanceof Error ? cause.message : "The demo could not play. Please try again.");
      controllerRef.current = null;
    }
  }

  return { phase, progress, error, run, reset };
}

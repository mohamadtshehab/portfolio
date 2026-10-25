'use client';

import { useState } from 'react';
import { Activity, ArrowRight, BarChart3, Server, ShieldCheck } from 'lucide-react';

const stages = [
  {
    label: 'Idle',
    replicas: 1,
    active: 1,
    queued: 0,
    heading: 'Start with one healthy replica',
    detail: 'The gateway sends requests to an available Ollama replica. Each replica accepts up to two concurrent queries.',
    decision: 'Hold minimum capacity',
  },
  {
    label: 'Burst arrives',
    replicas: 1,
    active: 2,
    queued: 3,
    heading: 'The shared queue absorbs the burst',
    detail: 'At least two queued requests or 80% utilization asks the controller to add capacity. The gateway queues up to six waiting queries.',
    decision: 'Scale-up threshold reached',
  },
  {
    label: 'Scaled up',
    replicas: 4,
    active: 7,
    queued: 2,
    heading: 'Ready replicas take new work',
    detail: 'The controller checks Docker health and model availability before the gateway routes traffic to a new replica. The stack scales between one and four replicas by default.',
    decision: 'Route to the least busy replica',
  },
  {
    label: 'Demand falls',
    replicas: 4,
    active: 0,
    queued: 0,
    heading: 'Drain safely before removing capacity',
    detail: 'With an empty queue and at most 25% utilization, the controller waits for the scale-down cooldown, drains a replica, and stops it only after its active requests finish.',
    decision: 'Drain, then scale down',
  },
] as const;

export default function AutoscalingLlmApi() {
  const [selectedStage, setSelectedStage] = useState(0);
  const stage = stages[selectedStage];
  const capacity = stage.replicas * 2;
  const utilization = Math.round((stage.active / capacity) * 100);

  return (
    <div className="mx-auto w-full max-w-5xl text-white">
      <div className="overflow-hidden rounded-xl border border-teal-400/25 bg-[#081c20]/90">
        <div className="border-b border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Server className="mt-0.5 shrink-0 text-teal-200" size={22} aria-hidden="true" />
            <div>
              <h4 className="text-xl font-semibold">Follow a scaling decision</h4>
              <p className="mt-1 text-sm leading-relaxed text-white/65">
                Explore how the default policy responds as demand rises and falls.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Scaling stages">
            {stages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={selectedStage === index}
                onClick={() => setSelectedStage(index)}
                className={`rounded-full border px-3 py-2 text-xs font-medium transition sm:text-sm ${selectedStage === index
                  ? 'border-teal-300/60 bg-teal-400/20 text-teal-100'
                  : 'border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white'}`}
              >
                {index + 1}. {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/45">Gateway capacity</p>
              <span className="rounded-full bg-teal-400/10 px-2.5 py-1 text-xs text-teal-100">{stage.decision}</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-2xl font-semibold text-white">{stage.replicas}</p>
                <p className="mt-1 text-xs text-white/55">healthy replicas</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-2xl font-semibold text-white">{stage.active}/{capacity}</p>
                <p className="mt-1 text-xs text-white/55">active / slots</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-2xl font-semibold text-white">{stage.queued}/6</p>
                <p className="mt-1 text-xs text-white/55">waiting / queue</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-white/60">
              <span>Utilization</span><span>{utilization}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" aria-label={`${utilization}% utilization`} role="img">
              <div className="h-full rounded-full bg-teal-400 transition-all duration-300" style={{ width: `${utilization}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2" aria-label={`${stage.replicas} healthy replicas`}>
              {[1, 2, 3, 4].map((replica) => (
                <div key={replica} className={`rounded-lg border px-2 py-3 text-center text-xs ${replica <= stage.replicas
                  ? 'border-teal-400/40 bg-teal-400/10 text-teal-100'
                  : 'border-white/10 bg-white/[0.025] text-white/35'}`}>
                  <Server size={18} className="mx-auto mb-2" aria-hidden="true" />
                  #{replica}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-200/70">Controller decision</p>
            <h5 className="mt-3 text-lg font-semibold">{stage.heading}</h5>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.detail}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/50">
              <span>FastAPI gateway</span><ArrowRight size={14} aria-hidden="true" />
              <span>Python controller</span><ArrowRight size={14} aria-hidden="true" />
              <span>Ollama replicas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/15 bg-white/[0.04] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-sky-200" size={22} aria-hidden="true" />
          <div>
            <h4 className="text-lg font-semibold">Designed to handle changing demand</h4>
            <p className="mt-1 text-sm leading-relaxed text-white/65">
              The gateway, controller, and monitoring stack work together throughout each scaling cycle.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <Activity size={20} className="text-teal-200" aria-hidden="true" />
            <h5 className="mt-3 font-semibold">Controlled request flow</h5>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              API-key authentication, least-connections routing, a shared FIFO queue, and retries across healthy replicas.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <ShieldCheck size={20} className="text-sky-200" aria-hidden="true" />
            <h5 className="mt-3 font-semibold">Safe replica changes</h5>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Readiness checks before adding replicas and request draining before removal, with controller fault tests.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <BarChart3 size={20} className="text-amber-200" aria-hidden="true" />
            <h5 className="mt-3 font-semibold">Visible and measurable</h5>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Prometheus metrics, a Grafana capacity dashboard, and repeatable Locust comparisons of fixed and autoscaled capacity.
            </p>
            </div>
        </div>
      </div>
    </div>
  );
}

interface UsageSummaryProps {
  totalGuides: number
  approxBytes: number
}

function formatKilobytes(bytes: number): string {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export default function UsageSummary({ totalGuides, approxBytes }: UsageSummaryProps) {
  return (
    <section className="rounded-[2rem] border border-stone-200 bg-[linear-gradient(135deg,#f6f1e8,white)] p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
        Usage summary
      </p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p data-testid="usage-summary-guides" className="text-3xl font-semibold text-stone-900">
            {totalGuides}
          </p>
          <p className="text-sm text-stone-600">saved guides</p>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 text-right shadow-sm">
          <p data-testid="usage-summary-storage" className="text-lg font-semibold text-stone-900">
            {formatKilobytes(approxBytes)}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">approx storage</p>
        </div>
      </div>
    </section>
  )
}

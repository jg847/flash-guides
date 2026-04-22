interface WatermarkOverlayProps {
  isWatermark: boolean
}

/**
 * WatermarkOverlay — renders a semi-transparent diagonal "PREVIEW — Sign up to save"
 * overlay on top of guest-generated guide content.
 *
 * The parent element must have `position: relative` (or `relative` in Tailwind).
 */
export default function WatermarkOverlay({ isWatermark }: WatermarkOverlayProps) {
  if (!isWatermark) return null

  return (
    <div
      aria-hidden="true"
      data-testid="watermark-overlay"
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <span className="select-none rotate-[-35deg] text-4xl font-bold tracking-widest text-gray-400/40 whitespace-nowrap">
        PREVIEW — Sign up to save
      </span>
    </div>
  )
}

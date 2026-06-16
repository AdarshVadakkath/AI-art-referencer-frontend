import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DownloadIcon,
  HeartIcon,
  SparklesIcon,
  ImageIcon,
  Loader2Icon,
  AlertCircleIcon,
} from "lucide-react"

export function GeneratedReferences({ result, isLoading, error, step, onPreviewImage }) {
  // The /generate endpoint returns an array of references directly
  const references = Array.isArray(result) ? result : result?.references || []
  const hasResult = references.length > 0

  return (
    <Card className="flex h-full flex-col overflow-y-auto relative">
      {/* Decorative toon circle */}
      <div className="toon-deco-circle w-40 h-40 bg-toon-lavender bottom-4 right-4" />

      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-3 border-toon-dark bg-toon-soft rounded-t-[13px]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <CardTitle className="text-base" style={{ fontFamily: 'var(--font-display)' }}>
              AI Generated References
            </CardTitle>
            <span className="toon-chip bg-toon-yellow text-toon-dark">Step 2</span>
          </div>
          <p className="text-xs text-toon-dark/60 font-nunito-sans">
            {hasResult
              ? "Here are unique reference concepts for your scene."
              : "Upload an image and generate to see results."}
          </p>
        </div>
        {hasResult && (
          <button className="toon-btn-ghost flex items-center justify-center gap-2 text-xs !py-2 !px-3 w-full sm:w-auto">
            <DownloadIcon className="size-3.5" />
            <span>Download All</span>
          </button>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 pt-4">
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border-3 border-dashed border-toon-dark/20 bg-toon-soft py-16 relative overflow-hidden">
            <div className="toon-spinner mb-2" />
            <div className="text-center relative z-10">
              <p className="text-sm font-extrabold text-toon-purple font-nunito">
                Analyzing your viewport...
              </p>
              <p className="text-xs text-toon-dark/50 mt-1 font-nunito-sans">
                {step || "Rendering Reference Concept Map"}
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl py-16 toon-error-banner">
            <AlertCircleIcon className="size-10 text-toon-red/60" />
            <div className="text-center">
              <p className="text-sm font-extrabold text-toon-red font-nunito">
                Something went wrong
              </p>
              <p className="text-xs text-toon-dark/50 mt-1 max-w-xs font-nunito-sans">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasResult && (
          <>
            {references.map((ref, index) => (
              <div key={ref.id || index} className="rounded-xl border-3 border-toon-dark bg-white shadow-toon-sm p-3 sm:p-4 transition-all duration-200 toon-card-hover relative overflow-hidden">
                {/* Decorative circle in corner */}
                <div className="toon-deco-circle w-20 h-20 bg-toon-teal -top-4 -right-4" />

                {/* Header */}
                <div className="mb-3 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-toon-purple text-xs font-nunito font-extrabold text-white border-2 border-toon-dark shadow-toon-sm">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-toon-dark font-nunito">
                        {ref.conceptName || "Generated Reference"}
                      </p>
                      <p className="text-[10px] text-toon-dark/50 font-nunito-sans">
                        AI-generated concept
                      </p>
                    </div>
                  </div>
                  <span className="toon-chip bg-toon-teal text-toon-dark text-[9px]">
                    Complete
                  </span>
                </div>

                {/* Image */}
                <div 
                  className="relative mb-4 overflow-hidden rounded-xl border-3 border-toon-dark shadow-toon-sm aspect-[16/10] group cursor-pointer transition-all hover:opacity-90 active:scale-[0.99]"
                  onClick={() => ref.imageUrl && onPreviewImage?.(ref.imageUrl, ref.conceptName || "Generated Concept", ref.conceptPrompt)}
                >
                  {ref.imageUrl ? (
                    <img
                      src={ref.imageUrl}
                      alt={ref.conceptName || "Generated reference"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-toon-soft text-toon-dark/40">
                      <ImageIcon className="size-8 opacity-40" />
                      <p className="text-[10px] font-nunito font-bold">Image unavailable</p>
                    </div>
                  )}
                  <button
                    className="absolute top-2 right-2 size-8 rounded-full bg-white border-2 border-toon-dark shadow-toon-sm hover:bg-toon-soft flex items-center justify-center transition-colors text-toon-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Heart/Favorite feature placeholder or behavior if needed
                    }}
                  >
                    <HeartIcon className="size-4 hover:fill-toon-red hover:text-toon-red transition-colors" />
                  </button>
                </div>

                {/* Concept Prompt */}
                {ref.conceptPrompt && (
                  <div className="mb-4">
                    <p className="toon-label text-[10px] mb-1.5">
                      Concept Prompt
                    </p>
                    <p className="text-xs text-toon-dark/70 leading-relaxed font-nunito-sans bg-toon-soft p-2.5 rounded-lg border-2 border-toon-dark/10">
                      {ref.conceptPrompt}
                    </p>
                  </div>
                )}

                {/* View Details */}
                <button 
                  onClick={() => ref.imageUrl && onPreviewImage?.(ref.imageUrl, ref.conceptName || "Generated Concept", ref.conceptPrompt)}
                  className="toon-btn-ghost w-full text-xs !py-2"
                >
                  Inspect Artifact
                </button>
              </div>
            ))}
          </>
        )}

        {/* Empty state */}
        {!isLoading && !hasResult && !error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border-3 border-dashed border-toon-dark/20 py-16 bg-toon-soft/50 relative overflow-hidden">
            <SparklesIcon className="size-10 text-toon-lavender mb-1" />
            <p className="text-xs text-toon-dark/50 text-center max-w-xs px-4 font-nunito font-bold">
              Awaiting viewport input. Click "Generate" to populate your reference board.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

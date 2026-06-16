import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  UploadCloudIcon,
  Replace,
  Loader2Icon,
  SendIcon,
  SparklesIcon,
  CheckCircle2Icon,
  RotateCcwIcon,
} from "lucide-react"

export function ImageUploader({
  onSend,
  onGenerate,
  onReset,
  isSending,
  isSent,
  sendError,
  isGenerating,
  onPreviewImage,
}) {
  const [preview, setPreview] = React.useState(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [fileName, setFileName] = React.useState("")
  const [file, setFile] = React.useState(null)
  const [sceneInfo, setSceneInfo] = React.useState("")
  const [style, setStyle] = React.useState("auto")
  const inputRef = React.useRef(null)

  function handleFile(f) {
    if (!f || !f.type.startsWith("image/")) return
    setFileName(f.name)
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    handleFile(f)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleChange(e) {
    const f = e.target.files?.[0]
    handleFile(f)
  }

  function handleSend() {
    if (!file || !onSend) return
    const title = sceneInfo.trim() || fileName.replace(/\.[^.]+$/, "")
    onSend({
      file,
      title,
      prompt: sceneInfo.trim() || undefined,
      moods: style === "auto" ? ["auto"] : [style],
    })
  }

  function handleReset() {
    setPreview(null)
    setFileName("")
    setFile(null)
    setSceneInfo("")
    setStyle("auto")
    if (inputRef.current) inputRef.current.value = ""
    onReset?.()
  }

  const isLocked = isSending || isSent || isGenerating
  const canSend = !!file && !isSending && !isSent
  const canGenerate = isSent && !isGenerating

  return (
    <Card className="h-full overflow-y-auto relative">
      {/* Decorative toon circle */}
      <div className="toon-deco-circle w-32 h-32 bg-toon-yellow top-4 right-4" />

      <CardHeader className="pb-3 border-b-3 border-toon-dark bg-toon-yellow rounded-t-[13px]">
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-base" style={{ fontFamily: 'var(--font-display)' }}>
            Upload Viewport Image
          </CardTitle>
          <span className="toon-chip bg-toon-soft text-toon-purple">Step 1</span>
        </div>
        <p className="text-xs text-toon-dark/60 font-nunito-sans">
          Upload a viewport screenshot from Blender or any 3D software.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 pt-4">
        {/* Upload drop zone */}
        {!preview && (
          <div
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-3 border-dashed px-4 py-6 sm:py-8 transition-all duration-200 ${
              isDragging
                ? "border-toon-purple bg-toon-soft scale-[1.01]"
                : "border-toon-dark/40 hover:border-toon-dark hover:bg-toon-yellow/30"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
          >
            <div
              className={`flex size-12 sm:size-14 items-center justify-center rounded-full border-3 border-toon-dark shadow-toon-sm transition-colors ${
                isDragging ? "bg-toon-lavender" : "bg-toon-soft"
              }`}
            >
              <UploadCloudIcon
                className={`size-6 transition-colors ${
                  isDragging ? "text-toon-purple" : "text-toon-dark/60"
                }`}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-nunito font-bold text-toon-dark">
                Drag & drop your image here
              </p>
              <p className="text-sm text-toon-dark/70 font-nunito-sans">
                or{" "}
                <span className="font-bold text-toon-purple cursor-pointer hover:underline">
                  click to browse
                </span>
              </p>
              <p className="mt-1 text-xs text-toon-dark/50 font-nunito-sans">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        )}

        {/* Image preview */}
        {preview && (
          <div className="flex flex-col gap-3">
            <div 
              className="overflow-hidden rounded-xl border-3 border-toon-dark shadow-toon-sm cursor-pointer transition-all hover:opacity-90 active:scale-[0.99]"
              onClick={() => onPreviewImage?.(preview, fileName || "Uploaded Preview")}
            >
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full object-cover"
                style={{ maxHeight: "220px" }}
              />
            </div>
            {!isLocked && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
              >
                <Replace className="mr-2 size-4" />
                Replace Image
              </Button>
            )}
          </div>
        )}

        {/* Scene Info */}
        <div className="flex flex-col gap-2">
          <Label className="toon-label text-[11px]">
            Scene Info (Optional)
          </Label>
          <textarea
            className="min-h-[60px] sm:min-h-[72px] w-full resize-none rounded-xl border-3 border-toon-dark bg-white px-3 py-2 text-sm font-nunito-sans text-toon-dark shadow-toon-sm placeholder:text-toon-dark/40 focus:outline-none focus:bg-toon-soft"
            placeholder="E.g. Fantasy forest, ruins, sci-fi outpost, etc."
            value={sceneInfo}
            onChange={(e) => setSceneInfo(e.target.value)}
            disabled={isLocked}
          />
        </div>

        {/* Style Preferences */}
        <div className="flex flex-col gap-2">
          <Label className="toon-label text-[11px]">
            Style Preferences
          </Label>
          <Select
            defaultValue="auto"
            value={style}
            onValueChange={setStyle}
            disabled={isLocked}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto (AI will choose styles)</SelectItem>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="cinematic">Cinematic</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="stylized">Stylized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Send error */}
        {sendError && (
          <p className="text-sm text-destructive text-center font-nunito font-bold">{sendError}</p>
        )}

        {/* Success banner after send */}
        {isSent && !isGenerating && (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 toon-success-banner">
            <CheckCircle2Icon className="size-5 text-toon-teal shrink-0" />
            <div>
              <p className="text-sm font-extrabold font-nunito text-toon-dark">Project created!</p>
              <p className="text-xs text-toon-dark/60 font-nunito-sans">Click "Generate References" to run the AI pipeline.</p>
            </div>
          </div>
        )}

        {/* Send button — Step 1 */}
        {!isSent && (
          <button
            className="toon-btn-primary w-full"
            onClick={handleSend}
            disabled={!canSend}
          >
            {isSending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <SendIcon className="size-4" />
                Initialize Project
              </span>
            )}
          </button>
        )}

        {/* Generate button — Step 2 */}
        {isSent && (
          <button
            className="toon-btn-primary w-full"
            onClick={onGenerate}
            disabled={!canGenerate}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <SparklesIcon className="size-4" />
                Generate References
              </span>
            )}
          </button>
        )}

        {/* Reset / New project */}
        {isSent && !isGenerating && (
          <button
            className="toon-btn-ghost w-full"
            onClick={handleReset}
          >
            <span className="flex items-center justify-center gap-2">
              <RotateCcwIcon className="size-4" />
              Start New Project
            </span>
          </button>
        )}

        {!isSent && !isSending && (
          <p className="text-center text-[11px] text-toon-dark/50 font-nunito font-bold -mt-2">
            Transaction cost: <span className="font-extrabold text-toon-purple">3 Credits</span>
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  )
}

import { useState } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { GeneratedReferences } from "@/components/generated-references";
import { useCreateProject, useGenerateProject } from "@/hooks/use-projects";
import {
  CameraIcon,
  SparklesIcon,
  DownloadIcon,
  CircleUserRoundIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser, useClerk } from "@clerk/clerk-react";

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const fallbackText = user
    ? user.firstName
      ? user.firstName.slice(0, 2).toUpperCase()
      : user.primaryEmailAddress?.emailAddress?.slice(0, 2).toUpperCase() ||
        "US"
    : "CN";

  const displayName = user
    ? user.fullName ||
      user.firstName ||
      user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
      "User"
    : "shadcn";

  const displayEmail =
    user?.primaryEmailAddress?.emailAddress || "m@example.com";

  const [projectId, setProjectId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // { url: string, title: string, prompt?: string }
  const [showProfile, setShowProfile] = useState(false);

  const createProject = useCreateProject();
  const generateProject = useGenerateProject();

  const handleSend = ({ file, title, prompt, moods }) => {
    createProject.mutate(
      { file, title, prompt, moods },
      {
        onSuccess: (data) => {
          setProjectId(data.id);
        },
      },
    );
  };

  const handleGenerate = () => {
    if (!projectId) return;
    generateProject.mutate(projectId);
  };

  const handleReset = () => {
    setProjectId(null);
    createProject.reset();
    generateProject.reset();
  };

  return (
    <div className="flex flex-1 flex-col gap-3 p-3 min-h-screen relative bg-toon-cream">
      {/* Toon Header Card */}
      {/* Toon Header Card */}
      <div className="toon-enter toon-enter-1 relative">
        <div className="flex flex-row items-center justify-between gap-3 rounded-2xl border-3 border-toon-dark bg-white shadow-toon px-4 py-3 sm:px-6 sm:py-4 min-h-[90px] relative z-10 overflow-hidden">
          {/* Decorative blobs */}
          <div className="toon-deco-circle w-40 h-40 bg-toon-yellow -top-16 -right-8 opacity-60" />
          <div className="toon-deco-circle w-20 h-20 bg-toon-lavender -bottom-8 right-48 opacity-40" />

          {/* Left: Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-4 relative z-10 min-w-0 pr-12 sm:pr-0">
            {/* Icon Badge */}
            <div className="flex size-10 sm:size-12 items-center justify-center rounded-2xl bg-toon-dark border-3 border-toon-dark shadow-toon-sm flex-shrink-0">
              <CameraIcon className="size-5 sm:size-6 text-toon-yellow" />
            </div>

            {/* Title block */}
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1
                  className="text-base sm:text-xl text-toon-dark leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                  }}
                >
                  AI Art Referencer
                </h1>
                <span className="toon-chip bg-toon-yellow text-toon-dark text-[9px] sm:text-[10px] px-1.5 py-0.5">
                  v1.0
                </span>
                <span className="toon-chip bg-toon-teal text-white text-[9px] sm:text-[10px] px-1.5 py-0.5">
                  ✦ Live
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-toon-dark/50 font-nunito-sans leading-tight truncate sm:whitespace-normal">
                Upload screenshots · Generate AI references · Export concepts
              </p>
            </div>
          </div>

          {/* Center: Breadcrumb trail (optional, toon style) */}
          <div className="hidden xl:flex items-center gap-2 relative z-10">
            {["Upload", "Process", "Generate", "Export"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-toon-dark font-nunito font-extrabold text-[11px] shadow-toon-sm ${
                    i === 0
                      ? "bg-toon-purple text-white"
                      : "bg-white text-toon-dark/40"
                  }`}
                >
                  <span
                    className={`size-4 rounded-full border-2 border-toon-dark flex items-center justify-center text-[9px] font-black ${
                      i === 0 ? "bg-toon-yellow text-toon-dark" : "bg-toon-soft"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {step}
                </div>
                {i < 3 && (
                  <div className="w-4 h-[2px] bg-toon-dark/20 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* Right: User Icon Dropdown */}
          <div className="absolute top-3 right-4 sm:relative sm:top-auto sm:right-auto z-10 flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border-3 border-toon-dark bg-white p-1 shadow-toon-sm hover:bg-toon-soft transition-all duration-200 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus:outline-none">
                  <Avatar className="h-9 w-9 rounded-full border-2 border-toon-dark">
                    <AvatarImage
                      src={user?.imageUrl || "/avatars/shadcn.jpg"}
                      alt={displayName}
                    />
                    <AvatarFallback className="rounded-full font-black text-xs bg-toon-purple text-white">
                      {fallbackText}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl border-3 border-toon-dark bg-white shadow-toon p-1"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-2 font-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-full border-2 border-toon-dark">
                      <AvatarImage
                        src={user?.imageUrl || "/avatars/shadcn.jpg"}
                        alt={displayName}
                      />
                      <AvatarFallback className="rounded-full bg-toon-purple text-white text-[10px]">
                        {fallbackText}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black text-toon-dark font-nunito leading-tight">
                        {displayName}
                      </span>
                      <span className="text-[10px] text-toon-dark/50 font-nunito-sans leading-none">
                        {displayEmail}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-toon-dark/15 h-[2px] my-1" />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-extrabold text-toon-dark hover:bg-toon-soft cursor-pointer"
                  >
                    <CircleUserRoundIcon className="size-4 text-toon-purple" />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-toon-dark/15 h-[2px] my-1" />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-extrabold text-toon-red hover:bg-toon-red/10 cursor-pointer"
                >
                  <LogOutIcon className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Toon divider */}
      <div className="toon-divider toon-enter toon-enter-2"></div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0 relative z-10">
        <div className="toon-enter toon-enter-3">
          <ImageUploader
            onSend={handleSend}
            onGenerate={handleGenerate}
            onReset={handleReset}
            isSending={createProject.isPending}
            isSent={createProject.isSuccess}
            sendError={createProject.error?.message}
            isGenerating={generateProject.isPending}
            onPreviewImage={(url, title) => setPreviewImage({ url, title })}
          />
        </div>
        <div className="toon-enter toon-enter-4">
          <GeneratedReferences
            result={generateProject.data}
            isLoading={generateProject.isPending}
            error={generateProject.error?.message}
            step={
              generateProject.isPending
                ? "Running AI pipeline..."
                : createProject.isPending
                  ? "Creating project..."
                  : ""
            }
            onPreviewImage={(url, title, prompt) =>
              setPreviewImage({ url, title, prompt })
            }
          />
        </div>
      </div>

      {/* Toon Image Preview Modal */}
      {previewImage && (
        <div
          className="toon-modal-backdrop"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="toon-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-3 border-toon-dark bg-toon-yellow">
              <h3 className="text-lg font-black text-toon-dark leading-none">
                {previewImage.title || "Image Preview"}
              </h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="size-8 rounded-full border-2 border-toon-dark bg-white hover:bg-toon-soft flex items-center justify-center font-black text-toon-dark transition-all shadow-toon-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col gap-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Full Image */}
              <div className="rounded-xl border-3 border-toon-dark shadow-toon-sm overflow-hidden bg-white max-h-[280px] sm:max-h-[450px] flex justify-center items-center">
                <img
                  src={previewImage.url}
                  alt={previewImage.title || "Full Preview"}
                  className="max-w-full max-h-[280px] sm:max-h-[450px] object-contain"
                />
              </div>

              {/* Optional Concept Prompt details */}
              {previewImage.prompt && (
                <div className="flex flex-col gap-1.5">
                  <span className="font-extrabold text-xs text-toon-purple uppercase tracking-wider font-nunito">
                    Concept Prompt
                  </span>
                  <p className="text-xs text-toon-dark/80 leading-relaxed bg-toon-soft p-3 rounded-xl border-2 border-toon-dark/10 font-nunito-sans font-medium">
                    {previewImage.prompt}
                  </p>
                </div>
              )}
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t-3 border-toon-dark bg-toon-soft flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setPreviewImage(null)}
                className="toon-btn-ghost !py-2.5 !px-5 text-sm w-full sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(previewImage.url);
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = blobUrl;
                    const name = (previewImage.title || "toon-image")
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    link.download = `${name}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                  } catch (error) {
                    console.error(
                      "Fetch download failed, opening in new tab:",
                      error,
                    );
                    window.open(previewImage.url, "_blank");
                  }
                }}
                className="toon-btn-primary flex items-center justify-center gap-2 !py-2.5 !px-6 text-sm w-full sm:w-auto"
              >
                <DownloadIcon className="size-4" />
                <span>Download Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div
          className="toon-modal-backdrop"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="toon-modal-content !max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-3 border-toon-dark bg-toon-purple">
              <h3 className="text-lg font-black text-white leading-none">
                Artist Pass
              </h3>
              <button
                onClick={() => setShowProfile(false)}
                className="size-8 rounded-full border-2 border-toon-dark bg-white hover:bg-toon-soft flex items-center justify-center font-black text-toon-dark transition-all shadow-toon-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 bg-toon-soft flex flex-col gap-6 relative">
              {/* Retro Badge Card */}
              <div className="relative bg-white border-3 border-toon-dark rounded-2xl shadow-toon overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
                {/* Decorative retro pass header stripe */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-toon-yellow via-toon-red to-toon-purple border-b-2 border-toon-dark" />

                {/* Left Side: Photo & Stamp */}
                <div className="flex flex-col items-center gap-3 mt-2">
                  <div className="relative group">
                    {/* Retro photo tape styling */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-toon-yellow/80 border-2 border-toon-dark -rotate-6 shadow-sm z-10" />

                    <div className="p-2 bg-toon-cream border-2 border-toon-dark shadow-toon-sm rotate-1 hover:rotate-0 transition-transform duration-200">
                      <img
                        src={user?.imageUrl || "/avatars/shadcn.jpg"}
                        alt={displayName}
                        className="size-20 sm:size-28 rounded-lg border-2 border-toon-dark object-cover"
                      />
                    </div>

                    {/* Circular Verified Stamp */}
                    <div className="absolute -bottom-3 -right-3 size-12 rounded-full border-2 border-dashed border-toon-red bg-white flex items-center justify-center -rotate-12 shadow-toon-sm font-black text-[9px] text-toon-red font-display select-none">
                      CREATOR
                    </div>
                  </div>

                  <span className="toon-chip bg-toon-teal text-white text-[10px] font-black mt-2">
                    ✦ ACTIVE
                  </span>
                </div>

                {/* Right Side: Pass Details */}
                <div className="flex-1 flex flex-col justify-between gap-4 mt-2">
                  <div className="flex flex-col gap-3">
                    {/* Pass Title */}
                    <div>
                      <span className="text-[10px] font-black text-toon-dark/40 uppercase tracking-widest font-nunito">
                        Official Membership Pass
                      </span>
                      <h4 className="text-xl font-black text-toon-dark leading-tight font-display">
                        {displayName}
                      </h4>
                    </div>

                    {/* Info Rows */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-toon-dark/40 uppercase tracking-wider font-nunito leading-none">
                          Email Address
                        </span>
                        <span className="text-xs font-bold text-toon-dark font-nunito-sans">
                          {displayEmail}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-toon-dark/40 uppercase tracking-wider font-nunito leading-none">
                          Joined Date
                        </span>
                        <span className="text-xs font-bold text-toon-purple font-nunito-sans">
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                undefined,
                                { dateStyle: "long" },
                              )
                            : "N/A"}
                        </span>
                      </div>

                      {user?.externalAccounts &&
                        user.externalAccounts.length > 0 && (
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-toon-dark/40 uppercase tracking-wider font-nunito leading-none mb-1">
                              Auth Method
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {user.externalAccounts.map((acc) => (
                                <span
                                  key={acc.id}
                                  className="toon-chip bg-toon-yellow text-toon-dark text-[9px] capitalize py-0 px-2 font-extrabold"
                                >
                                  {acc.provider}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Creative Signature & Stamp Area */}
                  <div className="border-t-2 border-dashed border-toon-dark/15 pt-4 flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-black text-toon-dark/40 uppercase tracking-wider font-nunito">
                        Authorized Signature
                      </span>
                      <span
                        className="text-lg font-black text-toon-purple/90 tracking-wide font-display italic pl-1 select-none"
                        style={{
                          fontFamily: "'Caveat', cursive, var(--font-display)",
                        }}
                      >
                        {displayName}
                      </span>
                      <div className="w-28 h-[1px] bg-toon-dark/30 mt-[-2px]" />
                    </div>

                    {/* Retro Stamp */}
                    <div className="relative flex-shrink-0 flex items-center justify-center pr-1 select-none">
                      <div className="border-2 border-double border-toon-red/70 text-toon-red/80 font-black rounded-lg px-2.5 py-1 text-[10px] tracking-wider uppercase rotate-[-8deg] bg-white/40 shadow-sm flex items-center gap-1 font-display">
                        <span>✦ ART DEPT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t-3 border-toon-dark bg-toon-soft flex justify-end">
              <button
                onClick={() => setShowProfile(false)}
                className="toon-btn-primary !py-2 !px-6 text-sm w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

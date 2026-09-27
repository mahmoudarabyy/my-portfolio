import Image from "next/image";
import dimensions from "../data/image-dimensions.json";

export default function SiteImage({
  src = "/project-placeholder.svg",
  alt = "",
  sizes,
  preload = false,
  ...props
}) {
  if (/\.(mp4|webm)(?:[?#]|$)/i.test(src)) {
    return (
      <video
        src={src}
        aria-label={alt || undefined}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="metadata"
        {...props}
      />
    );
  }
  // Files uploaded through the unified CMS field lack Sanity image dimensions.
  // Native images preserve their real aspect ratio and animated GIF frames.
  if (src.includes("cdn.sanity.io/files/") || /\.gif(?:[?#]|$)/i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={preload ? "eager" : "lazy"}
        style={{ maxWidth: "100%", height: "auto" }}
        {...props}
      />
    );
  }
  const local = dimensions[src];
  const remote = src.match(/-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i);
  const width = local?.width || Number(remote?.[1]) || 1200;
  const height = local?.height || Number(remote?.[2]) || 800;
  const encoded = src.startsWith("/")
    ? src.split("/").map(encodeURIComponent).join("/")
    : src;
  return (
    <Image
      src={encoded}
      alt={alt}
      width={width}
      height={height}
      sizes={
        sizes || "(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 700px"
      }
      preload={preload}
      {...props}
    />
  );
}

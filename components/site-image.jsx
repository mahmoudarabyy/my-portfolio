import Image from "next/image";
import dimensions from "../data/image-dimensions.json";

export default function SiteImage({
  src = "/project-placeholder.svg",
  alt = "",
  sizes,
  preload = false,
  ...props
}) {
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

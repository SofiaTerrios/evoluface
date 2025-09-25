'use client';

type HominidViewerProps = {
  iframeUrl: string;
  description: string;
};

export default function HominidViewer({
  iframeUrl,
  description,
}: HominidViewerProps) {
  return (
    <iframe
      key={iframeUrl} // Use iframeUrl as key for re-rendering
      src={iframeUrl}
      title={description}
      width="100%"
      height="100%"
      allow="xr; xr-spatial-tracking; fullscreen"
      className="border-0"
    />
  );
}

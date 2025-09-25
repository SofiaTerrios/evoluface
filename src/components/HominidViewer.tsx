'use client';

type HominidViewerProps = {
  iframeUrl: string;
  description: string;
  key: string;
};

export default function HominidViewer({ iframeUrl, description }: HominidViewerProps) {
  return (
    <iframe
      src={iframeUrl}
      title={description}
      width="100%"
      height="100%"
      allow="xr; xr-spatial-tracking; fullscreen"
      className="border-0"
    />
  );
}

"use client";
import { useEffect, useRef } from "react";

type Props = {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
};

// Declare the adsbygoogle type on window so we don't need ts-ignore
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({ slot, style, format = "auto" }: Props) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      // Initialize and push a new ad request
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Swallow errors to avoid breaking the page if ads are blocked
    }
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle block"
      style={style ?? { display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? ""}
      data-ad-slot={slot}            // from AdSense
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

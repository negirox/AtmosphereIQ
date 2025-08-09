
"use client";

import { useEffect, useState } from 'react';

export default function AdSenseUnit() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 z-20">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '120px', height: '240px' }}
        data-ad-client="ca-pub-9187440931404634"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
}

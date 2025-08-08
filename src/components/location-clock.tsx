
"use client";

import { useState, useEffect } from 'react';

interface LocationClockProps {
  initialTimeEpoch: number;
}

export default function LocationClock({ initialTimeEpoch }: LocationClockProps) {
  const [time, setTime] = useState(new Date(initialTimeEpoch * 1000));

  useEffect(() => {
    setTime(new Date(initialTimeEpoch * 1000));
  }, [initialTimeEpoch]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [time]);


  if (!time) {
    return null;
  }
  
  return (
    <div className="text-center my-2">
        <p className="text-4xl font-bold font-mono text-foreground tabular-nums tracking-wider" style={{textShadow: '0 1px 3px hsla(var(--foreground), 0.1)'}}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </p>
    </div>
  );
}

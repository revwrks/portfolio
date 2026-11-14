"use client";

import React, { useState, useRef, useCallback } from "react";

const CIPHER_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789//<>_!@#%&*";

interface CipherScrambleTextProps {
  text: string;
  className?: string;
  speedMs?: number;
}

export function CipherScrambleText({
  text,
  className = "",
  speedMs = 28,
}: CipherScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isRunning = useRef(false);

  const handleMouseEnter = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        isRunning.current = false;
      }

      iteration += 1;
    }, speedMs);
  }, [text, speedMs]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`cursor-default select-none inline-block transition-colors duration-150 ${className}`}
    >
      {displayText}
    </span>
  );
}

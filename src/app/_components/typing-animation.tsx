"use client";

import { useState, useEffect } from "react";

type Props = {
  text: string;
  speed?: number;
};

export function TypingAnimation({ text, speed = 50 }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </>
  );
}

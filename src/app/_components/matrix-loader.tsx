"use client";

import { useEffect, useState } from "react";
import styles from "./matrix-loader.module.css";

export function MatrixLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent body scroll when loader is visible
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black flex items-start justify-center overflow-hidden"
      style={{
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'auto',
      }}
    >
      <MatrixRain />
    </div>
  );
}

function MatrixRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const updateColumns = () => {
      const columnCount = Math.floor(window.innerWidth / 20);
      setColumns(Array.from({ length: columnCount }, (_, i) => i));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 flex" style={{ height: '60%' }}>
      {columns.map((col) => (
        <MatrixColumn key={col} index={col} />
      ))}
    </div>
  );
}

function MatrixColumn({ index }: { index: number }) {
  const [drops, setDrops] = useState<Array<{ id: number; delay: number; speed: number }>>([]);
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    // Create initial drops
    const initialDrops = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      speed: 1 + Math.random() * 2,
    }));
    setDrops(initialDrops);

    // Add new drops periodically
    const interval = setInterval(() => {
      setDrops((prev) => {
        if (prev.length < 15) {
          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              delay: 0,
              speed: 1 + Math.random() * 2,
            },
          ];
        }
        return prev;
      });
    }, 200 + Math.random() * 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-0 flex flex-col items-center text-green-500 font-mono text-sm"
      style={{
        left: `${index * 20}px`,
      }}
    >
      {drops.map((drop) => (
        <div
          key={drop.id}
          className={`absolute ${styles.matrixDrop}`}
          style={{
            "--speed": `${drop.speed}s`,
            "--delay": `${drop.delay}s`,
            top: "-10px",
          } as React.CSSProperties}
        >
          {Array.from({ length: Math.floor(Math.random() * 15) + 10 }, (_, i) => (
            <div
              key={i}
              style={{
                color: i === 0 ? "#00ff00" : `rgba(0, 255, 0, ${Math.max(0.1, 1 - i * 0.1)})`,
                textShadow: i === 0 ? "0 0 5px #00ff00" : "none",
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


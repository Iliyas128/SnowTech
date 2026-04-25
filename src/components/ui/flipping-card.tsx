import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  /** If true (default), tapping/clicking the card also toggles the flipped state. */
  flipOnClick?: boolean;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
  flipOnClick = true,
}: FlippingCardProps) {
  const [clicked, setClicked] = useState(false);

  const handleToggle = () => {
    if (!flipOnClick) return;
    setClicked((c) => !c);
  };

  return (
    <div
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      role={flipOnClick ? "button" : undefined}
      tabIndex={flipOnClick ? 0 : -1}
      className={cn(
        "group/flipping-card [perspective:1000px] h-[var(--height)] w-[var(--width)]",
        flipOnClick && "cursor-pointer outline-none",
        className
      )}
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative h-full w-full rounded-xl border border-border bg-card shadow-lg transition-transform duration-700 [transform-style:preserve-3d]",
          // Hover-flip on desktop
          "group-hover/flipping-card:[transform:rotateY(180deg)]",
          // State-flip on tap (overrides hover when active)
          clicked && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-card text-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden">
          <div className="[transform:translateZ(40px)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-card text-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
          <div className="[transform:translateZ(40px)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * =========================================================================
 *                              TYPES & INTERFACES
 * =========================================================================
 */
export interface SectionCardProps {
  title: string;
  description: string;
  price?: string;
  className?: string;
  onBreak?: () => void;
  /** If true, the card will not respawn after breaking (revealContent stays). */
  disableRespawn?: boolean;
  /** Replaces the default "GONE" placeholder shown after the card breaks. */
  revealContent?: React.ReactNode;
  /** If true, the card mounts already broken (no fall animation, reveal is shown immediately). */
  initiallyBroken?: boolean;
}

interface FallState {
  active: boolean;
  velocityX: number;
  velocityY: number;
  rotation: number;
}

interface DebrisData {
  id: number;
  x: number;
  y: number;
  rot: number;
  delay: number;
  path: string;
}

/**
 * =========================================================================
 *                              CONSTANTS & CONFIG
 * =========================================================================
 */
const PHYSICS = {
  MAX_RANGE: 45,
  DAMAGE_THRESHOLD: 2.5,
  DAMAGE_INCREMENT: 0.15,
  RECOVERY_RATE: 0.05,
  DRAG_ACTIVATION_DISTANCE_PX: 8,
  RESPAWN_TIME_MS: 7000,
  DEBRIS_DISAPPEAR_MS: 3000,
  HEALING_DURATION_MS: 10000,
} as const;

const CHUNK_PATHS = [
  "M 0 0 L 20 5 L 15 25 L 5 20 Z",
  "M 5 0 L 25 10 L 15 30 L 0 25 Z",
  "M 10 5 L 30 0 L 25 25 L 5 30 Z",
  "M 0 10 L 20 0 L 30 20 L 10 30 Z",
];

const DEBRIS_THRESHOLDS = [0.3, 0.5, 0.7, 0.9];

/**
 * =========================================================================
 *                              HOOKS
 * =========================================================================
 */
const useBreakableCard = (
  onBreak?: () => void,
  disableRespawn = false,
  initiallyBroken = false,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [crackLevel, setCrackLevel] = useState(0);
  const [isBroken, setIsBroken] = useState(initiallyBroken);
  const [fallState, setFallState] = useState<FallState>({
    active: false,
    velocityX: 0,
    velocityY: 0,
    rotation: 0,
  });
  const [debrisChunks, setDebrisChunks] = useState<DebrisData[]>([]);
  const [respawnProgress, setRespawnProgress] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  const lastPos = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const shakeIntensity = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const crackLevelRef = useRef(0);
  const isBrokenRef = useRef(initiallyBroken);
  const movedDistanceRef = useRef(0);
  const dragActivatedRef = useRef(false);
  /** True only for cards that mounted already broken — used to skip fall animation. */
  const wasInitiallyBroken = useRef(initiallyBroken);

  const triggerBreak = useCallback(() => {
    if (isBrokenRef.current) return;
    isBrokenRef.current = true;
    setIsBroken(true);
    setIsDragging(false);

    const vx = velocityRef.current.x;
    const baseRotation = Math.max(-60, Math.min(60, vx));

    setFallState({
      active: true,
      velocityX: vx * 0.3,
      velocityY: 5,
      rotation: baseRotation,
    });

    onBreak?.();
  }, [onBreak]);

  const handleCardClick = useCallback(() => {
    if (isBrokenRef.current) return;
    triggerBreak();
  }, [triggerBreak]);

  const spawnDebris = useCallback(
    (level: number) => {
      const newChunks: DebrisData[] = [];
      DEBRIS_THRESHOLDS.forEach((threshold, i) => {
        if (level >= threshold && debrisChunks.length <= i) {
          newChunks.push({
            id: Date.now() + i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            rot: Math.random() * 360,
            delay: 0,
            path: CHUNK_PATHS[Math.floor(Math.random() * CHUNK_PATHS.length)],
          });
        }
      });
      if (newChunks.length > 0) {
        setDebrisChunks((prev) => [...prev, ...newChunks]);
      }
    },
    [debrisChunks.length]
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (isBrokenRef.current) return;
      if ("button" in e && e.button !== 0) return;
      setIsDragging(true);
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

      startPos.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
      lastPos.current = { x: clientX, y: clientY };
      lastTime.current = Date.now();
      shakeIntensity.current = 0;
      movedDistanceRef.current = 0;
      dragActivatedRef.current = false;
    },
    [position.x, position.y]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || isBrokenRef.current) return;

      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);

      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const vx = dx / dt;
      const vy = dy / dt;

      velocityRef.current = { x: vx * 100, y: vy * 100 };
      movedDistanceRef.current += Math.hypot(dx, dy);
      if (!dragActivatedRef.current && movedDistanceRef.current >= PHYSICS.DRAG_ACTIVATION_DISTANCE_PX) {
        dragActivatedRef.current = true;
      }

      const newX = clientX - startPos.current.x;
      const newY = clientY - startPos.current.y;
      const clampedX = Math.max(-PHYSICS.MAX_RANGE, Math.min(PHYSICS.MAX_RANGE, newX));
      const clampedY = Math.max(-PHYSICS.MAX_RANGE, Math.min(PHYSICS.MAX_RANGE, newY));

      setPosition({ x: clampedX, y: clampedY });
      if (!dragActivatedRef.current) {
        lastPos.current = { x: clientX, y: clientY };
        lastTime.current = now;
        return;
      }

      const pushedRight = clampedX >= PHYSICS.MAX_RANGE && vx > 0;
      const pushedLeft = clampedX <= -PHYSICS.MAX_RANGE && vx < 0;
      const pushedDown = clampedY >= PHYSICS.MAX_RANGE && vy > 0;
      const pushedUp = clampedY <= -PHYSICS.MAX_RANGE && vy < 0;

      const isHorizontalImpact = (pushedRight || pushedLeft) && Math.abs(vx) > 0.5;
      const isVerticalImpact = (pushedDown || pushedUp) && Math.abs(vy) > 0.5;

      if (isHorizontalImpact) {
        shakeIntensity.current += PHYSICS.DAMAGE_INCREMENT * 1.5;
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);
      } else if (isVerticalImpact) {
        shakeIntensity.current += PHYSICS.DAMAGE_INCREMENT * 0.5;
      } else {
        shakeIntensity.current = Math.max(0, shakeIntensity.current - PHYSICS.RECOVERY_RATE);
      }

      setCrackLevel((prev) => {
        const newLevel = Math.min(1, prev + shakeIntensity.current * 0.025);
        crackLevelRef.current = newLevel;
        spawnDebris(newLevel);
        if (newLevel >= 1) {
          setTimeout(() => triggerBreak(), 0);
        }
        return newLevel;
      });

      lastPos.current = { x: clientX, y: clientY };
      lastTime.current = now;
    },
    [isDragging, spawnDebris, triggerBreak]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    shakeIntensity.current = 0;
    movedDistanceRef.current = 0;
    dragActivatedRef.current = false;
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging && !isBroken && crackLevel > 0) {
      const interval = setInterval(() => {
        setCrackLevel((prev) => {
          const healAmount = 50 / PHYSICS.HEALING_DURATION_MS;
          const newLevel = Math.max(0, prev - healAmount);
          crackLevelRef.current = newLevel;
          if (newLevel <= 0) {
            setDebrisChunks([]);
          }
          return newLevel;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging, isBroken, crackLevel]);

  useEffect(() => {
    if (isBroken && !disableRespawn) {
      setRespawnProgress(0);
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / PHYSICS.RESPAWN_TIME_MS) * 100);
        setRespawnProgress(progress);
        if (elapsed >= PHYSICS.RESPAWN_TIME_MS) {
          clearInterval(interval);
          setIsBroken(false);
          isBrokenRef.current = false;
          setCrackLevel(0);
          crackLevelRef.current = 0;
          setPosition({ x: 0, y: 0 });
          setDebrisChunks([]);
          setFallState({ active: false, velocityX: 0, velocityY: 0, rotation: 0 });
          shakeIntensity.current = 0;
          velocityRef.current = { x: 0, y: 0 };
          setRespawnProgress(0);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isBroken, disableRespawn]);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      handleDragMove(clientX, clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return {
    isDragging,
    position,
    crackLevel,
    isBroken,
    fallState,
    debrisChunks,
    handleDragStart,
    handleCardClick,
    respawnProgress,
    isFlashing,
    wasInitiallyBroken,
  };
};

/**
 * =========================================================================
 *                              SUB-COMPONENTS
 * =========================================================================
 */
interface DebrisChunkProps {
  x: number;
  y: number;
  rot: number;
  path: string;
}

const DebrisChunk = ({ x, y, rot, path }: DebrisChunkProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), PHYSICS.DEBRIS_DISAPPEAR_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <svg
      className="absolute w-8 h-8 pointer-events-none z-30 overflow-visible"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${rot}deg)`,
        animation: `debris-fall 0.8s cubic-bezier(0.55, 0, 1, 0.45) 0s forwards`,
      }}
    >
      <path d={path} fill="white" stroke="black" strokeWidth="2" />
    </svg>
  );
};

const CrackLines = ({ level }: { level: number }) => {
  if (level < 0.1) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {level >= 0.1 && (
        <path
          d="M0 20 L15 25 L8 40 L20 50"
          fill="none"
          stroke="black"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: Math.min(1, level * 2) }}
        />
      )}
      {level >= 0.5 && (
        <path
          d="M50 100 L55 80 L45 70 L60 55"
          fill="none"
          stroke="black"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: Math.min(1, (level - 0.4) * 2) }}
        />
      )}
      {level >= 0.9 && (
        <path
          d="M20 0 L25 20 L40 25 L35 45 L50 50"
          fill="none"
          stroke="black"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="4 2"
        />
      )}
    </svg>
  );
};

/**
 * =========================================================================
 *                              MAIN COMPONENT
 * =========================================================================
 */
export const BreakableCard = ({
  title,
  description,
  price,
  className,
  onBreak,
  disableRespawn = false,
  revealContent,
  initiallyBroken = false,
}: SectionCardProps) => {
  const {
    isDragging,
    position,
    crackLevel,
    isBroken,
    fallState,
    debrisChunks,
    handleDragStart,
    handleCardClick,
    respawnProgress,
    isFlashing,
    wasInitiallyBroken,
  } = useBreakableCard(onBreak, disableRespawn, initiallyBroken);

  const cardId = useMemo(
    () => `card-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  const figNum = useMemo(() => Math.floor(Math.random() * 99) + 1, []);

  const fallTransform = useMemo(() => {
    if (!fallState.active) return "";
    const horizontalDrift = fallState.velocityX * 5;
    const rotation =
      fallState.rotation + (fallState.velocityX > 0 ? 45 : -45);
    return `translate(${horizontalDrift}px, 120vh) rotate(${rotation}deg)`;
  }, [fallState]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* LAYER 1: Shadow Remnant / Reveal */}
      {revealContent ? (
        <div className="absolute inset-0 z-0">{revealContent}</div>
      ) : (
        <div className="absolute inset-0 bg-zinc-900 border-4 border-dashed border-zinc-700 flex flex-col items-center justify-center z-0">
          <span className="text-zinc-400 font-black text-2xl uppercase tracking-widest mb-2">
            Gone
          </span>
          {isBroken && !disableRespawn && (
            <div className="w-24 h-4 border-2 border-zinc-700 bg-zinc-950 relative overflow-hidden mt-2">
              <div
                className="absolute inset-0 bg-zinc-400 transition-all duration-75 ease-linear"
                style={{ width: `${respawnProgress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* LAYER 2: Debris Chunks */}
      <div
        className="pointer-events-none absolute inset-0 z-50 overflow-visible"
        style={{
          transform: isBroken
            ? fallTransform
            : `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.15}deg)`,
        }}
      >
        {debrisChunks.map((chunk: DebrisData) => (
          <DebrisChunk
            key={chunk.id}
            x={chunk.x}
            y={chunk.y}
            rot={chunk.rot}
            path={chunk.path}
          />
        ))}
      </div>

      {/* LAYER 3: Interactive Card */}
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleCardClick}
        className={cn(
          "relative z-10 bg-white border-4 border-black p-4 md:p-6 shadow-neo cursor-grab active:cursor-grabbing select-none h-full flex flex-col justify-between overflow-hidden transition-[background-color] text-black",
          !isDragging && !isBroken && "hover:animate-[hover-wiggle_0.8s_ease-in-out_infinite]",
          isBroken && "pointer-events-none",
          isFlashing && "bg-red-50"
        )}
        style={{
          transform: isBroken
            ? wasInitiallyBroken.current
              ? "none"
              : fallTransform
            : `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.15}deg)`,
          transition: isDragging
            ? "none"
            : isBroken
              ? wasInitiallyBroken.current
                ? "none"
                : "transform 1.0s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 1.0s ease-out"
              : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          opacity: isBroken ? 0 : 1,
          maskImage:
            debrisChunks.length > 0 ? `url(#mask-${cardId})` : "none",
          WebkitMaskImage:
            debrisChunks.length > 0 ? `url(#mask-${cardId})` : "none",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
            <h3 className="font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter leading-none">
              {title}
            </h3>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full flex-shrink-0" />
          </div>

          {/* Body */}
          <p className="font-bold text-sm md:text-base leading-tight line-clamp-3">
            {description}
          </p>

          {/* Price */}
          {price && (
            <p className="mt-3 md:mt-4 font-black text-lg md:text-2xl tracking-tight whitespace-nowrap">
              {price}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-6 border-t-2 border-black pt-2 flex justify-between text-[10px] md:text-xs font-mono uppercase">
          <span>Fig. {figNum.toString().padStart(2, "0")}</span>
          <span className={cn(crackLevel > 0.7 && "text-red-600 font-bold")}>
            {crackLevel > 0 ? `${Math.round(crackLevel * 100)}% DMG` : "INTACT"}
          </span>
        </div>

        {/* Overlays */}
        <CrackLines level={crackLevel} />
        {crackLevel > 0.2 && (
          <div
            className="absolute inset-0 bg-red-500 mix-blend-multiply pointer-events-none"
            style={{ opacity: crackLevel * 0.15 }}
          />
        )}
      </div>

      {/* LAYER 4: SVG masks */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <mask
            id={`mask-${cardId}`}
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <rect x="0" y="0" width="1" height="1" fill="white" />
            {debrisChunks.map((chunk: DebrisData) => (
              <g
                key={`hole-${chunk.id}`}
                transform={`translate(${chunk.x / 100}, ${chunk.y / 100}) rotate(${chunk.rot}) scale(0.003)`}
              >
                <path d={chunk.path} fill="black" />
              </g>
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export const Component = BreakableCard;

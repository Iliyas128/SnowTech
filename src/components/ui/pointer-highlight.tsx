import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const node = containerRef.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.unobserve(node);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative inline-block w-fit align-baseline",
        containerClassName
      )}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-0 block"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span
            className={cn(
              "absolute inset-0 block border border-white/45",
              rectangleClassName
            )}
            initial={{ width: 0, height: 0 }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="pointer-events-none absolute block"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ rotate: -90 }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={cn("h-5 w-5 text-slate-200", pointerClassName)}
            />
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}

const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
};

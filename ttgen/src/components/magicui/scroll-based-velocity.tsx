"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A simple wrap adjustment for framer-motion range.
 */
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  direction?: number;
  className?: string;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 100,
  direction = 1,
  className,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the x motion value.
   * We duplicate the content enough times to ensure it's always on screen.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(direction);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what makes it move faster/slower based on scroll velocity
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div className={cn("flex flex-nowrap whitespace-nowrap", className)} style={{ x }}>
        {/* Render copies of the text for infinite scroll effect */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="px-8">{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocityContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex w-full flex-col justify-center gap-1 sm:gap-2", className)}>
      {children}
    </div>
  );
}

"use client";
import { cn } from "@/utils/cn";
import { responsiveImage } from "@/utils/images";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

type Image = { id: string; src: string };
export const ImagesSlider = ({ images, children, overlay = true, overlayClassName, className, autoplay = true, direction = "up", currentIndex = 0, handleNext, handlePrevious }: {
  images: Image[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", handleKeyDown);
    const timer = autoplay && images.length > 1 ? window.setInterval(handleNext, 5000) : undefined;
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearInterval(timer);
    };
  }, [autoplay, images.length, handleNext, handlePrevious]);

  const active = images[currentIndex];
  if (!active) return null;
  const slideVariants = {
    initial: { scale: 0, opacity: 0, rotateX: 45 },
    visible: { scale: 1, opacity: 1, rotateX: 0, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] } },
    upExit: { opacity: 1, y: "-150%", transition: { duration: 1 } },
    downExit: { opacity: 1, y: "150%", transition: { duration: 1 } },
  };
  return (
    <div className={cn("overflow-hidden relative flex items-center justify-center rounded-2xl", className)} style={{ perspective: "1000px" }}>
      {children}
      {overlay && <div className={cn("absolute inset-0 z-40", overlayClassName)} />}
      <AnimatePresence>
        <motion.img
          key={active.id}
          {...responsiveImage(active.src, "90vw", true)}
          alt={active.id}
          loading="eager"
          decoding="async"
          initial="initial"
          animate="visible"
          exit={direction === "up" ? "upExit" : "downExit"}
          variants={slideVariants}
          className="image h-full w-full absolute inset-0 object-fill object-center rounded-2xl shadow-2xl"
        />
      </AnimatePresence>
    </div>
  );
};
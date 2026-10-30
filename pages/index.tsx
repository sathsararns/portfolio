import { Courier_Prime } from "next/font/google";
import { Lamp } from "@/components/hero-title";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/preloader";
import { useEffect, useRef, useState } from "react";
import About from "@/components/about";
import Skills from "@/components/skills";
import Achievements from "@/components/achievements";
import Career from "@/components/career";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Lenis from "lenis";
import Header from "@/components/header";
import { SnackbarProvider, useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { getProjectPosition } from "@/utils/portfolio-scroll";
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    let animationFrame: number;

    function raf(time: number) {
      lenis.raf(time);

      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isLoading || !window.location.hash) return;

    // Page sections only exist after the preloader has finished.
    const animationFrame = requestAnimationFrame(() => {
      const id = window.location.hash.slice(1);
      const project = document.getElementById(id);
      const lenis = lenisRef.current;
      if (!project || !lenis) return;

      const savedPosition = id.startsWith("project-")
        ? getProjectPosition(id.slice("project-".length))
        : null;
      lenis.resize();
      lenis.scrollTo(savedPosition ?? project, {
        immediate: true,
        force: true,
        offset: savedPosition === null ? -100 : 0,
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isLoading]);

  function SnackbarCloseButton({ snackbarKey }: any) {
    const { closeSnackbar } = useSnackbar();

    return (
      <IconButton onClick={() => closeSnackbar(snackbarKey)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
    );
  }

  return (
    <main className={`${courierPrime.className} max-w-[1920px] mx-auto`}>
      <SnackbarProvider
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Header />
        {!isLoading && (
          <>
            <Lamp />
            <About />
            <Skills />
            <Achievements />
            <Career />
            <Portfolio />
            <Contact />
          </>
        )}
      </SnackbarProvider>
    </main>
  );
}

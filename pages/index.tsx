import Seo from "@/components/seo.component";
import { homeStructuredData, site } from "@/utils/seo";
import { projects } from "@/data/projects.data";
import { courierPrime } from "@/utils/fonts";
import { Lamp } from "@/components/hero-title";
import { AnimatePresence } from "framer-motion";
import Preloader, { introDuration } from "@/components/preloader";
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    setHasMounted(true);
    const lenis = new Lenis();
    lenisRef.current = lenis;
    let animationFrame: number;

    function raf(time: number) {
      lenis.raf(time);

      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    let introSeen = false;
    try {
      introSeen = sessionStorage.getItem("portfolio-intro-seen") === "multilingual-v1";
      sessionStorage.setItem("portfolio-intro-seen", "multilingual-v1");
    } catch {
      // The short intro still works when storage is unavailable.
    }
    const skipIntro = introSeen || Boolean(window.location.hash) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let loadingTimeout: number | undefined;
    if (skipIntro) setIsLoading(false);
    else loadingTimeout = window.setTimeout(() => setIsLoading(false), introDuration);

    return () => {
      window.clearTimeout(loadingTimeout);
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isLoading || !window.location.hash) return;

    // Wait for local fonts so a cold visit restores the final section position.
    let cancelled = false;
    let animationFrame: number | undefined;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      animationFrame = requestAnimationFrame(() => {
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
    });

    return () => {
      cancelled = true;
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
    };
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
      <Seo title={site.title} description={site.description} structuredData={homeStructuredData(projects)} />
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
          {hasMounted && isLoading && <Preloader />}
        </AnimatePresence>
        <Header />
        <Lamp />
        <About />
        <Skills />
        <Achievements />
        <Career />
        <Portfolio />
        <Contact />
      </SnackbarProvider>
    </main>
  );
}

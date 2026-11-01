"use client";
import React, { useRef } from "react";
import { StickyScroll } from "./components/sticky-scroll-reveal.component";
import { CardStack } from "./components/card-stack.component";
import { Slide } from "../skills/components/parallex-slider.component";
import { useScroll } from "framer-motion";
import { projects } from "@/data/projects.data";

const content = projects.map((project) => ({
  ...project,
  href: `/projects/${project.slug}`,
  content: (
    <div className="h-full w-full flex items-center justify-center text-white">
      <CardStack items={project.images} />
    </div>
  ),
}));

export default function Portfolio() {
  const container = useRef<any>();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  return (
    <div className=" mt-[200px]">
      <h2 className="block xl:hidden text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10 px-4 sticky top-0 z-10000">Recent Works</h2>
      <StickyScroll content={content} />
      <div ref={container} className="overflow-hidden mt-[200px]">
        <Slide
          direction={"left"}
          left={"-25%"}
          progress={scrollYProgress}
          words={[
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
          ]}
          type={"text"}
        />
        <Slide
          direction={"right"}
          left={"-35%"}
          progress={scrollYProgress}
          words={[
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
          ]}
          type={"text"}
        />
        <Slide
          direction={"left"}
          left={"-45%"}
          progress={scrollYProgress}
          words={[
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
            "Reach out!",
          ]}
          type={"text"}
        />
      </div>
    </div>
  );
}

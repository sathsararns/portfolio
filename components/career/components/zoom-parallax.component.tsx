import { assetPath } from "@/utils/asset-path";
import styles from "./styles.module.scss";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ImageParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  // const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "/assets/portfolio.png",
      layoutSlot: 1,
      scale: scale4,
    },
    {
      src: "/assets/portfolio/wedahub/wedahub-logo.png?v=77327234",
      layoutSlot: 2,
      scale: scale6,
    },
    // SWE logo temporarily disabled; its original layout slot is retained.
//     {
//       src: "/assets/portfolio/swe/swe-logo.png",
//       layoutSlot: 3,
//       scale: scale4,
//     },
    {
      src: "/assets/portfolio/voya/voya-logo.png",
      layoutSlot: 4,
      scale: scale7,
    },
  // Quotes App temporarily disabled; uncomment to restore.
//     {
//       src: "/assets/portfolio/quotes-app/quotes-logo.png",
//       layoutSlot: 5,
//       scale: scale8,
//     },

    {
      src: "/assets/portfolio/opsyntra/opsyntra-logo.png?v=51c18488",
      layoutSlot: 6,
      scale: scale9,
    },
  ];

  return (
    <div
      ref={container}
      className={`${styles.container} h-[70vh] lg:h-[300vh]`}
      id="portfolio"
    >
      <div className={styles.sticky}>
        {pictures.map(({ src, scale, layoutSlot }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el} data-layout-slot={layoutSlot}>
              <div className={styles.imageContainer}>
                {/* <Image src={src} fill alt="image" placeholder="blur" /> */}
                <img src={assetPath(src)} alt="image" className="" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

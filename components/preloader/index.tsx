"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";

export default function Preloader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  const { width, height } = dimension;
  const curve = {
    initial: { d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0` },
    exit: { d: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
  };
  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction} aria-hidden="true">
      {width > 0 && <>
        <motion.p variants={opacity} initial="initial" animate="enter"><span />Hello</motion.p>
        <svg><motion.path variants={curve} initial="initial" exit="exit" /></svg>
      </>}
    </motion.div>
  );
}
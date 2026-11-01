export const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 0.15 } },
};

export const slideUp = {
  initial: { top: 0 },
  exit: { top: "-100vh", transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
};
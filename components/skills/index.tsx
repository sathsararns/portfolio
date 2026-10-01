import { useRef } from "react";
import { useScroll } from "framer-motion";
import Chip from "./components/chip.component";
import { Slide } from "./components/parallex-slider.component";

const skills = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Keras",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "OpenCV",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "LLM Integration",
  "RAG & Agentic Workflows",
  "Vector Search (Qdrant)",
  "MLflow",
  "FastAPI",
  "Docker",
  "REST APIs",
  "PostgreSQL",
  "MongoDB",
  "SQL",
  "Git",
];
export default function Skills() {
  const container = useRef<any>();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <div className="mt-10">
        <div className="px-4">
          <p className="text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
            What I work with
          </p>
          <div className="flex flex-wrap gap-3 max-w-3xl  text-left mb-10">
            {skills.map((skill, index) => (
              <Chip key={index} text={skill} />
            ))}
          </div>
        </div>
        <main className="overflow-hidden mt-[200px]" id="journey">
          <div ref={container} className="flex flex-col gap-3 ">
            <Slide
              direction={"left"}
              left={"-100%"}
              progress={scrollYProgress}
              words={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
              ]}
            />

            <Slide
              direction={"right"}
              left={"-100%"}
              progress={scrollYProgress}
              words={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
              ]}
            />

            <Slide
              direction={"left"}
              left={"-100%"}
              progress={scrollYProgress}
              words={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
              ]}
            />
          </div>
        </main>
      </div>
    </>
  );
}

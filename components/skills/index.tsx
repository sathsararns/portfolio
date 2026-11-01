import { useRef } from "react";
import { useScroll } from "framer-motion";
import Chip from "./components/chip.component";
import { Slide } from "./components/parallex-slider.component";

const skills = [
  "Python",
  "TypeScript",
  "JavaScript",
  "SQL",
  "React",
  "Next.js",
  "React Router",
  "Tailwind CSS",
  "Framer Motion",
  "Zustand",
  "Node.js",
  "Express",
  "FastAPI",
  "Pydantic",
  "REST APIs",
  "Socket.IO",
  "Scikit-learn",
  "XGBoost",
  "PySpark",
  "Pandas",
  "NumPy",
  "LangChain",
  "LangGraph",
  "RAG & Agentic Workflows",
  "FastEmbed",
  "Vector Search",
  "PostgreSQL",
  "MongoDB Atlas",
  "SQLAlchemy",
  "Redis",
  "Apache Kafka",
  "Apache Airflow",
  "MLflow",
  "Docker",
];

const skillLogoRows = [
  [
    ["React", "react"],
    ["TypeScript", "typescript"],
    ["JavaScript", "javascript"],
    ["Next.js", "nextjs"],
    ["Tailwind CSS", "tailwindcss"],
    ["Node.js", "nodejs"],
    ["FastAPI", "fastapi"],
  ],
  [
    ["Python", "python"],
    ["Scikit-learn", "scikitlearn"],
    ["Pandas", "pandas"],
    ["NumPy", "numpy"],
    ["PySpark", "apachespark"],
  ],
  [
    ["PostgreSQL", "postgresql"],
    ["MongoDB Atlas", "mongodb"],
    ["Redis", "redis"],
    ["Apache Kafka", "apachekafka"],
    ["Apache Airflow", "apacheairflow"],
    ["Docker", "docker"],
  ],
].map((row) =>
  row
    .filter(([skill]) => skills.includes(skill))
    .map(([, icon]) =>
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`
    )
);

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
          <h2 className="text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
            What I work with
          </h2>
          <div className="flex flex-wrap gap-3 max-w-3xl  text-left mb-10">
            {skills.map((skill) => (
              <Chip key={skill} text={skill} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden mt-[200px]" id="journey">
          <div ref={container} className="flex flex-col gap-3 ">
            {skillLogoRows.map((logos, index) => (
              <Slide
                key={index}
                direction={index === 1 ? "right" : "left"}
                left="-100%"
                progress={scrollYProgress}
                words={logos}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

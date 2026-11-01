import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { courierPrime } from "@/utils/fonts";
import Link from "next/link";
import { useState } from "react";
import { Project, projects } from "@/data/projects.data";


export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ project: Project }> = async ({
  params,
}) => {
  const project = projects.find((p) => p.slug === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};

export default function ProjectPage({ project }: { project: Project }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main
      className={`${courierPrime.className} min-h-screen bg-[#020617] text-slate-100 px-4 md:px-10 py-10`}
      style={courierPrime.style}
    >
      <Head>
        <title>{`${project.title} | Sathsara Ranasooriya`}</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <Link
          href={`/#project-${project.slug}`}
          scroll={false}
          className="text-slate-300 hover:text-white inline-flex items-center gap-2"
        >
          ← Back to portfolio
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold mt-8">{project.title}</h1>
        <p className="text-slate-300 mt-6 max-w-3xl text-lg leading-relaxed">
          {project.details.introduction}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition"
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition"
            >
              GitHub ↗
            </a>
          )}
        </div>

        <div className="mt-14 space-y-12">
          <section aria-labelledby="project-overview-title">
            <h2 id="project-overview-title" className="text-2xl md:text-3xl font-bold mb-6">
              Project overview
            </h2>
            <div className="max-w-4xl space-y-5 text-slate-300 leading-relaxed">
              {project.details.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="project-features-title">
            <h2 id="project-features-title" className="text-2xl md:text-3xl font-bold mb-6">
              Key features
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.details.features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <dt className="text-lg font-bold text-slate-100">{feature.title}</dt>
                  <dd className="mt-3 text-slate-300 leading-relaxed">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="project-workflow-title">
            <h2 id="project-workflow-title" className="text-2xl md:text-3xl font-bold mb-6">
              How it works
            </h2>
            <ol className="max-w-4xl list-decimal pl-6 space-y-4 text-slate-300 leading-relaxed marker:text-slate-100">
              {project.details.workflow.map((step) => (
                <li key={step} className="pl-2">{step}</li>
              ))}
            </ol>
          </section>

          {project.details.aiWorkflow && (
            <section aria-labelledby="project-ai-workflow-title">
              <h2 id="project-ai-workflow-title" className="text-2xl md:text-3xl font-bold mb-6">
                AI assistant workflow
              </h2>
              <ol className="max-w-4xl list-decimal pl-6 space-y-6 text-slate-300 leading-relaxed">
                {project.details.aiWorkflow.steps.map((step) => (
                  <li key={step.title} className="pl-2">
                    <h3 className="font-bold text-slate-100">{step.title}</h3>
                    <p className="mt-2">{step.description}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 max-w-4xl space-y-3 border-l-2 border-slate-600 pl-5 text-sm text-slate-400 leading-relaxed">
                {project.details.aiWorkflow.notes.map((note) => <p key={note}>{note}</p>)}
              </div>
            </section>
          )}


          {project.details.modelEvaluation && (
            <section aria-labelledby="project-evaluation-title">
              <h2 id="project-evaluation-title" className="text-2xl md:text-3xl font-bold mb-6">
                Model evaluation
              </h2>
              <p className="max-w-4xl text-slate-300 leading-relaxed">
                {project.details.modelEvaluation.description}
              </p>
              <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.details.modelEvaluation.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <dt className="text-sm text-slate-400">{metric.label}</dt>
                    <dd className="mt-2 text-xl md:text-2xl font-bold text-slate-100">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 max-w-4xl space-y-3 text-sm text-slate-400 leading-relaxed">
                {project.details.modelEvaluation.notes.map((note) => <p key={note}>{note}</p>)}
              </div>
            </section>
          )}

          {project.details.architecture && (
            <section aria-labelledby="project-architecture-title">
              <h2 id="project-architecture-title" className="text-2xl md:text-3xl font-bold mb-6">
                System architecture
              </h2>
              <p className="max-w-4xl text-slate-300 leading-relaxed mb-6">
                {project.details.architecture.description}
              </p>
              <figure>
                <div
                  className="overflow-x-auto rounded-2xl border border-white/10 bg-[#020617] focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400"
                  tabIndex={0}
                  role="region"
                  aria-label="Scrollable system architecture diagram"
                >
                  <img
                    src={project.details.architecture.diagram}
                    alt={project.details.architecture.alt ?? `${project.title} architecture: React frontend, Express backend, MongoDB, FastAPI / LangGraph, Groq, and external integrations`}
                    loading="lazy"
                    className={project.slug === "opsyntra" ? "w-full min-w-[1200px]" : "w-full min-w-[900px]"}
                  />
                </div>
                <figcaption className="mt-4 max-w-4xl text-sm text-slate-400 leading-relaxed">
                  {project.details.architecture.caption}
                </figcaption>
              </figure>
            </section>
          )}


          {project.details.implementationNotes && (
            <section aria-labelledby="project-notes-title">
              <h2 id="project-notes-title" className="text-2xl md:text-3xl font-bold mb-6">
                Implementation notes
              </h2>
              <ul className="max-w-4xl list-disc pl-6 space-y-4 text-slate-300 leading-relaxed">
                {project.details.implementationNotes.map((note) => (
                  <li key={note} className="pl-2">{note}</li>
                ))}
              </ul>
            </section>
          )}

          {project.details.technologies && project.details.technologies.length > 0 && (
            <section aria-labelledby="project-technologies-title">
              <h2 id="project-technologies-title" className="text-2xl md:text-3xl font-bold mb-6">
                Technologies
              </h2>
              <ul className="flex flex-wrap gap-3">
                {project.details.technologies.map((technology) => (
                  <li key={technology} className="rounded-full border border-white/20 px-4 py-2 text-slate-300">
                    {technology}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-14 mb-6">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img.src)}
              className="bg-black rounded-2xl p-1 border border-white/10 overflow-hidden"
            >
              <img
                src={img.src}
                alt={`${project.title} ${img.id}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100000] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt={project.title}
            className="max-h-full max-w-full rounded-2xl"
          />
        </div>
      )}
    </main>
  );
}

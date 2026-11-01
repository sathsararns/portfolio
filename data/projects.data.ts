import { GITHUB } from "./constants.data";
import { projectDetails, type ProjectDetails } from "./project-details.data";

export type ProjectImage = { id: string; src: string };

export type Project = {
  slug: string;
  title: string;
  description: string;
  details: ProjectDetails;
  images: ProjectImage[];
  banner: string;
  liveUrl?: string;
  githubUrl?: string;
};

const images = (folder: string, prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const id = `${prefix}-${i + 1}.png`;
    return { id, src: `/assets/portfolio/${folder}/${id}` };
  });

export const projects: Project[] = [
  {
    slug: "star-wars-explorer",
    details: projectDetails["star-wars-explorer"],
    title: "Star Wars Explorer",
    description:
      "The Star Wars Explorer is an interactive web app built with React and TypeScript that lets users explore the Star Wars universe via a sleek, responsive Mantine UI. It features routing, authentication, and integrates the SWAPI to display detailed info on characters, planets, vehicles, and more. Users can search, filter, paginate, and switch between light and dark themes for a smooth, customizable experience.",
    images: images("swe", "swe", 8),
    banner: "/assets/portfolio/swe/swe-1.png",
    liveUrl: "https://star-wars-archive.vercel.app",
  },
  {
    slug: "wedahub",
    details: projectDetails.wedahub,
    title: "WedaHub",
    description:
      "WedaHub is a service booking application for customers and local providers. It combines searchable provider profiles, booking management, reviews, and administrative dashboards with an AI assistant that extracts service requirements, recommends providers, and guides confirmed bookings. Built with React, Express, MongoDB, and FastAPI, its Python workflow uses LangGraph and Groq-hosted language models, with optional semantic provider retrieval.",
    images: [
      "wedahub-1.png",
      "wedahub-2.png",
      "wedahub-3.png",
      "wedahub-4.png",
      "wedahub-5.png",
      "wedahub-6.png",
      "wedahub-7.png",
      "wedahub-8.png",
      "wedahub--9.png",
      "wedahub-10.png",
      "wedahub-11.png",
      "wedahub-12.png",
      "wedahub-13.png",
      "wedahub-14.png",
      "wedahub-15.png",
    ].map((filename) => ({
      id: filename,
      src: `/assets/portfolio/wedahub/${filename}`,
    })),
    banner: "/assets/portfolio/wedahub/wedahub-1.png",
    liveUrl: "https://weda-hub-frontend.vercel.app/",
    githubUrl: "https://github.com/sathsararns/wedaHub",
  },
  {
    slug: "skribbid",
    details: projectDetails.skribbid,
    title: "Skribbid",
    description:
      "Draw, guess, and have fun with friends in this multiplayer drawing and guessing game. Create a room or join one to start playing!",
    images: images("skribbid", "skribbid", 12),
    banner: "/assets/portfolio/skribbid/skribbid-1.png",
    liveUrl: "https://skribbid.vercel.app",
    githubUrl: `${GITHUB}/skribbid`,
  },
  {
    slug: "minimal-quotes-app",
    details: projectDetails["minimal-quotes-app"],
    title: "Minimal Quotes App",
    description:
      "An elegant application that allows users to explore and read an extensive collection of quotes. With a sleek dark mode, it ensures a pleasant reading experience even in low-light conditions. Featuring categories like love, happiness, famous quotes and many more, you will get quotes that are tailored to your interests. Plus, it’s a progressive web app (PWA), enabling seamless experience across devices. ",
    images: images("quotes-app", "quotes", 7),
    banner: "/assets/portfolio/quotes-app/quotes-1.png",
    liveUrl: "https://minimal-quotes-app.vercel.app",
    githubUrl: `${GITHUB}/minimal-quotes-app`,
  },
  {
    slug: "flux",
    details: projectDetails.flux,
    title: "Flux",
    description:
      "A design showcase project built on Ant Design. With its modern UI, Flux highlights the elegance and functionality of Ant Design components.",
    images: images("flux", "flux", 6),
    banner: "/assets/portfolio/flux/flux-2.png",
    liveUrl: "https://flux-eight.vercel.app",
    githubUrl: `${GITHUB}/Flux`,
  },
  {
    slug: "business-card-maker",
    details: projectDetails["business-card-maker"],
    title: "Business Card Maker",
    description:
      "An intuitive tool that allows users to design modern-looking business cards effortlessly. With a range of default design components, you can create a personalized card that reflects your brand. Once you’re satisfied, simply download your professionally crafted business card.",
    images: images("business-card-maker", "b-c-m", 5),
    banner: "/assets/portfolio/business-card-maker/b-c-m-1.png",
    liveUrl: "https://business-card-maker-zeta.vercel.app",
    githubUrl: `${GITHUB}/business-card-maker`,
  },
  {
    slug: "photo-effects",
    details: projectDetails["photo-effects"],
    title: "Photo Effects",
    description:
      "An interactive platform where users can upload their own images and experiment with various effects such as blur, hue adjustments, and more. See how these effects transform your photos in real time! Plus, you can download the modified images with your chosen effects applied.",
    images: images("photo-effects", "p-e", 5),
    banner: "/assets/portfolio/photo-effects/p-e-1.png",
    liveUrl: "https://photo-effects.vercel.app",
    githubUrl: `${GITHUB}/photo-effects`,
  },
  {
    slug: "opsyntra",
    details: projectDetails.opsyntra,
    title: "Opsyntra",
    description:
      "Opsyntra is a local customer churn prediction and streaming analytics application combining machine learning pipelines with an interactive web workspace. It supports individual and CSV batch predictions, compares scikit-learn and PySpark workflows, and tracks experiments with MLflow. Kafka consumers publish model predictions and persist analytics in PostgreSQL, with recovery state and logical deduplication. A Next.js dashboard presents predicted risk, event activity, and processing health. Docker Compose packages the application for a repeatable local demonstration.",
    images: images("opsyntra", "opsyntra", 4),
    banner: "/assets/portfolio/opsyntra/opsyntra-1.png",
    githubUrl: "https://github.com/sathsararns/opsyntra",
  },
];

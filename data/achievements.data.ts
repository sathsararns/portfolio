export type Achievement = {
  id: string;
  event: string;
  award: string;
  year?: string;
  organizer?: string;
  project?: string;
  description?: string;
  image?: string;
  achievementUrl?: string;
  projectUrl?: string;
  certificateUrl?: string;
};

// Listed newest first. Each entry becomes an achievement card.
// Set achievementUrl to the event, result announcement, certificate, or post URL.
export const achievements: Achievement[] = [
  {
    id: "coderally-vii-2026",
    event: "CodeRally VII (Intermediate Tier)",
    award: "1st Runner-Up",
    year: "2026",
    organizer: "Informatics Institute of Technology (IIT)",
    achievementUrl: "https://lnkd.in/p/gqjNVvtw",
  },
  {
    id: "road-to-rush-coder-2025",
    event: "Road to Rush Coder 3.0",
    award: "1st Runner-Up",
    year: "2025",
    organizer: "University of Ruhuna",
    achievementUrl: "https://lnkd.in/p/gqtY-9hV",
  },
];

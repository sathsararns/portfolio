import { motion, useReducedMotion } from "framer-motion";
import { Courier_Prime } from "next/font/google";
import { Achievement, achievements } from "@/data/achievements.data";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
});

function Trophy({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" />
      <path d="M8 5H5v2a4 4 0 0 0 4 4m7-6h3v2a4 4 0 0 1-4 4M12 12v5m-4 4h8m-6-4h4l1 4H9l1-4Z" />
    </svg>
  );
}

function AchievementLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm text-base md:text-lg text-[#e2c66c] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c66c]"
    >
      {children}
      <span aria-hidden="true">&#8599;</span>
    </a>
  );
}

export default function Achievements({
  items = achievements,
}: {
  items?: Achievement[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      style={courierPrime.style}
      className="mt-[160px] scroll-mt-[100px] px-4 md:px-10 lg:mt-[200px]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.65fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-[100px]">
          <p className="mb-5 flex items-center gap-3 text-base font-medium text-[#e2c66c] md:text-lg">
            <span className="h-px w-8 bg-[#B69121]" aria-hidden="true" />
            Awards & recognition
          </p>
          <h2
            id="achievements-title"
            className="text-2xl font-bold text-neutral-200 md:text-4xl"
          >
            Achievements
          </h2>
          <p className="mt-6 max-w-sm text-base text-neutral-300 md:text-xl">
            Highlights from hackathons and coding competitions.
          </p>
        </div>

        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="relative overflow-hidden rounded-2xl border border-[#B69121]/30 bg-gradient-to-br from-[#B69121]/10 via-slate-900/60 to-slate-950 p-8 md:p-12">
              <Trophy className="pointer-events-none absolute -bottom-8 -right-6 h-52 w-52 -rotate-12 text-[#B69121]/10" />
              <div className="relative">
                <div className="mb-8 inline-flex rounded-2xl border border-[#B69121]/30 bg-[#B69121]/10 p-4 text-[#e2c66c]">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-200 md:text-4xl">Hackathon wins</h3>
                <p className="mt-4 text-base text-neutral-300 md:text-xl">
                  Award details coming soon.
                </p>
              </div>
            </div>
          ) : (
            items.map((achievement, index) => (
              <motion.article
                key={achievement.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition-colors hover:border-[#B69121]/50"
              >
                {achievement.image && (
                  <img
                    src={achievement.image}
                    alt={`${achievement.event} — ${achievement.award}`}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#B69121]/30 bg-[#B69121]/10 px-3 py-1.5 text-base text-[#e2c66c] md:text-xl">
                      <Trophy className="h-5 w-5 shrink-0" />
                      {achievement.award}
                    </span>
                    <span className="text-base text-neutral-500 md:text-xl">
                      {achievement.year ?? String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 break-words text-2xl font-bold text-neutral-200 md:text-4xl">
                    {achievement.event}
                  </h3>
                  {achievement.organizer && (
                    <p className="mt-3 text-lg font-bold text-neutral-500 md:text-2xl">
                      {achievement.organizer}
                    </p>
                  )}
                  {achievement.project && (
                    <p className="mt-5 text-lg font-medium text-slate-300 md:text-2xl">
                      {achievement.project}
                    </p>
                  )}
                  {achievement.description && (
                    <p className="mt-3 text-base text-neutral-300 md:text-xl">
                      {achievement.description}
                    </p>
                  )}
                  {(achievement.projectUrl || achievement.certificateUrl) && (
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5">
                      {achievement.projectUrl && (
                        <AchievementLink href={achievement.projectUrl}>
                          View project
                        </AchievementLink>
                      )}
                      {achievement.certificateUrl && (
                        <AchievementLink href={achievement.certificateUrl}>
                          View certificate
                        </AchievementLink>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

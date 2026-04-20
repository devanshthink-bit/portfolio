const caseStudies: Record<
  string,
  {
    title: string;
    intro: string;
    problem: string;
    process: string;
    outcome: string;
  }
> = {
  "project-one": {
    title: "Project One",
    intro: "A brief overview of the project and its context.",
    problem: "The core challenge that needed to be solved.",
    process: "Research, ideation, and iterative design decisions.",
    outcome: "What shipped and the impact it created.",
  },
  "project-two": {
    title: "Project Two",
    intro: "A brief overview of the project and its context.",
    problem: "The core challenge that needed to be solved.",
    process: "Research, ideation, and iterative design decisions.",
    outcome: "What shipped and the impact it created.",
  },
};

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudies[params.slug];

  if (!study) return <div className="py-24">Not found.</div>;

  return (
    <main className="pt-16 pb-24 mx-auto max-w-[640px]">
      <a href="/" className="text-sm text-black/40 mb-12 inline-block">
        ← Back
      </a>
      <h1 className="text-5xl font-bold tracking-tight leading-tight text-black">
        {study.title}
      </h1>

      <p className="mt-8 text-base text-black leading-loose">{study.intro}</p>

      <section className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-6">
          Problem
        </h2>
        <p className="text-base text-black leading-loose">{study.problem}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-6">
          Process
        </h2>
        <p className="text-base text-black leading-loose">{study.process}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-6">
          Outcome
        </h2>
        <p className="text-base text-black leading-loose">{study.outcome}</p>
      </section>
    </main>
  );
}
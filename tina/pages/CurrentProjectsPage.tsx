import { tinaField, useTina } from "tinacms/dist/react";

interface ProjectObjective {
  text: string;
}

interface Project {
  title: string;
  status: string;
  statusLabel?: string | null;
  description: string;
  objectives?: Array<ProjectObjective | null> | null;
  timeline?: string | null;
  network?: string | null;
  milestone?: string | null;
  order?: number | null;
}

interface ProjectEdge {
  node?: Project | null;
}

interface PageData {
  page: {
    ctaTitle?: string | null;
    ctaSubtitle?: string | null;
    ctaCTA1Text?: string | null;
    ctaCTA1Link?: string | null;
  };
  projectConnection?: {
    edges?: Array<ProjectEdge | null> | null;
  };
}

interface CurrentProjectsPageProps {
  data: PageData;
  query: string;
  variables: object;
}

const arrowIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const objectivesIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const timelineIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const networkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const badgeClassMap: Record<string, string> = {
  active: "badge-primary",
  "write-up": "badge-secondary",
  completed: "badge-secondary",
};

const CurrentProjectsPage = (props: CurrentProjectsPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;
  const projects = (data.projectConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean) as Project[];

  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="flex flex-col gap-10">
          {projects.map((project, i) => {
            const badgeClass = badgeClassMap[project.status] ?? "badge-secondary";
            const objectives = (project.objectives ?? []).filter(Boolean) as ProjectObjective[];

            return (
              <article key={i} className="card-elevated p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    {project.title}
                  </h2>
                  <span className={`badge ${badgeClass}`}>
                    {project.statusLabel ?? project.status}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Objectives */}
                  {objectives.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="icon-box flex-shrink-0">
                        {objectivesIcon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Objectives</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {objectives.map((obj, j) => (
                            <li key={j}>{obj.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {project.timeline && (
                    <div className="flex items-start gap-3">
                      <div className="icon-box flex-shrink-0">
                        {timelineIcon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Timeline</h3>
                        <p className="text-sm text-muted-foreground">{project.timeline}</p>
                        {project.milestone && (
                          <p className="text-sm text-muted-foreground mt-1">{project.milestone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Network */}
                  {project.network && (
                    <div className="flex items-start gap-3">
                      <div className="icon-box flex-shrink-0">
                        {networkIcon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Network</h3>
                        <p className="text-sm text-muted-foreground">{project.network}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <a href="/contact" className="btn btn-sm btn-primary">
                    Get Involved
                    {arrowIcon}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="hero-gradient relative py-16 md:py-24">
        <div className="container relative text-center">
          <h2
            className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4"
            data-tina-field={tinaField(page, "ctaTitle")}
          >
            {page.ctaTitle}
          </h2>
          <p
            className="text-white/80 text-lg max-w-xl mx-auto mb-8"
            data-tina-field={tinaField(page, "ctaSubtitle")}
          >
            {page.ctaSubtitle}
          </p>
          {page.ctaCTA1Text && page.ctaCTA1Link && (
            <a
              href={page.ctaCTA1Link}
              className="btn btn-white"
              data-tina-field={tinaField(page, "ctaCTA1Text")}
            >
              {page.ctaCTA1Text}
              {arrowIcon}
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default CurrentProjectsPage;

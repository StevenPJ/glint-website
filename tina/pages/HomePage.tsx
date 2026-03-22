import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";

interface Stat {
  value: string;
  label: string;
  [key: string]: unknown;
}

interface WhatWeDoCard {
  icon?: string | null;
  title: string;
  description: string;
  [key: string]: unknown;
}

interface Project {
  title: string;
  status: string;
  statusLabel?: string | null;
  description: string;
}

interface ProjectEdge {
  node?: Project | null;
}

interface ProjectConnection {
  edges?: Array<ProjectEdge | null> | null;
}

interface PageData {
  page: {
    heroBadge?: string | null;
    heroTitle: string;
    heroSubtitle?: string | null;
    heroCTA1Text?: string | null;
    heroCTA1Link?: string | null;
    heroCTA2Text?: string | null;
    heroCTA2Link?: string | null;
    stats?: Array<Stat | null> | null;
    whatWeDoTitle?: string | null;
    whatWeDoSubtitle?: string | null;
    whatWeDoCards?: Array<WhatWeDoCard | null> | null;
    currentProjectsTitle?: string | null;
    currentProjectsSubtitle?: string | null;
    ctaTitle?: string | null;
    ctaSubtitle?: string | null;
    ctaCTA1Text?: string | null;
    ctaCTA1Link?: string | null;
    ctaCTA2Text?: string | null;
    ctaCTA2Link?: string | null;
  };
  projectConnection?: ProjectConnection;
}

interface HomePageProps {
  data: PageData;
  query: string;
  variables: object;
}

const iconSvgs: Record<string, React.ReactElement> = {
  book: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const arrowIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const HomePage = (props: HomePageProps) => {
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
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern"></div>
        <div className="container py-24 md:py-32 lg:py-[160px] relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            {page.heroBadge && (
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                <span
                  className="text-white/90 text-sm font-medium"
                  data-tina-field={tinaField(page, "heroBadge")}
                >
                  {page.heroBadge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif leading-none"
              data-tina-field={tinaField(page, "heroTitle")}
            >
              {page.heroTitle}
            </h1>

            {/* Subtitle */}
            {page.heroSubtitle && (
              <p
                className="text-white/80 text-lg md:text-xl leading-7 mb-10 max-w-2xl mx-auto"
                data-tina-field={tinaField(page, "heroSubtitle")}
              >
                {page.heroSubtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {page.heroCTA1Text && page.heroCTA1Link && (
                <a
                  href={page.heroCTA1Link}
                  className="btn btn-white w-full sm:w-auto justify-center"
                  data-tina-field={tinaField(page, "heroCTA1Text")}
                >
                  {page.heroCTA1Text}
                  {arrowIcon}
                </a>
              )}
              {page.heroCTA2Text && page.heroCTA2Link && (
                <a
                  href={page.heroCTA2Link}
                  className="btn btn-outline-white w-full sm:w-auto justify-center"
                  data-tina-field={tinaField(page, "heroCTA2Text")}
                >
                  {page.heroCTA2Text}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 20% 98%)"></path>
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      {page.stats && page.stats.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-3 gap-8 text-center">
              {page.stats.map((stat, i) =>
                stat ? (
                  <div key={i}>
                    <div
                      className="text-3xl md:text-4xl font-bold text-primary font-serif"
                      data-tina-field={tinaField(stat, "value")}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-muted-foreground mt-1"
                      data-tina-field={tinaField(stat, "label")}
                    >
                      {stat.label}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* What We Do */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "rgba(237, 240, 242, 0.5)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-semibold font-serif mb-4"
              data-tina-field={tinaField(page, "whatWeDoTitle")}
            >
              {page.whatWeDoTitle}
            </h2>
            <p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              data-tina-field={tinaField(page, "whatWeDoSubtitle")}
            >
              {page.whatWeDoSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(page.whatWeDoCards ?? []).map((card, i) =>
              card ? (
                <div key={i} className="card-elevated p-6 lg:p-8">
                  <div className="icon-box mb-4">
                    {card.icon && iconSvgs[card.icon] ? iconSvgs[card.icon] : iconSvgs.book}
                  </div>
                  <h3
                    className="text-xl font-semibold font-serif mb-2"
                    data-tina-field={tinaField(card, "title")}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    data-tina-field={tinaField(card, "description")}
                  >
                    {card.description}
                  </p>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* Current Projects Preview */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2
                className="text-3xl md:text-4xl font-semibold font-serif"
                data-tina-field={tinaField(page, "currentProjectsTitle")}
              >
                {page.currentProjectsTitle}
              </h2>
              <p
                className="text-muted-foreground mt-2"
                data-tina-field={tinaField(page, "currentProjectsSubtitle")}
              >
                {page.currentProjectsSubtitle}
              </p>
            </div>
            <a href="/current-projects" className="btn btn-sm btn-outline whitespace-nowrap w-full md:w-auto justify-center">
              View All Projects
              {arrowIcon}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project, i) => (
              <div key={i} className="card-elevated p-6 lg:p-8">
                <span className={`badge ${project.status === "active" ? "badge-primary" : "badge-secondary"} mb-4`}>
                  {project.statusLabel ?? project.status}
                </span>
                <h3 className="text-2xl font-semibold font-serif mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <a href="/current-projects" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more
                  {arrowIcon}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Get Involved CTA */}
      <section className="hero-gradient relative py-16 md:py-24">
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-semibold text-white font-serif mb-4"
              data-tina-field={tinaField(page, "ctaTitle")}
            >
              {page.ctaTitle}
            </h2>
            <p
              className="text-white/80 text-lg mb-8"
              data-tina-field={tinaField(page, "ctaSubtitle")}
            >
              {page.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {page.ctaCTA1Text && page.ctaCTA1Link && (
                <a
                  href={page.ctaCTA1Link}
                  className="btn btn-white w-full sm:w-auto justify-center"
                  data-tina-field={tinaField(page, "ctaCTA1Text")}
                >
                  {page.ctaCTA1Text}
                  {arrowIcon}
                </a>
              )}
              {page.ctaCTA2Text && page.ctaCTA2Link && (
                <a
                  href={page.ctaCTA2Link}
                  className="btn btn-outline-white w-full sm:w-auto justify-center"
                  data-tina-field={tinaField(page, "ctaCTA2Text")}
                >
                  {page.ctaCTA2Text}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

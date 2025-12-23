import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
  teamMembers?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
}

// Icon SVG paths for feature cards
const iconPaths: Record<string, string> = {
  collaborate: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  trainee: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  career: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  patient: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
};

const AboutPage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;
  const teamMembers = props.teamMembers || [];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="section-label">ABOUT GLINT</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              <span data-tina-field={tinaField(page, "heroTitle")}>
                {page.heroTitle || "Meet the"}
              </span>{" "}
              <span className="text-gradient" data-tina-field={tinaField(page, "heroHighlight")}>
                {page.heroHighlight || "Team"}
              </span>
            </h1>
            <p
              className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
              data-tina-field={tinaField(page, "heroSubtitle")}
            >
              {page.heroSubtitle || "GLINT is powered by passionate gastroenterology trainees from across London, working together to advance research and improve patient care."}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="pb-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface rounded-2xl p-8 shadow-card mb-12">
              <h2
                className="text-2xl font-bold text-text mb-4"
                data-tina-field={tinaField(page, "missionTitle")}
              >
                {page.missionTitle || "Our Mission"}
              </h2>

              {page.missionContent ? (
                <div
                  className="text-text-muted mb-4 prose"
                  data-tina-field={tinaField(page, "missionContent")}
                >
                  <TinaMarkdown content={page.missionContent} />
                </div>
              ) : (
                <>
                  <p className="text-text-muted mb-4">
                    GLINT is a trainee-led research group created to enable gastroenterology trainees across London to collaborate on meaningful research projects. We bridge the gap between clinical training and research excellence.
                  </p>
                  <p className="text-text-muted mb-4">
                    Whether you're looking to lead a project, contribute to data collection, or simply stay informed about the latest research opportunities, GLINT provides the platform and support you need to make an impact in gastroenterology research.
                  </p>
                </>
              )}

              {/* Features Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
                data-tina-field={tinaField(page, "features")}
              >
                {page.features && page.features.length > 0 ? (
                  page.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[feature?.icon || 'collaborate']} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-text">{feature?.title}</h3>
                        <p className="text-sm text-text-muted">{feature?.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Default features
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths.collaborate} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-text">Collaborative Research</h3>
                        <p className="text-sm text-text-muted">Bringing together trainees from across London to work on impactful multi-centre studies.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pb-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-text mb-4"
              data-tina-field={tinaField(page, "teamSectionTitle")}
            >
              {page.teamSectionTitle || "Our Committee"}
            </h2>
            <p
              className="text-text-muted max-w-2xl mx-auto"
              data-tina-field={tinaField(page, "teamSectionSubtitle")}
            >
              {page.teamSectionSubtitle || "Meet the dedicated trainees who make GLINT possible."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 group-hover:scale-110 transition-transform">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-text text-sm">{member.name}</h3>
                <p className="text-xs text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p
              className="text-text-muted mb-4"
              data-tina-field={tinaField(page, "ctaText")}
            >
              {page.ctaText || "And many more collaborators from hospitals across London..."}
            </p>
            <a
              href={page.ctaButtonLink || "/#contact"}
              className="btn btn-primary"
              data-tina-field={tinaField(page, "ctaButtonLink")}
            >
              <span data-tina-field={tinaField(page, "ctaButtonText")}>
                {page.ctaButtonText || "Join the Network"}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;

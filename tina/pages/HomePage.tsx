import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
  teamMembers?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
};

// Icon SVG paths for feature cards
const featureIconPaths: Record<string, string> = {
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  trending: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  lightbulb: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

// Icon SVG paths for updates section
const updateIconPaths: Record<string, string> = {
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
};

const HomePage = (props: Props) => {
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
      <section className="pt-24 md:pt-28 pb-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span data-tina-field={tinaField(page, "heroTitlePart1")}>
                {page.heroTitlePart1 || "The"}
              </span>{" "}
              <span className="text-gradient" data-tina-field={tinaField(page, "heroHighlight1")}>
                {page.heroHighlight1 || "Pan-London"}
              </span>
              <br />
              <span className="text-gradient" data-tina-field={tinaField(page, "heroHighlight2")}>
                {page.heroHighlight2 || "Gastroenterology"}
              </span>{" "}
              <span data-tina-field={tinaField(page, "heroTitlePart2")}>
                {page.heroTitlePart2 || "Research Group"}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8"
              data-tina-field={tinaField(page, "heroSubtitle")}
            >
              {page.heroSubtitle || "Created to enable gastroenterology trainees across London to collaborate and produce meaningful results for our patients."}
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href={page.heroCTALink || "#contact"}
                className="btn btn-primary"
                data-tina-field={tinaField(page, "heroCTALink")}
              >
                <span data-tina-field={tinaField(page, "heroCTA")}>
                  {page.heroCTA || "Join Mailing List"}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview Section */}
      <section id="projects" className="pt-4 pb-12">
        <div className="container">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            data-tina-field={tinaField(page, "featureCards")}
          >
            {page.featureCards && page.featureCards.length > 0 ? (
              page.featureCards.map((card, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={featureIconPaths[card?.icon || 'clipboard']} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{card?.title}</h3>
                  <p className="text-text-muted text-sm mb-4">{card?.description}</p>
                  <a href={card?.link || "#"} className="arrow-link">
                    {card?.linkText || "Find out more"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              // Default feature cards
              <>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={featureIconPaths.clipboard} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">Projects Past & Present</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Explore our current projects that you could still take part in, plus a showcase of our successful past research initiatives and their impact.
                  </p>
                  <a href="/projects" className="arrow-link">
                    Find out more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Important Dates & Updates Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="section-label"
              data-tina-field={tinaField(page, "datesSectionLabel")}
            >
              {page.datesSectionLabel || "STAY INFORMED"}
            </p>
            <h2
              className="section-title"
              data-tina-field={tinaField(page, "datesSectionTitle")}
            >
              {page.datesSectionTitle || "Important Dates & Updates"}
            </h2>
            <p
              className="section-subtitle mx-auto"
              data-tina-field={tinaField(page, "datesSectionSubtitle")}
            >
              {page.datesSectionSubtitle || "Keep up with the latest news, events, and opportunities from the GLINT network."}
            </p>
          </div>

          <div
            className="max-w-3xl mx-auto space-y-4"
            data-tina-field={tinaField(page, "updates")}
          >
            {page.updates && page.updates.length > 0 ? (
              page.updates.map((update, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={updateIconPaths[update?.icon || 'calendar']} />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="timeline-date">{update?.date}</span>
                      <span className={`badge badge-${update?.badgeType || 'primary'}`}>
                        {update?.badgeText}
                      </span>
                    </div>
                    <h3 className="timeline-title">{update?.title}</h3>
                    <p className="timeline-description">{update?.description}</p>
                  </div>
                </div>
              ))
            ) : (
              // Default updates
              <>
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={updateIconPaths.calendar} />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="timeline-date">2024</span>
                      <span className="badge badge-primary">Newsletter</span>
                    </div>
                    <h3 className="timeline-title">GLINT Quarterly Newsletter Launches</h3>
                    <p className="timeline-description">
                      We're excited to announce our new quarterly newsletter.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text */}
            <div>
              <p
                className="section-label"
                data-tina-field={tinaField(page, "aboutSectionLabel")}
              >
                {page.aboutSectionLabel || "ABOUT GLINT"}
              </p>
              <h2
                className="section-title text-left"
                data-tina-field={tinaField(page, "aboutSectionTitle")}
              >
                {page.aboutSectionTitle?.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < (page.aboutSectionTitle?.split('\n').length ?? 0) - 1 && <br />}
                  </span>
                )) || (
                  <>
                    Gastro London<br />
                    Investigative Network<br />
                    for Trainees
                  </>
                )}
              </h2>
              <p
                className="text-text-muted mt-6 mb-4"
                data-tina-field={tinaField(page, "aboutDescription1")}
              >
                {page.aboutDescription1 || "GLINT is a trainee-led research group created to enable gastroenterology trainees across London to collaborate on meaningful research projects. We bridge the gap between clinical training and research excellence."}
              </p>
              <p
                className="text-text-muted"
                data-tina-field={tinaField(page, "aboutDescription2")}
              >
                {page.aboutDescription2 || "Whether you're looking to lead a project, contribute to data collection, or simply stay informed about the latest research opportunities, GLINT provides the platform and support you need to make an impact in gastroenterology research."}
              </p>
            </div>

            {/* Right: Committee Wall */}
            <a href="/about" className="block bg-surface rounded-2xl p-6 shadow-card hover:shadow-lg transition-all group">
              <h3
                className="font-bold text-text mb-4 flex items-center gap-2"
                data-tina-field={tinaField(page, "committeeSectionTitle")}
              >
                {page.committeeSectionTitle || "Meet our Committee"}
                <svg className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </h3>
              <div className="grid grid-cols-5 gap-1">
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact & Mailing List Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="section-label"
              data-tina-field={tinaField(page, "contactSectionLabel")}
            >
              {page.contactSectionLabel || "GET INVOLVED"}
            </p>
            <h2
              className="section-title"
              data-tina-field={tinaField(page, "contactSectionTitle")}
            >
              {page.contactSectionTitle || "Get in Touch"}
            </h2>
            <p
              className="section-subtitle mx-auto"
              data-tina-field={tinaField(page, "contactSectionSubtitle")}
            >
              {page.contactSectionSubtitle || "Have a question or want to join our mailing list? We'd love to hear from you."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-card">
              <h3
                className="text-xl font-bold text-text mb-4 flex items-center gap-2"
                data-tina-field={tinaField(page, "contactFormTitle")}
              >
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {page.contactFormTitle || "Contact Us"}
              </h3>
              <p
                className="text-text-muted text-sm mb-6"
                data-tina-field={tinaField(page, "contactFormSubtitle")}
              >
                {page.contactFormSubtitle || "Got a question or research idea? Send us a message."}
              </p>

              <form action="https://formspree.io/f/xrezokpn" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="GLINT Website Contact Form" />

                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Dr. John Smith"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="john.smith@nhs.net"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your research idea or question..."
                    className="form-input resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Mailing List Form */}
            <div id="mailing-list" className="bg-surface rounded-2xl p-6 md:p-8 shadow-card">
              <h3
                className="text-xl font-bold text-text mb-4 flex items-center gap-2"
                data-tina-field={tinaField(page, "mailingListTitle")}
              >
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {page.mailingListTitle || "Join Mailing List"}
              </h3>
              <p
                className="text-text-muted text-sm mb-6"
                data-tina-field={tinaField(page, "mailingListSubtitle")}
              >
                {page.mailingListSubtitle || "Stay updated on new projects, events, and opportunities."}
              </p>

              <form action="https://formspree.io/f/xrezokpn" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="GLINT Mailing List Signup" />
                <input type="hidden" name="form_type" value="mailing_list" />

                <div className="form-group">
                  <label htmlFor="mailing-name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="mailing-name"
                    name="name"
                    required
                    placeholder="Dr. John Smith"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailing-workplace" className="form-label">Current Place of Work *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="mailing-workplace"
                      name="workplace"
                      required
                      placeholder="e.g., King's College Hospital"
                      className="form-input"
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mailing-email" className="form-label">Email Address *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="mailing-email"
                      name="email"
                      required
                      placeholder="john.smith@nhs.net"
                      className="form-input"
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Subscribe
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>

              <p className="text-xs text-text-light mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

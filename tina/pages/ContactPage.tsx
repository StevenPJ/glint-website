import { tinaField, useTina } from "tinacms/dist/react";

interface Benefit {
  text: string;
  [key: string]: unknown;
}

interface PageData {
  contactPage: {
    formTitle?: string | null;
    formSubtitle?: string | null;
    sidebarTitle?: string | null;
    benefits?: Array<Benefit | null> | null;
    connectEmail?: string | null;
    connectTwitter?: string | null;
  };
}

interface ContactPageProps {
  data: PageData;
  query: string;
  variables: object;
}

const checkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
  </svg>
);

const ContactPage = (props: ContactPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.contactPage;
  const benefits = (page.benefits ?? []).filter(Boolean) as Benefit[];

  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

        {/* LEFT: Join Our Network form */}
        <div>
          <h2
            className="text-2xl font-semibold font-serif mb-2"
            data-tina-field={tinaField(page, "formTitle")}
          >
            {page.formTitle}
          </h2>
          <p
            className="text-muted-foreground mb-6"
            data-tina-field={tinaField(page, "formSubtitle")}
          >
            {page.formSubtitle}
          </p>

          <form action="https://formspree.io/f/xrezokpn" method="POST" className="space-y-5">
            <input type="hidden" name="_subject" value="GLINT Website Contact Form" />

            {/* Name + Email side by side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Dr. Jane Smith"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="jane.smith@nhs.net"
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="form-label">Institution / Hospital</label>
              <input
                type="text"
                id="institution"
                name="institution"
                placeholder="e.g. Guy's and St Thomas' NHS Foundation Trust"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="areaOfInterest" className="form-label">Area of Interest</label>
              <input
                type="text"
                id="areaOfInterest"
                name="areaOfInterest"
                placeholder="e.g. IBD, Hepatology, Endoscopy"
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us how you'd like to get involved..."
                className="form-input"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary text-base py-2.5 px-8">
              Submit
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </button>
          </form>
        </div>

        {/* RIGHT: Why Join + Connect stacked */}
        <div className="lg:pl-8 flex flex-col gap-8">
          {/* Why Join GLINT? */}
          <div className="rounded-xl p-6 lg:p-8" style={{ backgroundColor: "rgba(237, 240, 242, 0.5)" }}>
            <h2
              className="text-2xl font-semibold font-serif mb-6"
              data-tina-field={tinaField(page, "sidebarTitle")}
            >
              {page.sidebarTitle}
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  {checkIcon}
                  <span
                    className="text-muted-foreground"
                    data-tina-field={tinaField(benefit, "text")}
                  >
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="card-elevated p-6 lg:p-8">
            <h2 className="text-2xl font-semibold font-serif mb-6">Connect With Us</h2>
            <div className="space-y-4">
              {page.connectEmail && (
                <a
                  href={`mailto:${page.connectEmail}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-tina-field={tinaField(page, "connectEmail")}
                >
                  <div className="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  {page.connectEmail}
                </a>
              )}
              {page.connectTwitter && (
                <a
                  href={`https://twitter.com/${page.connectTwitter.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-tina-field={tinaField(page, "connectTwitter")}
                >
                  <div className="icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  {page.connectTwitter}
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;

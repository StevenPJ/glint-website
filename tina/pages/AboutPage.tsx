import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";

interface PageValue {
  icon?: string | null;
  title: string;
  description: string;
  [key: string]: unknown;
}

interface TeamMember {
  name: string;
  role: string;
  initials?: string | null;
  bio: string;
  image?: string | null;
  order?: number | null;
}

interface TeamEdge {
  node?: TeamMember | null;
}

interface PageData {
  aboutPage: {
    missionTitle?: string | null;
    missionContent?: string | null;
    valuesTitle?: string | null;
    values?: Array<PageValue | null> | null;
    teamTitle?: string | null;
    teamSubtitle?: string | null;
  };
  teamConnection?: {
    edges?: Array<TeamEdge | null> | null;
  };
}

interface AboutPageProps {
  data: PageData;
  query: string;
  variables: object;
}

const valueIconSvgs: Record<string, React.ReactElement> = {
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  activity: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

const AboutPage = (props: AboutPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.aboutPage;
  const teamMembers = (data.teamConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean) as TeamMember[];

  const values = (page.values ?? []).filter(Boolean) as PageValue[];

  return (
    <>
      {/* Our Mission */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold font-serif mb-6"
              data-tina-field={tinaField(page, "missionTitle")}
            >
              {page.missionTitle}
            </h2>
            <p
              className="text-muted-foreground text-lg leading-relaxed"
              data-tina-field={tinaField(page, "missionContent")}
            >
              {page.missionContent}
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "rgba(237, 240, 242, 0.5)" }}>
        <div className="container">
          <h2
            className="text-3xl md:text-4xl font-semibold font-serif text-center mb-12"
            data-tina-field={tinaField(page, "valuesTitle")}
          >
            {page.valuesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(19, 91, 108, 0.1)" }}
                >
                  {value.icon && valueIconSvgs[value.icon]
                    ? valueIconSvgs[value.icon]
                    : valueIconSvgs.star}
                </div>
                <h3
                  className="text-xl font-semibold font-serif mb-3"
                  data-tina-field={tinaField(value, "title")}
                >
                  {value.title}
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  data-tina-field={tinaField(value, "description")}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold font-serif mb-4"
              data-tina-field={tinaField(page, "teamTitle")}
            >
              {page.teamTitle}
            </h2>
            <p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              data-tina-field={tinaField(page, "teamSubtitle")}
            >
              {page.teamSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="card-elevated p-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.initials || member.name)}&background=d4ecf0&color=135B6C&size=200&font-size=0.4&bold=true`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold font-serif">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

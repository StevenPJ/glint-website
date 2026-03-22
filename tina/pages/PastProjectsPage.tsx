import { useTina } from "tinacms/dist/react";

interface Publication {
  title: string;
  type: string;
  authors?: string | null;
  journal?: string | null;
  year?: string | null;
  volume?: string | null;
  doi?: string | null;
  venue?: string | null;
  venueDate?: string | null;
  order?: number | null;
}

interface PublicationEdge {
  node?: Publication | null;
}

interface PageData {
  pastProjectsPage: object;
  publicationConnection?: {
    edges?: Array<PublicationEdge | null> | null;
  };
}

interface PastProjectsPageProps {
  data: PageData;
  query: string;
  variables: object;
}

const PastProjectsPage = (props: PastProjectsPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const publications = (data.publicationConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean) as Publication[];

  const journalPubs = publications.filter((p) => p.type === "publication");
  const presentations = publications.filter((p) => p.type === "presentation");

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      {/* Publications Section */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold">Publications</h2>
        </div>

        <div className="flex flex-col gap-4">
          {journalPubs.map((pub, i) => (
            <article
              key={i}
              className="bg-card rounded-lg p-5 border border-border shadow-[0_4px_20px_-4px_rgba(18,31,43,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {pub.doi ? (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground block mb-2 hover:text-primary transition-colors"
                >
                  {pub.title}
                </a>
              ) : (
                <p className="font-medium text-foreground block mb-2">{pub.title}</p>
              )}
              {pub.authors && (
                <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
              )}
              {(pub.journal || pub.year || pub.volume) && (
                <p className="text-sm text-muted-foreground mb-2">
                  {pub.journal && <span className="font-medium">{pub.journal}</span>}
                  {pub.journal && pub.year && " • "}
                  {pub.year}
                  {pub.volume && ` • ${pub.volume}`}
                </p>
              )}
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary mt-2 inline-block hover:underline"
                >
                  doi: {pub.doi}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Conference Presentations Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold">Conference Presentations</h2>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {presentations.map((pres, i) => (
            <article
              key={i}
              className="bg-card rounded-lg p-5 border border-border shadow-[0_4px_20px_-4px_rgba(18,31,43,0.08)] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <p className="font-medium text-foreground mb-2">{pres.title}</p>
              {(pres.venue || pres.venueDate) && (
                <p className="text-sm text-muted-foreground">
                  {pres.venue}
                  {pres.venue && pres.venueDate && " \u00b7 "}
                  {pres.venueDate}
                </p>
              )}
            </article>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">More presentations to be added soon.</p>
      </section>
    </div>
  );
};

export default PastProjectsPage;

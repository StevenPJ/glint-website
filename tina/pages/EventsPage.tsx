import { tinaField, useTina } from "tinacms/dist/react";

interface Event {
  title: string;
  date: string;
  time?: string | null;
  location?: string | null;
  status: string;
  isFree?: boolean | null;
  description?: string | null;
  url?: string | null;
  order?: number | null;
}

interface EventEdge {
  node?: Event | null;
}

interface PageData {
  page: {
    ctaTitle?: string | null;
    ctaSubtitle?: string | null;
    ctaCTA1Text?: string | null;
    ctaCTA1Link?: string | null;
  };
  eventConnection?: {
    edges?: Array<EventEdge | null> | null;
  };
}

interface EventsPageProps {
  data: PageData;
  query: string;
  variables: object;
}

const calendarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const clockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const locationIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

function formatEventDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function formatPastEventDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

const EventsPage = (props: EventsPageProps) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;
  const now = new Date();

  const events = (data.eventConnection?.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean) as Event[];

  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);
  const pastEvents = events.filter((e) => new Date(e.date) < now);

  return (
    <>
      <section className="container py-10 md:py-12">
        {/* Upcoming Events */}
        <h2 className="text-2xl md:text-3xl font-bold font-serif mb-8">Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <div className="card-elevated p-6 md:p-8">
            <p className="text-muted-foreground">No upcoming events at this time. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="card-elevated p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-primary">{event.status}</span>
                  {event.isFree && <span className="badge badge-success">Free</span>}
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-serif mb-4">
                  {event.title}
                </h3>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-muted-foreground)] mb-4">
                  <span className="flex items-center gap-1.5">
                    {calendarIcon}
                    {formatEventDate(event.date)}
                  </span>
                  {event.time && (
                    <span className="flex items-center gap-1.5">
                      {clockIcon}
                      {event.time}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      {locationIcon}
                      {event.location}
                    </span>
                  )}
                </div>

                {event.description && (
                  <p className="text-[var(--color-muted-foreground)]">{event.description}</p>
                )}

                {event.url && (
                  <div className="mt-4">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      Register Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-10 md:py-16" style={{ backgroundColor: "rgba(237, 240, 242, 0.5)" }}>
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-semibold font-serif mb-8">Past Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event, i) => (
                <div key={i} className="card-elevated p-6">
                  <p className="font-semibold font-serif mb-2">{event.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatPastEventDate(event.date)}</span>
                    {event.isFree !== undefined && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-medium">Sold out</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="hero-gradient relative py-16 md:py-24">
        <div className="container relative text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold font-serif text-white mb-4"
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
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsPage;

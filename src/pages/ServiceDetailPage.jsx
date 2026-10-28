
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DETAILED_SERVICES } from "../data/serviceDetails";

export default function ServiceDetailPage({
  serviceId: serviceIdProp,
  onNavigate,
  onOpenQuote,
}) {
  // The route is the source of truth for direct links and card navigation.
  const { id: routeServiceId } = useParams();
  const serviceId = serviceIdProp ?? routeServiceId;
  const service = DETAILED_SERVICES[serviceId];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [serviceId]);

  // Show a helpful message instead of silently displaying Air Freight.
  if (!service) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-[var(--asphalt)] px-5 py-16 text-center text-white">
        <h1 className="text-3xl font-bold">
          Service Not Found
        </h1>

        <p className="mt-4 max-w-lg text-neutral-400">
          The requested service could not be found.
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          Service ID: {String(serviceId ?? "undefined")}
        </p>

        <button
          type="button"
          onClick={() => onNavigate("services")}
          className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Back to Services
        </button>
      </section>
    );
  }

  const allServiceKeys = Object.keys(DETAILED_SERVICES);
  const currentIndex = allServiceKeys.indexOf(service.id);

  const prevServiceKey =
    allServiceKeys[
      (currentIndex - 1 + allServiceKeys.length) %
        allServiceKeys.length
    ];

  const nextServiceKey =
    allServiceKeys[
      (currentIndex + 1) % allServiceKeys.length
    ];

  const prevService = DETAILED_SERVICES[prevServiceKey];
  const nextService = DETAILED_SERVICES[nextServiceKey];

  const handleNavigate = (id) => {
    onNavigate("service-detail", undefined, id);
  };

  return (
    <main className="min-h-screen bg-(--asphalt) text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {service.heroImage && (
          <div className="absolute inset-0">
            <img
              src={service.heroImage}
              alt={service.alt || service.title}
              className="h-full w-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-(--asphalt)" />
          </div>
        )}

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <button
            type="button"
            onClick={() => onNavigate("services")}
            className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to Services
          </button>

          {/* {service.index && (
            <p className="mb-5 font-mono text-sm tracking-[0.2em] text-red-500">
              SERVICE {service.index}
            </p>
          )} */}

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            {service.title}
          </h1>

          {service.subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
              {service.subtitle}
            </p>
          )}

          {/* {onOpenQuote && (
            <button
              type="button"
              onClick={() => onOpenQuote({ ...service, cargo: service.cardTitle, vehicle: service.cardTitle })}
              className="mt-9 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Request a Quote
            </button>
          )} */}
        </div>
      </section>

      {/* Key metrics */}
      {Array.isArray(service.keyMetrics) &&
        service.keyMetrics.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.keyMetrics.map((metric, index) => (
                <div key={`${service.id}-metric-${index}`} className="rounded-xl border border-white/10 bg-white/3 p-5 sm:p-6">
                  {typeof metric === "object" && metric !== null ? (
                    <>
                      <p className="text-2xl font-bold text-red-500">
                        {metric.value ?? metric.number ?? ""}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        {metric.label ?? metric.title ?? metric.name ?? ""}
                      </p>
                    </>
                  ) 
                  :
                  ( <p className="text-base font-semibold text-neutral-200">{metric}</p>)}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Overview */}
      {service.overview && (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
                Overview
              </p>

              <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {service.cardTitle || service.title}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-8 text-neutral-300">
                {Array.isArray(service.overview) ? (
                  service.overview.map((paragraph, index) => (
                    <p key={`${service.id}-overview-${index}`}>
                      {typeof paragraph === "string"
                        ? paragraph
                        : paragraph?.text || ""}
                    </p>
                  ))
                ) : (
                  <p>{service.overview}</p>
                )}
              </div>
            </div>

            {service.heroImage && (
              <div className="overflow-hidden rounded-xl border border-white/10">
                <img
                  src={service.heroImage}
                  alt={service.alt || service.title}
                  loading="lazy"
                  className="h-full min-h-64 w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service components */}
      {Array.isArray(service.components) &&
        service.components.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
              What We Offer
            </p>

            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              {service.componentsTitle || "Service Capabilities"}
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.components.map((component, index) => (
                <article
                  key={`${service.id}-component-${index}`}
                  className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <h3 className="text-lg font-semibold">
                    {typeof component === "string"
                      ? component
                      : component.title || component.name || ""}
                  </h3>

                  {typeof component === "object" &&
                    component.description && (
                      <p className="mt-3 text-sm leading-7 text-neutral-400">
                        {component.description}
                      </p>
                    )}
                </article>
              ))}
            </div>
          </section>
        )}

      {/* Corridors */}
      {Array.isArray(service.corridors) &&
        service.corridors.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
              Coverage
            </p>

            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Global Corridors
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.corridors.map((corridor, index) => (
                <div
                  key={`${service.id}-corridor-${index}`}
                  className="rounded-lg border border-white/10 p-5"
                >
                  {typeof corridor === "string" ? (
                    <p className="font-medium text-neutral-200">
                      {corridor}
                    </p>
                  ) : (
                    <>
                      <h3 className="font-semibold">
                        {corridor.title ||
                          corridor.name ||
                          corridor.route ||
                          ""}
                      </h3>

                      {corridor.description && (
                        <p className="mt-2 text-sm leading-6 text-neutral-400">
                          {corridor.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Compliance */}
      {Array.isArray(service.complianceStandards) &&
        service.complianceStandards.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-500">
              Standards
            </p>

            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              Compliance & Standards
            </h2>

            <div className="flex flex-wrap gap-3">
              {service.complianceStandards.map((standard, index) => (
                <span
                  key={`${service.id}-standard-${index}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300"
                >
                  {typeof standard === "string"
                    ? standard
                    : standard.name || standard.title || ""}
                </span>
              ))}
            </div>
          </section>
        )}

      {/* Quote CTA */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Need help with {service.title}?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
            Talk to our team about your requirements and receive a solution
            tailored to your shipment.
          </p>

          {onOpenQuote && (
            <button
              type="button"
              onClick={() => onOpenQuote({ ...service, cargo: service.cardTitle, vehicle: service.cardTitle })}
              className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Request a Quote
            </button>
          )}
        </div>
      </section>

      {/* Previous / Next */}
      <nav
        aria-label="Other services"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-4 border-t border-white/10 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:px-12"
      >
        <button
          type="button"
          onClick={() => handleNavigate(prevService.id)}
          className="rounded-xl border border-white/10 p-5 text-left transition hover:border-red-500/60"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-500">
            Previous Service
          </span>
          <span className="mt-2 block text-lg font-semibold">
            ← {prevService.title}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate(nextService.id)}
          className="rounded-xl border border-white/10 p-5 text-left transition hover:border-red-500/60 sm:text-right"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-500">
            Next Service
          </span>
          <span className="mt-2 block text-lg font-semibold">
            {nextService.title} →
          </span>
        </button>
      </nav>
    </main>
  );
}

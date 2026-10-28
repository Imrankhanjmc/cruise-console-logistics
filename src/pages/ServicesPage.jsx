import { useEffect } from 'react';
import HazardStrip from '../components/HazardStrip';
import { DETAILED_SERVICES } from '../data/serviceDetails';

export default function ServicesPage({
  onNavigate,
  onOpenQuote,
  initialHash,
}) {
  useEffect(() => {
    if (initialHash) {
      const el = document.getElementById(initialHash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialHash]);

  const servicesList = Object.values(DETAILED_SERVICES);

  return (
    <div className="bg-(--asphalt) min-h-screen">
      {/* PAGE HEADER */}
      <header className="page-head">
        <div className="page-head-media">
          <img
            src="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Cargo plane on runway at sunset"
          />
        </div>
        <div className="wrap">
          <div className="page-head-inner">
            <div className="breadcrumb">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
              >
                Home
              </a>
              <span>/</span>
              <span>Services</span>
            </div>
            <h1>Operational Services</h1>
            <p>
              Eight specialist carrier disciplines, engineered for precision, speed, and discretion.
              Select any capability below for complete specifications.
            </p>
          </div>
        </div>
      </header>

      <HazardStrip />

      {/* 8-BOX SERVICE SECTION MATCHING EXACT SCREENSHOT STRUCTURE */}
      <section className="py-16 md:py-24 bg-[#0d0e11]">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-head mb-12">
            <div className="eyebrow">Disciplines Manifest</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-white">
              Carrier Capabilities
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              Each discipline operates under dedicated equipment standards and certified logistics protocols.
            </p>
          </div>

          {/* 8 BOXES IN 4-COLUMN MATRIX MATCHING SCREENSHOT EXACTLY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {servicesList.map((srv) => (
              <div
                key={srv.id}
                id={srv.id}
                role="button"
                tabIndex={0}
                onClick={() => onNavigate("service-detail", undefined, srv.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavigate("service-detail", undefined, srv.id);
                  }
                }}
                className="group bg-[#16171b] hover:bg-[#1b1c22] border border-[#272932] hover:border-[#3d4150] rounded-sm p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left select-none shadow-xl"
              >
                {/* Upper Content: Index, Title, Description */}
                <div className="flex flex-col flex-1">
                  {/* Top Index Number (01, 02, etc.) */}
                  <div className="font-mono text-sm sm:text-[15px] text-[#636c7c] tracking-wider mb-5">
                    {srv.index}
                  </div>

                  {/* Title (e.g. AIR FREIGHT) */}
                  <h3 className="font-display text-2xl sm:text-[25px] font-bold uppercase tracking-tight text-white mb-4 leading-none group-hover:text-neutral-100 transition-colors">
                    {srv.cardTitle}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[15px] sm:text-base leading-[1.6] text-[#868e9d] mb-8 flex-1">
                    {srv.shortDescription}
                  </p>
                </div>

                {/* Divider Line & Bottom VIEW DETAILS Action */}
                <div className="pt-5 border-t border-[#262832] flex items-center justify-between mt-auto">
                  <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#ff941a] group-hover:text-[#ffaa40] transition-colors">
                    VIEW DETAILS
                  </span>
                  <span className="text-sm sm:text-base text-[#ff941a] group-hover:text-[#ffaa40] transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HazardStrip thin />

      {/* BOTTOM INQUIRIES SECTION */}
      <section className="cta-band py-20 bg-(--asphalt-2) border-t border-white/10">
        <div className="wrap max-w-4xl mx-auto text-center px-4">
          <div className="eyebrow justify-center mb-4">Custom Route Engineering</div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white mb-4">
            Need a Multi-Mode Shipping Plan?
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Whether coordinating race rally logistics, international yacht transport, or confidential multi-vehicle collections, our senior coordinators engineer routes end-to-end.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="btn btn-primary cursor-pointer px-8 py-4 text-xs sm:text-sm"
              onClick={onOpenQuote}
            >
              Inquire With Operations Desk
              <span className="btn-arrow">→</span>
            </button>
            <a
              href="tel:+971544323473"
              className="btn btn-outline cursor-pointer px-8 py-4 text-xs sm:text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
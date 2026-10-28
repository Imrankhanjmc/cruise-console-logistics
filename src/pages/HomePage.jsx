import { useState, useEffect, useRef } from 'react';
import HazardStrip from '../components/HazardStrip';
import MovingTickerBanner from '../components/MovingTickerBanner';
import { TESTIMONIALS } from '../data/content';
import { DETAILED_SERVICES } from '../data/serviceDetails';

export default function HomePage({ onNavigate, onOpenQuote }) {
  // Animated stats count-up from 0 to target values (starts only when scrolled into view)
  const [counts, setCounts] = useState({
    assets: 0,
    onTime: 0,
    countries: 0,
    years: 0,
  });

  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime = null;
    const duration = 2200;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        assets: Math.floor(3200 * easeOut),
        onTime: Number((95 * easeOut).toFixed(1)),
        countries: Math.floor(50 * easeOut),
        years: Math.floor(3 * easeOut),
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated]);

  return (
    <div>
      {/* HERO SECTION */}
      <header className="hero">
        <div className="hero-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.pexels.com/videos/7727415/lamborghini-7727415.jpeg?auto=compress&cs=tinysrgb&w=1600"
          >
            <source
              src="https://videos.pexels.com/video-files/7727415/7727415-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="hero-inner wrap">
          <h1>
            PRECISION FREIGHT
            <br />
            FOR EXTRAORDINARY
            <br />
            <em>MACHINES.</em>
          </h1>

          <p className="hero-sub font-['Rajdhani',sans-serif] text-xl sm:text-2xl font-medium tracking-wide text-neutral-200 leading-relaxed max-w-2xl my-8">
            Cruise Console is the premier specialist carrier engineered for high-performance automotive,
            marine craft, and heavy industrial machinery — executing white-glove sea, air, and enclosed
            road transport tailored to your exact asset.
          </p>
        </div>
      </header>

      {/* MOVING TICKER BANNER */}
      <MovingTickerBanner />

      {/* SERVICES OVERVIEW */}
      <section id="services" className="py-24 md:py-32 bg-(--asphalt-2) relative">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-head mb-16 md:mb-20 max-w-2xl">
            <div className="eyebrow">
              Operational Services
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-white">
              One Carrier, Every Mode
            </h2>
          </div>

          {/* 8 BOXES IN 4-COLUMN MATRIX MATCHING SCREENSHOT EXACTLY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {Object.values(DETAILED_SERVICES)
              .filter((_, index) => index !== 3 && index !== 7)
              .map((srv, index) => (
                <div
                  key={srv.id}
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
                  {/* Upper Content */}
                  <div className="flex flex-col flex-1">
                    {/* Top Index Number */}
                    <div className="font-mono text-sm sm:text-[15px] text-[#636c7c] tracking-wider mb-5">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Title */}
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

      {/* WHY CHOOSE US & PROVEN STATS MANIFEST */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why Choose Cruise Console</div>
            <h2>Built for Assets Others Won't Touch</h2>
          </div>

          <div className="feature-row">
            <div className="feature-cell">
              <div className="f-num">/ 01</div>
              <h3>Specialized Handling</h3>
              <p>
                Purpose-built cradles, low-clearance ramps, and full down recovery — nothing is
                moved on general freight equipment.
              </p>
            </div>

            <div className="feature-cell">
              <div className="f-num">/ 02</div>
              <h3>Full Traceability</h3>
              <p>
                Every handoff is photographed and logged. You see exactly where your shipment is and
                who last touched it.
              </p>
            </div>

            <div className="feature-cell">
              <div className="f-num">/ 03</div>
              <h3>Global Compliance</h3>
              <p>
                In-house customs specialists remove the paperwork risk from
                cross-border movement.
              </p>
            </div>
          </div>

          {/* STAT MANIFEST */}
          <div
            ref={statsRef}
            className="mt-16 sm:mt-20 md:mt-24 pt-10 sm:pt-12 border-t border-white/10 w-full relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
              {/* Stat 1: Assets Shipped */}
              <div className="bg-linear-to-b from-[#141519] to-[#0c0d10] border border-white/10 hover:border-red-600/50 shadow-lg rounded-xl px-5 py-8 sm:px-6 sm:py-9 md:py-10 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:-translate-y-1">
                {/* <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/4 border border-white/10 flex items-center justify-center text-lg sm:text-xl mb-3 shadow-inner group-hover:scale-110 group-hover:border-red-500/40 group-hover:bg-red-500/5 transition-all duration-300 select-none">
                  🏎️
                </div> */}

                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-(--redline) uppercase mb-2 text-center">
                  Assets Shipped
                </span>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white flex items-baseline justify-center">
                  {counts.assets.toLocaleString()}
                  <span className="text-(--redline) text-lg sm:text-xl font-bold ml-1">
                    +
                  </span>
                </div>
              </div>

              {/* Stat 2: On-Time Delivery */}
              <div className="bg-linear-to-b from-[#141519] to-[#0c0d10] border border-white/10 hover:border-red-600/50 shadow-lg rounded-xl px-5 py-8 sm:px-6 sm:py-9 md:py-10 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:-translate-y-1">
                {/* <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/4 border border-white/10 flex items-center justify-center text-lg sm:text-xl mb-3 shadow-inner group-hover:scale-110 group-hover:border-red-500/40 group-hover:bg-red-500/5 transition-all duration-300 select-none">
                  ⏱️
                </div> */}

                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-(--redline) uppercase mb-2 text-center">
                  On-Time Delivery
                </span>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white flex items-baseline justify-center">
                  {counts.onTime.toFixed(1)}
                  <span className="text-(--redline) text-lg sm:text-xl font-bold ml-1">
                    %
                  </span>
                </div>
              </div>

              {/* Stat 3: Countries Served */}
              <div className="bg-linear-to-b from-[#141519] to-[#0c0d10] border border-white/10 hover:border-red-600/50 shadow-lg rounded-xl px-5 py-8 sm:px-6 sm:py-9 md:py-10 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:-translate-y-1">
                {/* <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/4 border border-white/10 flex items-center justify-center text-lg sm:text-xl mb-3 shadow-inner group-hover:scale-110 group-hover:border-red-500/40 group-hover:bg-red-500/5 transition-all duration-300 select-none">
                  🌍
                </div> */}

                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-(--redline) uppercase mb-2 text-center">
                  Countries Served
                </span>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white flex items-baseline justify-center">
                  {counts.countries}
                  <span className="text-(--redline) text-lg sm:text-xl font-bold ml-1">
                    +
                  </span>
                </div>
              </div>

              {/* Stat 4: Years Operating */}
              <div className="bg-linear-to-b from-[#141519] to-[#0c0d10] border border-white/10 hover:border-red-600/50 shadow-lg rounded-xl px-5 py-8 sm:px-6 sm:py-9 md:py-10 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:-translate-y-1">
                {/* <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/4 border border-white/10 flex items-center justify-center text-lg sm:text-xl mb-3 shadow-inner group-hover:scale-110 group-hover:border-red-500/40 group-hover:bg-red-500/5 transition-all duration-300 select-none">
                  🏆
                </div> */}

                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-(--redline) uppercase mb-2 text-center">
                  Years Operating
                </span>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight text-white flex items-baseline justify-center">
                  {counts.years}
                  <span className="text-(--redline) text-xs sm:text-sm font-bold ml-1.5 font-mono">
                    YRS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HazardStrip thin />

      {/* PROCESS */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">/// 01–04 — The Process</div>
            <h2>How a Shipment Moves</h2>
            <p>
              A fixed four-stage sequence, run the same way on every job, from a single bike to a
              full fleet mobilisation.
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="p-num">01</div>
              <h3>Assessment &amp; Quote</h3>
              <p>
                We review the asset, route, and timeline, then issue a fixed quote within 24 hours.
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">02</div>
              <h3>Collection &amp; Inspection</h3>
              <p>
                Condition report and photography at pickup, before anything is loaded.
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">03</div>
              <h3>Transit &amp; Customs</h3>
              <p>
                {/* Milestone tracking across every leg, with clearance handled ahead of arrival. */}
                Milestone tracking across every live with clearance process handled
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">04</div>
              <h3>Delivery &amp; Sign-Off</h3>
              <p>
                Final inspection matched against the original report before handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HazardStrip thin />

      {/* GLOBAL REACH */}
      <section className="py-28 md:py-40 bg-(--asphalt-2) relative">
        <div className="wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="section-head mb-0">
              <div className="eyebrow">Global Reach</div>
              <h2>Operating on Six Continents</h2>

              <p className="text-neutral-400 max-w-xl text-sm sm:text-base mt-2">
                Scheduled weekly lanes between primary luxury automotive, marine craft, and heavy industrial hubs worldwide.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary cursor-pointer whitespace-nowrap self-start md:self-auto"
              onClick={() => onNavigate('global-network')}
            >
              Interactive 3D Network <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Clean route corridors box */}
          <div className="my-10 sm:my-16 p-6 sm:p-8 md:p-10 lg:p-12 bg-[#121316] border border-white/10 rounded-2xl shadow-2xl">
            <div className="pb-6 mb-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-(--redline) animate-pulse"></span>

                <span className="font-mono text-xs tracking-widest text-white uppercase font-medium">
                  Scheduled Transit Lanes
                </span>
              </div>

              <span className="font-mono text-xs text-neutral-400 uppercase hidden sm:inline">
                Dubai Central Dispatch
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    Dubai → London
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    RoRo &amp; Air Options
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  Weekly RoRo
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    Los Angeles → Dubai
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    High-Priority Cargo
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  Air Charter
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    Tokyo → Dubai
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    JDM &amp; Performance
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  JDM Imports
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    Europe → Riyadh
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    Cross-Border Transport
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  Road + Sea
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    New York → Jebel Ali
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    FCL Dedicated Vessel
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  Container
                </span>
              </div>

              <div className="p-6 sm:p-7 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-600/50 hover:bg-white/[0.05] transition-all flex items-center justify-between shadow-md group">
                <div>
                  <div className="font-display text-lg font-bold text-white group-hover:text-[var(--redline)] transition-colors">
                    Rotterdam → Abu Dhabi
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    Industrial Machinery
                  </div>
                </div>

                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-red-600/10 border border-red-600/30 text-[var(--redline)] rounded">
                  Heavy Haul
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Client Manifest</div>
            <h2>What Owners &amp; Fleet Managers Say</h2>
            <p className="testimonials-subtitle">
              Trusted by owners and fleet managers for precision,
              care, and dependable global logistics.
            </p>
          </div>
        </div>

        <div className="testimonials-slider">
          <div className="testimonials-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <article
                key={`${t.author}-${i}`}
                className="testi-card"
              >
                <div className="testi-card-top">
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>

                  <div
                    className="stars"
                    aria-label={`${t.stars} stars`}
                  >
                    {t.stars}
                  </div>
                </div>

                <p className="testi-quote">{t.quote}</p>

                <div className="testi-divider" />

                <div className="who">{t.author}</div>
                <div className="testi-caption">Verified Client</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <div
            className="eyebrow"
            style={{ justifyContent: 'center' }}
          >
            Ready to Ship?
          </div>

          <h2>
            Initialise Your
            <br />
            Shipment Today.
          </h2>

          <p>
            Tell us what you're moving and where. A specialist will respond with a fixed quote within
            24 hours.
          </p>

          <div className="cta-actions">
            <button
              type="button"
              className="btn btn-primary cursor-pointer"
              onClick={onOpenQuote}
            >
              Get a Quote <span className="btn-arrow">→</span>
            </button>

            <a
              href="tel:+971544323473"
              className="btn btn-outline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
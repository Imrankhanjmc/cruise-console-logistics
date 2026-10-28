import { useState, useEffect } from 'react';
import HazardStrip from '../components/HazardStrip';
import { FAQS } from '../data/content';

export default function AboutPage({ onNavigate, onOpenQuote }) {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <header className="page-head">
        <div className="page-head-media">
          <img
            src="/img/about-hero.svg"
            alt="Cargo vessel navigating open sea at sunrise"
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
              <span>About</span>
            </div>
            <h1>About Cruise Console</h1>
            <p>Seventeen years moving the machines other carriers won't touch.</p>
          </div>
        </div>
      </header>

      <HazardStrip />

      {/* STORY SECTION */}
      <section>
        <div className="wrap">
          <div className="split">
            <div className="split-media">
              <img
                src="/img/about-story.svg"
                alt="Classic luxury automobile prepared for secure shipment"
              />
              <div className="frame-tag">Est. 2009 — Dubai</div>
            </div>
            <div>
              <div className="eyebrow">Our Story</div>
              <h2>Founded on One Frustration</h2>
              <p>
                Cruise Console started with a simple observation: the freight industry was built for
                cartons and pallets, not for machines where a 2mm scratch costs twenty thousand
                dollars or a delay means missing the starting grid.
              </p>
              <p>
                Our founders came out of motorsport logistics and high-end vehicle trade. They built
                Cruise Console from Dubai out — first as an enclosed road carrier across the GCC, then
                expanding into dedicated air charter slots and specialized ocean freight.
              </p>
              <p>
                Today, we move supercars, superbikes, yachts, and heavy plant machinery for private
                collectors, race teams, charter operators, and industrial contractors worldwide. The
                scale has changed; the standard hasn't.
              </p>
              <div style={{ marginTop: '32px' }}>
                <button
                  type="button"
                  className="btn btn-outline cursor-pointer"
                  onClick={() => onNavigate('contact')}
                >
                  Contact Our Team <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section style={{ background: 'var(--asphalt-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Guiding Principles</div>
            <h2>Built on Standards, Not Assumptions</h2>
          </div>

          <div className="value-grid">
            <div className="value-cell">
              <div className="v-mark">/ Mission</div>
              <h3>Move It Like It's Irreplaceable</h3>
              <p>
                Because in our business, it usually is. Every vehicle, yacht, and machine receives the
                same level of engineering and care.
              </p>
            </div>
            <div className="value-cell">
              <div className="v-mark">/ Vision</div>
              <h3>The Default Carrier for High-Value Assets</h3>
              <p>
                The name owners, teams, and contractors think of first when a move carries zero
                margin for error.
              </p>
            </div>
            <div className="value-cell">
              <div className="v-mark">/ Values</div>
              <h3>Documented. Not Assumed.</h3>
              <p>
                Every handoff is photographed, every condition report signed. Trust is built on
                evidence, not promises.
              </p>
            </div>
            <div className="value-cell">
              <div className="v-mark">/ Ownership</div>
              <h3>Accountability at Every Handover</h3>
              <p>
                One accountable team coordinates each milestone, keeps clients informed, and
                resolves issues before they become delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">/// 01–04 — Core Pillars</div>
            <h2>The Four Tenets of Our Operation</h2>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="p-num">01</div>
              <h3>Precision</h3>
              <p>
                Zero guesswork. Equipment, ramps and tie-downs engineered specifically for the asset
                class.
              </p>
            </div>
            <div className="process-step">
              <div className="p-num">02</div>
              <h3>Transparency</h3>
              <p>
                Digital condition reports with photography at every handover. No disputed handoffs.
              </p>
            </div>
            <div className="process-step">
              <div className="p-num">03</div>
              <h3>Accountability</h3>
              <p>
                One dedicated account manager owns the shipment end-to-end. No call centre queues.
              </p>
            </div>
            <div className="process-step">
              <div className="p-num">04</div>
              <h3>Compliance</h3>
              <p>
                In-house customs, Carnet and insurance management so borders never mean delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HazardStrip thin />

      {/* WHO WE MOVE FOR */}
      <section style={{ background: 'var(--asphalt-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Sectors &amp; Client Base</div>
            <h2>Who We Move For</h2>
          </div>

          <div
            className="card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            <div className="service-card">
              <div className="s-index">01</div>
              <h3>Private Collectors</h3>
              <p>
                Hypercars, vintage classics, and bespoke collections moved for rallies, exhibitions,
                and private relocations worldwide.
              </p>
            </div>
            <div className="service-card">
              <div className="s-index">02</div>
              <h3>Motorsport Teams</h3>
              <p>
                Trackside freight for race series across the Middle East, Europe, and Asia — cars,
                engines, spares, and paddock infrastructure.
              </p>
            </div>
            <div className="service-card">
              <div className="s-index">03</div>
              <h3>Marine Operators</h3>
              <p>
                Superyacht tenders, catamarans, and leisure craft moved between shipyard, marina, and
                seasonal cruising grounds.
              </p>
            </div>
            <div className="service-card">
              <div className="s-index">04</div>
              <h3>Plant Contractors</h3>
              <p>
                Heavy machinery, excavators, and JCB fleets mobilised for cross-border infrastructure
                projects on tight schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Frequently Asked Questions</div>
            <h2>Everything You Need to Know</h2>
          </div>

          <div className="max-w-3xl border border-[var(--line)] divide-y divide-[var(--line)]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="bg-[var(--carbon)] transition-colors">
                  <button
                    type="button"
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-mono text-sm uppercase tracking-wider text-[var(--off)] hover:text-[var(--redline)] transition-colors"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="text-xl font-bold text-[var(--redline)]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[var(--steel)] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Get in Touch
          </div>
          <h2>Talk to Our Logistics Team.</h2>
          <p>
            Have questions about an upcoming move, route feasibility, or Carnet requirements? Speak
            directly with a specialist.
          </p>

          <div className="cta-actions">
            <button
              type="button"
              className="btn btn-primary cursor-pointer"
              onClick={onOpenQuote}
            >
              Inquiries <span className="btn-arrow">→</span>
            </button>

            <a href="tel:+971544323473" className="btn btn-outline">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
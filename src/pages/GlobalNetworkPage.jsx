import { useEffect } from 'react';
import HazardStrip from '../components/HazardStrip';
import GlobalNetworkGlobe from '../components/GlobalNetworkGlobe';
import { TRENDING_LANES } from '../data/content';

export default function GlobalNetworkPage({ onNavigate, onOpenQuote }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* 3D GLOBE INTERACTIVE NETWORK VISUALIZATION (Directly presented on page load) */}
      <section className="relative w-full bg-[var(--asphalt)]">
        <GlobalNetworkGlobe
          onRequestQuoteForRoute={(route) => onOpenQuote(route)}
        />
      </section>

      <HazardStrip thin />

      {/* PRIMARY HUB & TRENDING LANES */}
      <section style={{ background: 'var(--asphalt-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Hub Operations</div>
            <h2>Primary Hub: Dubai, UAE</h2>
            <p>
              Headquartered at the intersection of East and West. Direct daily connections into
              Europe, Asia-Pacific, North America and across the GCC.
            </p>
          </div>

          <div className="map-panel" style={{ marginBottom: '32px' }}>
            <img
              src="https://images.pexels.com/photos/13256066/pexels-photo-13256066.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Dubai skyline at night, global logistics hub"
            />
          </div>

          <div className="section-head" style={{ marginBottom: '24px' }}>
            <div className="eyebrow">Volume Routes</div>
            <h3 style={{ fontSize: '26px' }}>
              Trending Lanes This Quarter
            </h3>
          </div>

          <div
            className="route-list"
            style={{ border: '1px solid var(--line)' }}
          >
            {TRENDING_LANES.map((lane, idx) => (
              <div key={idx} className="route">
                <b>
                  {lane.from} → {lane.to}
                </b>
                <span className="r-status">{lane.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK BY MODE */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Network by Mode</div>
            <h2>Three Networks, One Booking</h2>
          </div>

          <div
            className="card-grid"
            style={{
              gridTemplateColumns:
                'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            <div className="service-card">
              <h3>Air Network</h3>
              <p>
                Charter and commercial capacity from 40+ international freight terminals, with priority
                slots for time-critical loads.
              </p>
              <div className="s-link">
                <span>28 partner terminals</span>
                <span>→</span>
              </div>
            </div>

            <div className="service-card">
              <h3>Sea Network</h3>
              <p>
                RoRo, FCL and LCL sailings from every major automotive and marine port, on fixed weekly
                schedules.
              </p>
              <div className="s-link">
                <span>60+ port pairs</span>
                <span>→</span>
              </div>
            </div>

            <div className="service-card">
              <h3>Road Network</h3>
              <p>
                Enclosed and heavy-haul trucking across the GCC, Europe and North America with
                cross-border coordination.
              </p>
              <div className="s-link">
                <span>34 active corridors</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HazardStrip thin />

      {/* COVERAGE BY TERRITORY */}
      <section style={{ background: 'var(--asphalt-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Regions Served</div>
            <h2>Coverage by Territory</h2>
          </div>

          <div className="value-grid">
            <div className="value-cell">
              <div className="v-mark">/ GCC</div>
              <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>
                Middle East
              </h3>
              <p
                style={{
                  color: 'var(--steel)',
                  fontSize: '14px',
                }}
              >
                UAE, KSA, Qatar, Oman, Bahrain, Kuwait
              </p>
            </div>

            <div className="value-cell">
              <div className="v-mark">/ EU</div>
              <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>
                Europe
              </h3>
              <p
                style={{
                  color: 'var(--steel)',
                  fontSize: '14px',
                }}
              >
                UK, Germany, Italy, Netherlands, Switzerland
              </p>
            </div>

            <div className="value-cell">
              <div className="v-mark">/ NA</div>
              <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>
                North America
              </h3>
              <p
                style={{
                  color: 'var(--steel)',
                  fontSize: '14px',
                }}
              >
                USA, Canada, Mexico
              </p>
            </div>

            <div className="value-cell">
              <div className="v-mark">/ APAC</div>
              <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>
                Asia-Pacific
              </h3>
              <p
                style={{
                  color: 'var(--steel)',
                  fontSize: '14px',
                }}
              >
                Japan, Singapore, Australia, South Korea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGISTICS PROCESS */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">/// 01–04 — Logistics Process</div>
            <h2>How a Route Comes Together</h2>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="p-num">01</div>
              <h3>Route Mapping</h3>
              <p>
                We identify the fastest compliant path across mode, border and terminal.
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">02</div>
              <h3>Capacity Booking</h3>
              <p>
                Space is confirmed on vetted carriers with fixed sailing or flight dates.
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">03</div>
              <h3>Customs Clearance</h3>
              <p>
                Import and export permits cleared ahead of transit to prevent terminal dwell.
              </p>
            </div>

            <div className="process-step">
              <div className="p-num">04</div>
              <h3>Final Dispatch</h3>
              <p>
                Doorstep delivery via enclosed transporter or secured port-to-port handover.
              </p>
            </div>
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
            Ready to Route Your Asset?
          </div>

          <h2>
            Initialise Your
            <br />
            Shipment Today.
          </h2>

          <p>
            Submit your origin, destination and asset specifications for a dedicated quote within 24
            hours.
          </p>

          <div className="cta-actions">
            <button
              type="button"
              className="btn btn-primary cursor-pointer"
              onClick={() => onOpenQuote()}
            >
              Inquiries <span className="btn-arrow">→</span>
            </button>

            <a href="tel:+971544323473" className="btn btn-outline">
              Call +971 54 432 3473
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
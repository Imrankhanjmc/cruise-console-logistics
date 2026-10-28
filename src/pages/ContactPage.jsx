import { useState, useEffect } from 'react';
import HazardStrip from '../components/HazardStrip';

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    asset: 'Supercar / Classic Car',
    origin: '',
    destination: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <header className="page-head">
        <div className="page-head-media">
          <img
            src="https://images.pexels.com/photos/31968365/pexels-photo-31968365.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Cargo logistics terminal at dawn"
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
              <span>Contact</span>
            </div>

            <h1>Get in Touch</h1>

            <p>
              Tell us what you're moving. A specialist responds with a fixed quote within 24 hours.
            </p>
          </div>
        </div>
      </header>

      <HazardStrip />

      {/* FORM & OFFICE DETAILS */}
      <section>
        <div className="wrap">
          <div className="contact-grid">
            {/* FORM */}
            <div>
              <div className="section-head" style={{ marginBottom: '32px' }}>
                <div className="eyebrow">Direct Dispatch</div>
                <h2>Inquiries</h2>

                <p>
                  Every inquiry receives dedicated mode recommendation, route feasibility, customs
                  guidance, and detailed operational parameters.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[var(--carbon)] border border-[var(--redline)]/40 p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--redline)]/10 border border-[var(--redline)] flex items-center justify-center text-[var(--redline)] text-2xl font-mono">
                    ✓
                  </div>

                  <div className="eyebrow justify-center">Dossier Registered</div>

                  <h3 className="text-2xl text-[var(--off)] uppercase font-display">
                    Thank You, {formData.name}
                  </h3>

                  <p className="text-[var(--steel)] text-sm max-w-md mx-auto">
                    Your request for shipping{' '}
                    <strong className="text-[var(--off)]">{formData.asset}</strong> from{' '}
                    <strong className="text-[var(--off)]">
                      {formData.origin || 'Origin'}
                    </strong>{' '}
                    to{' '}
                    <strong className="text-[var(--off)]">
                      {formData.destination || 'Destination'}
                    </strong>{' '}
                    has been logged. A senior logistics manager will review your route parameters and
                    dispatch a formal quote within 24 hours.
                  </p>

                  <div className="p-4 bg-[var(--asphalt)] border border-[var(--line)] text-left max-w-md mx-auto font-mono text-xs space-y-1 text-[var(--steel)]">
                    <div>
                      <span className="text-[var(--redline)]">DISPATCH ID:</span> CC-
                      {Math.floor(100000 + Math.random() * 900000)}
                    </div>

                    <div>
                      <span className="text-[var(--redline)]">CENTRAL HUB:</span> Meydan Business
                      Centre, Dubai
                    </div>

                    <div>
                      <span className="text-[var(--redline)]">ACCOUNT MANAGER:</span> Assigned on
                      queue
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3 justify-center">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Request
                    </button>

                    <a
                      href={`https://wa.me/971544323473?text=${encodeURIComponent(
                        `Hi Cruise Console, I just submitted an inquiry for ${formData.asset} (${formData.origin} to ${formData.destination}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="c-name">Full Name</label>

                      <input
                        type="text"
                        id="c-name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="c-email">Email</label>

                      <input
                        type="email"
                        id="c-email"
                        required
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="c-phone">Phone Number</label>

                      <input
                        type="tel"
                        id="c-phone"
                        placeholder="+971 5x xxx xxxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="c-asset">Asset Type</label>

                      <select
                        id="c-asset"
                        value={formData.asset}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            asset: e.target.value,
                          })
                        }
                      >
                        <option>Supercar / Classic Car</option>
                        <option>Superbike / Motorcycle</option>
                        <option>Yacht / Marine Craft</option>
                        <option>Heavy Machinery (JCB / Excavator)</option>
                        <option>Motorsport Equipment</option>
                        <option>Other Specialized Machine</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="c-origin">Origin</label>

                      <input
                        type="text"
                        id="c-origin"
                        placeholder="City, Country"
                        value={formData.origin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            origin: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="c-destination">Destination</label>

                      <input
                        type="text"
                        id="c-destination"
                        placeholder="City, Country"
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            destination: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="c-message">Shipment Details &amp; Notes</label>

                    <textarea
                      id="c-message"
                      rows={4}
                      placeholder="Vehicle make/model, dimensions, current location, target delivery date, or any special handling instructions."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary cursor-pointer"
                  >
                    Inquiries <span className="btn-arrow">→</span>
                  </button>
                </form>
              )}
            </div>

            {/* OFFICE DETAILS */}
            <div>
              <div className="section-head" style={{ marginBottom: '32px' }}>
                <div className="eyebrow">Office Details</div>
                <h2>Central Dispatch</h2>
              </div>

              <div className="contact-info-block">
                <h3>Headquarters</h3>

                <p>
                  Meydan Business Centre
                  <br />
                  6th Floor, Nad Al Sheba
                  <br />
                  Dubai, United Arab Emirates
                </p>
              </div>

              <div className="contact-info-block">
                <h3>Direct Lines</h3>

                <p>
                  Phone:{' '}
                  <a
                    href="tel:+971544323473"
                    style={{ color: 'var(--off)' }}
                  >
                    +971 54 432 3473
                  </a>
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:sales@cruiseconsole.net"
                    style={{ color: 'var(--off)' }}
                  >
                    sales@cruiseconsole.net
                  </a>
                </p>
              </div>

              <div className="contact-info-block">
                <h3>Business Hours</h3>

                <p>
                  Monday – Friday: 08:00 – 19:00 GST
                  <br />
                  Saturday: 09:00 – 15:00 GST
                  <br />
                  Sunday: Closed (Emergency Dispatch 24/7)
                </p>
              </div>

              <div className="contact-info-block">
                <h3>Follow Us</h3>

                <div
                  className="social-row"
                  style={{ marginTop: '8px' }}
                >
                  <a
                    href="https://www.instagram.com/cruiseconsole/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IG
                  </a>

                  <a
                    href="https://www.facebook.com/p/Cruise-Console-Logistics-61578611801310/"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    FB
                  </a>

                  <a
                    href="https://www.tiktok.com/@cruiseconsoledxb"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Map</div>
            <h2>Find Our Dubai Office</h2>
          </div>

          <div style={{ border: '1px solid var(--line)' }}>
            <iframe
              title="Cruise Console Logistics office location, Meydan Business Centre, Dubai"
              src="https://www.google.com/maps?q=Meydan%20Business%20Centre%20Dubai&output=embed"
              width="100%"
              height="440"
              style={{
                border: 0,
                filter: 'grayscale(1) invert(0.9) contrast(0.85)',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
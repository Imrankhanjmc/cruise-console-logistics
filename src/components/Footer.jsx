export default function Footer({ onNavigate }) {
  const handleNav = (page, e, hash) => {
    e.preventDefault();
    onNavigate(page, hash);
  };

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* <a className="brand" href="/" onClick={(e) => handleNav('home', e)}>
              <img
                src="/img/logo-mark.png"
                alt="Cruise Console Logistics"
                className="brand-logo"
              />
            </a> */}
            <h4>Our Networks</h4>

              <a>GCC</a>
              <a>EUROPE</a>
              <a>JAPAN</a>
              <a>KOREA</a>
              <a>USA / CANADA</a>
              <a>INDIA</a>
        


          </div>

          <div>
            <h4>Navigate</h4>

            <a href="/" onClick={(e) => handleNav('home', e)}> Home </a>
            <a href="/services" onClick={(e) => handleNav('services', e)}>Services</a>
            <a href="/global-network" onClick={(e) => handleNav('global-network', e)}>Global Network</a>
            <a href="/about" onClick={(e) => handleNav('about', e)}> About </a>
            <a href="/contact" onClick={(e) => handleNav('contact', e)}> Contact </a>
          </div>

          <div>
            <h4>Services</h4>

            <a href="/services#air" onClick={(e) => handleNav('services', e, 'air')}> Air Freight </a>
            <a href="/services#ocean" onClick={(e) => handleNav('services', e, 'ocean')}> Ocean Freight </a>
            <a href="/services#road" onClick={(e) => handleNav('services', e, 'road')}> Road Transport </a>
            <a href="/services#motorsport" onClick={(e) => handleNav('services', e, 'motorsport')}> Motorsport Logistics</a>
          </div>

          <div>
            <h4>Contact</h4>

            <p>Meydan Business Centre<br /> 6th Floor, Dubai, UAE</p>

            <p style={{ marginTop: '12px' }}>
              <a
                href="tel:+971544323473"
                style={{ display: 'inline', color: 'var(--off)' }}
              >
                +971 544323473
              </a>
            </p>

            <p>
              <a
                href="mailto:sales@cruiseconsole.net"
                style={{ display: 'inline', color: 'var(--off)' }}
              >
                sales@cruiseconsole.net
              </a>
            </p>

            <div className="social-row" style={{ marginTop: '18px' }}>
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

        <div className="foot-bottom">
          <span>© 2026 Cruise Console Logistics. All rights reserved.</span>
          <span>Dubai, UAE — Licensed Freight Forwarder</span>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';

const getInitialFormData = (prefilledRoute) => {
  const cargo = prefilledRoute?.cargo ?? '';

  let asset = 'Supercar / Classic Car';

  if (cargo.includes('Supercar')) {
    asset = 'Supercar / Classic Car';
  } else if (cargo.includes('Motorsport')) {
    asset = 'Motorsport Equipment';
  } else if (cargo.includes('Machinery')) {
    asset = 'Heavy Machinery (JCB / Excavator)';
  }

  return {
    name: '',
    email: '',
    phone: '',
    asset,
    origin: prefilledRoute?.from ?? '',
    destination: prefilledRoute?.to ?? '',
    message: prefilledRoute
      ? `Inquiry regarding Route #${String(
          prefilledRoute.id ?? ''
        ).padStart(3, '0')} (${prefilledRoute.from ?? ''} → ${
          prefilledRoute.to ?? ''
        }, ${prefilledRoute.vehicle ?? ''}).`
      : '',
  };
};

export default function QuoteModal({
  isOpen,
  onClose,
  prefilledRoute,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(prefilledRoute)
  );

  const [submitted, setSubmitted] = useState(false);

  // Refresh form values whenever the modal opens or its route changes.
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData(prefilledRoute));
      setSubmitted(false);
    }
  }, [isOpen, prefilledRoute]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData(getInitialFormData(null));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-(--carbon) border border-(--line-2) p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-(--steel) hover:text-white text-2xl font-mono p-2 transition-colors"
          aria-label="Close quote modal"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-(--redline)/10 border border-(--redline) flex items-center justify-center text-(--redline) text-2xl">
              ✓
            </div>

            <div className="eyebrow justify-center">
              Manifest Registered
            </div>

            <h2
              id="quote-modal-title"
              className="text-2xl text-(--off) uppercase font-display"
            >
              Request Successfully Initialised
            </h2>

            <p className="text-(--steel) max-w-md mx-auto text-sm">
              Thank you, {formData.name || 'Valued Client'}. Your logistics
              request has been recorded in this form. Please contact our
              dispatch team to arrange your quote.
            </p>

            <div className="p-4 bg-(--asphalt) border border-(--line) text-left max-w-md mx-auto font-mono text-xs space-y-1 text-(--steel)">
              <div>
                <span className="text-(--redline)">ASSET:</span>{' '}
                {formData.asset}
              </div>

              <div>
                <span className="text-(--redline)">LANE:</span>{' '}
                {formData.origin || 'Specified Origin'} →{' '}
                {formData.destination || 'Specified Destination'}
              </div>

              <div>
                <span className="text-(--redline)">STATUS:</span> Ready for
                Follow-up
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetAndClose}
              >
                Close Window
              </button>

              <a
                href={`https://wa.me/971544323473?text=${encodeURIComponent(
                  `Hello Cruise Console, I would like a shipping quote for ${formData.asset} from ${formData.origin} to ${formData.destination}. Name: ${formData.name}. Email: ${formData.email}. Phone: ${formData.phone}. Details: ${formData.message}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                WhatsApp Central Dispatch
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="eyebrow">Direct Dispatch</div>

            <h2
              id="quote-modal-title"
              className="text-2xl sm:text-3xl font-display uppercase text-(--off) mb-2"
            >
              Shipping Inquiries
            </h2>

            <p className="text-sm text-(--steel) mb-6">
              Precision global transit for high-value machinery. Submit your
              requirements for a dedicated operational assessment.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="modal-name">Full Name</label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="modal-email">Email</label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="modal-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    placeholder="+971 5x xxx xxxx"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="modal-asset">Asset Type</label>
                  <select
                    id="modal-asset"
                    name="asset"
                    value={formData.asset}
                    onChange={handleChange}
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
                  <label htmlFor="modal-origin">Origin</label>
                  <input
                    type="text"
                    id="modal-origin"
                    name="origin"
                    placeholder="City, Country"
                    value={formData.origin}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="modal-destination">Destination</label>
                  <input
                    type="text"
                    id="modal-destination"
                    name="destination"
                    placeholder="City, Country"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="modal-message">
                  Shipment Details &amp; Notes
                </label>

                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  placeholder="Asset dimensions, value, timeline, customs requirements or handling preferences."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full justify-center text-center cursor-pointer"
              >
                Submit Inquiry to Dispatch{' '}
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
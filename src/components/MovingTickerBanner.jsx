export default function MovingTickerBanner() {
  const items = [
    "Weekly RoRo: Dubai -> Southampton",
    "Air Charter: Priority Slots Available to NY",
    "JDM Imports: Tokyo -> Dubai",
    "KSA Route: Daily Transport to Riyadh",
    "Secure Storage: 90% Capacity",
    "Container Service: New York -> Jebel Ali",
    "Weekly RoRo: Dubai -> Southampton",
    "Air Charter: Priority Slots Available to NY",
    "JDM Imports: Tokyo -> Dubai",
    "KSA Route: Daily Transport to Riyadh",
    "Secure Storage: 90% Capacity",
    "Container Service: New York -> Jebel Ali",
  ];

  return (
    <div className="relative overflow-hidden bg-linear-to-r from-[#0c0d10] via-[#131418] to-[#0c0d10] border-y-2 border-red-600/40 py-5 sm:py-6 shadow-[0_8px_30px_rgba(226,19,29,0.18)] select-none z-10">
      <div className="animate-moving-ticker">
        {/* Track 1 */}
        <div className="flex items-center whitespace-nowrap font-mono text-base sm:text-lg md:text-xl font-bold tracking-[0.14em] uppercase text-white">
          {items.map((item, idx) => (
            <span key={`t1-${idx}`} className="inline-flex items-center">
              <span className="text-white drop-shadow-sm">{item}</span>
              <span className="text-(--redline) font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-6 drop-shadow-[0_0_10px_rgba(226,19,29,0.6)]">
                ///
              </span>
            </span>
          ))}
        </div>
        {/* Track 2 for seamless loop */}
        <div className="flex items-center whitespace-nowrap font-mono text-base sm:text-lg md:text-xl font-bold tracking-[0.14em] uppercase text-white" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`t2-${idx}`} className="inline-flex items-center">
              <span className="text-white drop-shadow-sm">{item}</span>
              <span className="text-(--redline) font-black text-lg sm:text-xl md:text-2xl px-4 sm:px-6 drop-shadow-[0_0_10px_rgba(226,19,29,0.6)]">
                ///
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


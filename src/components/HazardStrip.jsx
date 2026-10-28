export default function HazardStrip({ thin = false }) {
  return (
    <div
      className={`hazard-strip ${thin ? 'thin' : ''}`}
      aria-hidden="true"
    />
  );
}

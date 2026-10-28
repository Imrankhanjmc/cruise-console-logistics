# Cruise Console Logistics

Responsive React website for Cruise Console Logistics, built with Vite, React Router, Tailwind CSS v4, and Three.js for the interactive global network globe.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (the development server is configured for port 3000).

## Production build

```bash
npm run build
npm run preview
```

## Main routes

- `/` — Home
- `/services` — Service listing
- `/services/air` — Air Freight
- `/services/ocean` — Ocean Freight
- `/services/road` — Enclosed Road
- `/services/motorsport` — Motorsport Logistics
- `/services/customs` — Customs
- `/services/storage` — Storage
- `/services/insurance` — Insurance
- `/services/doortodoor` — Door-to-Door
- `/global-network` — Interactive global network
- `/about` — About
- `/contact` — Contact

Service detail pages read their service ID from the URL, so direct links and refreshes select the same service.


### Local image assets

The About and Insurance pages use local SVG artwork in `public/img/` so these visuals render without depending on third-party image hosts.

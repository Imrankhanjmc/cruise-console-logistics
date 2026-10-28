export const DETAILED_SERVICES = {
  air: {
    id: 'air',
    index: '01',
    disciplineNumber: 'Discipline 01',
    cardTitle: 'AIR FREIGHT',
    title: 'Air Freight',
    subtitle:
      'Time-critical aviation logistics for supercars, heavy machinery, and high-value shipment.',
    shortDescription:
      'Charter and commercial air freight for urgent, high-value, time-critical shipment.',
    overview:
      'When delivery schedules cannot afford weeks at sea, precision air freight solutions are deployed for delicate, low-clearance vehicles and heavy industrial components. Assets travel in climate-regulated, pressure-balanced cargo holds with full tarmac-level supervision from loading to wheel-down.',
    heroImage:
      'https://images.pexels.com/photos/32856535/pexels-photo-32856535.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Cargo freighter on tarmac preparing for priority asset loading',

    keyMetrics: [
      { label: 'Global Transit Speed', value: '8 to 48 Hours' },
      { label: 'Max Single Payload', value: 'Up to 35,000 KG' },
      { label: 'Tarmac Escort', value: '100% Supervised' },
      { label: 'IATA DGR,INDG CODE,ADR', value: 'DG Handling' },
    ],

    components: [
      {
        code: '01.01',
        title: 'Dedicated Air Charters',
        description:
          'Exclusive hire of wide-body cargo aircraft for multi-vehicle collections, confidential manufacturer prototypes, and tight rally deadlines.',
      },
      {
        code: '01.02',
        title: 'Main-Deck & Belly-Hold Priority',
        description:
          'Locked space allocations across premier scheduled airlines, ensuring zero offloading risk during high-demand seasons.',
      },
      {
        code: '01.03',
        title: 'Airside Loadmaster Supervision',
        description:
          'Senior logistics directors hold tarmac airside clearance, directly monitoring ramp drive-on, tie-down tensioning, and net latching.',
      },
      // {
      //   code: '01.04',
      //   title: 'Custom Aerocrate Construction',
      //   description:
      //     'ISPM-15 certified timber cradles engineered with shock-absorbent mounting plates for zero-stress flight positioning.',
      // },
    ],

    corridors: [
      {
        route: 'Dubai (DWC/DXB) ⇄ London (LHR/STN)',
        mode: 'Direct Freighter',
        time: '7 Hours',
      },
      {
        route: 'Dubai (DWC) ⇄ New York (JFK)',
        mode: 'Priority Belly-Hold',
        time: '14 Hours',
      },
      {
        route: 'Tokyo (HND/NRT) ⇄ Dubai (DWC)',
        mode: 'Express Charter',
        time: '10 Hours',
      },
      {
        route: 'Frankfurt (FRA) ⇄ Riyadh (RUH)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
      {
        route: 'Amsterdam (NLD) ⇄ Dubai (DWC)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
      {
        route: 'Toronto (CAN) ⇄ Dubai (DWC)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
      {
        route: 'Frankfurt (DEU) ⇄ Dubai (DWC)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
      {
        route: 'Madrid (ESP) ⇄ Dubai (DWC)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
      {
        route: 'Paris (FRA) ⇄ Dubai (DWC)',
        mode: 'Scheduled Cargo',
        time: '6 Hours',
      },
    ],

    complianceStandards: [
      'Fuel drain certified to under 1/4 tank (IATA DGR compliant).',
      'Battery terminal disconnect with insulated safety shrouds.',
      'Pre-flight 360-degree digital high-resolution condition scan.',
      'Soft-strap wheel-webbing lashings rated to 5G flight acceleration.',
    ],
  },

  ocean: {
    id: 'ocean',
    index: '02',
    disciplineNumber: 'Discipline 02',
    cardTitle: 'OCEAN FREIGHT',
    title: 'Ocean Freight',
    subtitle:
      'Global maritime carrier solutions for high-volume fleets, luxury marine craft, heavy industrial machinery, FFCG and General cargo.',
    shortDescription:
      'RoRo, FCL and LCL container shipping across every major global port.',
    overview:
      'Scheduled maritime shipping across major commercial trade lanes. Moving rare hypercars in sealed containers or mobilizing fleets via Pure Car and Truck Carrier (PCTC) vessels, guaranteeing structural security, protective crating, and seamless port discharge.',
    heroImage:
      'https://images.pexels.com/photos/11820859/pexels-photo-11820859.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Container cargo vessel navigating oceanic shipping lane',

    keyMetrics: [
      { label: 'Container Types', value: '20ft / 40ft HC' },
      { label: 'Pure Car and Truck Carrier', value: 'Flat Rack, RORO' },
      { label: 'Large,Heavy Containers and Oversized Cargo', value: 'Break Bulk' },
      { label: 'Global Coverage', value: '140+ Ports Worldwide' },
    ],

    components: [
      {
        code: '02.01',
        title: 'Enclosed FCL Single & Multi-Car Containers',
        description:
          'Clean, dry containers anchored with wooden floor blocks, soft-lashing ratchets, and serialized tamper-evident bolt locks.',
      },
      {
        code: '02.02',
        title: 'Roll-on / Roll-off (RoRo) Carriage',
        description:
          'Vehicles driven directly into purpose-built multi-tier vessels, avoiding crane lifts while remaining fully covered.',
      },
      {
        code: '02.03',
        title: 'Marine Craft & Yacht Shipping',
        description:
          'Bespoke naval cradle manufacturing, keel chocking, and shrink-wrapping for speedboats, tenders, and motor yachts.',
      },
      {
        code: '02.04',
        title: 'Port Stevedoring & Terminal Oversight',
        description:
          'Port officers supervise container lifting, ramp staging, and customs inspection yards to eliminate ground scrapes.',
      },
    ],

    corridors: [
      {
        route: 'Southampton (UK) ⇄ Jebel Ali (UAE)',
        mode: 'Weekly RoRo',
        time: '18–22 Days',
      },
      {
        route: 'New York (USA) ⇄ Jebel Ali (UAE)',
        mode: 'Bi-Weekly FCL',
        time: '24–28 Days',
      },
      {
        route: 'Yokohama (Japan) ⇄ Dubai (UAE)',
        mode: 'Direct RoRo',
        time: '20–25 Days',
      },
      {
        route: 'Rotterdam (NL) ⇄ Jeddah (KSA)',
        mode: 'Scheduled PCTC',
        time: '16–20 Days',
      },
    ],

    complianceStandards: [
      'Deep tyre blocking fastened with marine-grade steel anchor rings.',
      'Vapour-phase corrosion inhibitor (VCI) bags and moisture-absorbent blankets.',
      'Tamper-evident serialized container seal verified against customs manifest.',
      'Pre-departure and post-discharge mechanical inspection with fluid containment.',
    ],
  },

  road: {
    id: 'road',
    index: '03',
    disciplineNumber: 'Discipline 03',
    cardTitle: 'ROAD TRANSPORTS',
    title: 'Enclosed Road',
    subtitle:
      'Pneumatic air-ride suspension transporters engineered for zero ground clearance and total weather protection.',
    shortDescription:
      'Dedicated enclosed road haulage across UAE, GCC corridors, and Europe.',
    overview:
      'Standard car transporters expose vehicles to gravel chips, highway grime, and steep ramps. A proprietary fleet of hard-sided enclosed transporters features horizontal hydraulic tail-lifts and air-ride suspension to isolate road shocks.',
    heroImage:
      'https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Enclosed multi-car transporter navigating expressway at dusk',

    keyMetrics: [
      { label: 'Approach Angle', value: '< 4.0 Degrees' },
      { label: 'Suspension', value: 'Full Air-Ride Pneumatic' },
      { label: 'Trailer Type', value: 'Hard-Sided Enclosed Box' },
      { label: 'Transit Scope', value: 'GCC Express & Domestic' },
    ],

    components: [
      {
        code: '03.01',
        title: 'Extreme Low-Clearance Vehicle Haulage',
        description:
          'Engineered for hypercars, historic Formula cars, and race GTs with minimal ride height.',
      },
      {
        code: '03.02',
        title: 'Daily UAE to Saudi Arabia (KSA) Transit',
        description:
          'Overnight enclosed transport connecting Dubai and Abu Dhabi directly to Riyadh, Jeddah, and Al Khobar with pre-cleared border documentation.',
      },
      {
        code: '03.03',
        title: 'Confidential Prototype & Embargo Moves',
        description:
          'Blacked-out, unbranded enclosed trailers with privacy blinds for unrevealed manufacturer models.',
      },
      {
        code: '03.04',
        title: 'Multi-Car Dedicated Transporters',
        description:
          '2-car, 4-car, and 6-car transporters with independent hydraulic floor decks for luxury rally expeditions.',
      },
    ],

    corridors: [
      {
        route: 'Dubai (UAE) ⇄ Riyadh (KSA)',
        mode: 'Express Enclosed',
        time: '18 Hours',
      },
      {
        route: 'Abu Dhabi (UAE) ⇄ Doha (Qatar)',
        mode: 'Overland Haulage',
        time: '24 Hours',
      },
      {
        route: 'Dubai (UAE) ⇄ Muscat (Oman)',
        mode: 'Direct Transport',
        time: '12 Hours',
      },
      {
        route: 'London (UK) ⇄ Monaco / Milan',
        mode: 'European Express',
        time: '48 Hours',
      },
    ],

    complianceStandards: [
      'Wheel chocks fitted with non-marking rubberized grips.',
      'Soft tyre-over straps with protective lamb wool sleeves.',
      'Drivers wear specialized non-metallic overalls and gloves.',
      'Continuous interior trailer temperature monitoring and live CCTV telemetry.',
    ],
  },

  motorsport: {
    id: 'motorsport',
    index: '04',
    disciplineNumber: 'Discipline 04',
    cardTitle: 'MOTORSPORT LOGISTICS',
    title: 'Motorsport Logistics',
    subtitle:
      'Zero-failure, calendar-critical logistics for racing teams, chassis, engines, tyres, and telemetry gear.',
    shortDescription:
      'Circuit freight, paddock setups, Carnet handling, and express parts routing.',
    overview:
      'Missing a shipping deadline means missing qualifying. Racing operations across Formula 1, FIA WEC, GT World Challenge, and Gulf 12 Hours are supported with specialized calendar management, dedicated trackside coordinators, and rapid AOG solutions.',
    heroImage:
      'https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Race cars lined up inside pit paddock during track preparations',

    keyMetrics: [
      { label: 'Schedule Adherence', value: '100% On-Time Record' },
      { label: 'Circuit Experience', value: '45+ Global Tracks' },
      { label: 'Emergency Air Dispatch', value: 'Under 4 Hours' },
      { label: 'Dangerous Goods', value: 'FIA Certified' },
    ],

    components: [
      {
        code: '04.01',
        title: 'Championship Season Logistics Management',
        description:
          'Complete season-long freight sequencing synchronized with track opening and paddock teardown timelines.',
      },
      {
        code: '04.02',
        title: 'Emergency Paddock Air Express',
        description:
          'Round-the-clock priority dispatch for crash damage components, flying spare parts directly to the nearest circuit overnight.',
      },
      {
        code: '04.03',
        title: 'Hazardous Materials & Telemetry Batteries',
        description:
          'Certified transport of high-voltage hybrid race batteries, dry-ice cooling packs, and racing fuels.',
      },
      {
        code: '04.04',
        title: 'Pit Perch & Garage Equipment Transport',
        description:
          'Custom flight cases and shock-mounted transport pods for telemetry computers, radios, and air-jacks.',
      },
    ],

    corridors: [
      {
        route: 'Yas Marina Circuit ⇄ Bahrain International',
        mode: 'Enclosed Convoy',
        time: '36 Hours',
      },
      {
        route: 'Silverstone (UK) ⇄ Spa-Francorchamps (BE)',
        mode: 'Cross-Channel Road',
        time: '20 Hours',
      },
      {
        route: 'Dubai Autodrome ⇄ Jeddah Corniche Circuit',
        mode: 'Express GCC Road',
        time: '48 Hours',
      },
      {
        route: 'Monza (Italy) ⇄ Circuit de Monaco',
        mode: 'European Transport',
        time: '14 Hours',
      },
    ],

    complianceStandards: [
      'Pre-scheduled customs Carnet sign-off prior to paddock gate access.',
      'Anti-vibration floor locking for composite chassis and monocoque tubs.',
      'Dual-driver express rotation to eliminate transit standstill time.',
      'Direct radio communication link with race team operational directors.',
    ],
  },

  customs: {
    id: 'customs',
    index: '05',
    disciplineNumber: 'Discipline 5',
    cardTitle: 'CUSTOMS',
    title: 'Customs',
    subtitle:
      'In-house customs brokerage eliminating paperwork delays, tariff miscalculations, and border impoundments.',
    shortDescription:
      'In-house customs, GCC transit bonds, and tariff optimization.',
    overview:
      'International vehicle movement involves strict border regulations and complex temporary importation paperwork. Licensed in-house customs brokers audit paperwork, verify chassis VIN plates, and execute duty-free Carnet admissions seamlessly.',
    heroImage:
      'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Customs inspection terminal with cargo clearance documentation',

    keyMetrics: [
      { label: 'Clearance Speed', value: 'Under 24 Hours' },
      { label: 'In-House Brokers', value: 'Licensed UAE / GCC / UK' },
      { label: 'Carnet Support', value: 'CPD & ATA Carnets' },
      { label: 'Compliance Rate', value: '99.9% First-Pass' },
    ],

    components: [
      {
        code: '05.01',
        title: 'Temporary Import Carnet Management',
        description:
          'Facilitating zero-duty temporary border crossings for international car rallies and hot-weather testing.',
      },
      {
        code: '05.02',
        title: 'Permanent Importation & Title Transfer',
        description:
          'Comprehensive import clearance including duty payment, VAT declaration, and conformity certification.',
      },
      {
        code: '05.03',
        title: 'Bonded Transit Escort',
        description:
          'Securing customs-bonded movements between seaports, airports, and free trade zones without triggering local duty liabilities.',
      },
      {
        code: '05.04',
        title: 'Export Documentation & Carnet Closure',
        description:
          'Ensuring temporary export stamps and bank deposit returns are processed accurately upon voyage completion.',
      },
    ],

    corridors: [
      {
        route: 'UAE Ports (Jebel Ali / DWC) Inbound Clearance',
        mode: 'Air/Sea Customs',
        time: '12–24 Hours',
      },
      {
        route: 'KSA Batha / King Fahd Causeway Land Border',
        mode: 'Cross-Border GCC',
        time: '6–12 Hours',
      },
      {
        route: 'UK HMRC Inbound Vehicle Clearance',
        mode: 'Commercial & Classic',
        time: '24 Hours',
      },
      {
        route: 'Rotterdam / Antwerp Port Entry Protocols',
        mode: 'EU Import Direct',
        time: '24–36 Hours',
      },
    ],

    complianceStandards: [
      'Pre-shipment document audit (Title, Bill of Sale, Bill of Lading, Export Certificate).',
      'VIN plate and engine number cross-verification with official customs records.',
      'Escrow bank guarantee management for Carnet duty deposits.',
      'Full electronic record archiving accessible for financial audits.',
    ],
  },

  storage: {
    id: 'storage',
    index: '06',
    disciplineNumber: 'Discipline 06',
    cardTitle: 'STORAGE',
    title: 'Storage',
    subtitle:
      'Museum-grade preservation vaults with round-the-clock surveillance, humidity control, and battery maintenance.',
    shortDescription:
      'Climate-controlled, de-humidified bonded storage in Dubai, UK, and European hubs.',
    overview:
      'Purpose-built climate-controlled facilities in key global hubs prevent corrosion, battery degradation, and leather deterioration while vehicles wait for departure or rest between racing seasons.',
    heroImage:
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'High-security climate-controlled preservation facility for performance vehicles',

    keyMetrics: [
      { label: 'Temperature Target', value: '21°C ± 1.5°C' },
      { label: 'Relative Humidity', value: '45% – 50%' },
      { label: 'Security Level', value: 'Biometric Multi-Tier' },
      { label: 'Inspection Cadence', value: 'Weekly Logged Checks' },
    ],

    components: [
      {
        code: '06.01',
        title: 'Preservation & Maintenance Regimens',
        description:
          'Scheduled tyre pressure top-ups, gentle vehicle rollings to prevent flat-spots, fluid condition checks, and warmup runs.',
      },
      {
        code: '06.02',
        title: 'Bonded Vehicle Warehousing',
        description:
          'Customs-approved bonded storage allowing imported assets to stay vault-safe without upfront import taxes.',
      },
      {
        code: '06.03',
        title: 'Confidential Collector Bays',
        description:
          'Partitioned private storage spaces with private access codes for high-profile collectors.',
      },
      {
        code: '06.04',
        title: 'Pre-Delivery Detailing & Rollout',
        description:
          'Full white-glove hand wash, interior vacuuming, and battery check before loading onto enclosed transport.',
      },
    ],

    corridors: [
      {
        route: 'Dubai South Logistics District Vault (DWC)',
        mode: 'Airside Proximity',
        time: 'Immediate Access',
      },
      {
        route: 'London Heathrow Storage Facility (UK)',
        mode: 'Transit Staging',
        time: '24/7 Monitored',
      },
      {
        route: 'Riyadh Storage Annex (KSA)',
        mode: 'GCC Hub',
        time: 'Climate Controlled',
      },
    ],

    complianceStandards: [
      'Microprocessor battery conditioning units connected to each vehicle.',
      'Tire pressure maintenance at 3.0 BAR during prolonged storage.',
      'Clean room handling gloves used by technicians at all times.',
      'Logged inspection reports and fluid containment trays beneath all stored assets.',
    ],
  },

  insurance: {
    id: 'insurance',
    index: '07',
    disciplineNumber: 'Discipline 07',
    cardTitle: 'INSURANCE',
    title: 'Insurance',
    subtitle:
      "All-Risk, full replacement value coverage backed by Lloyd's syndicates and digital condition documentation.",
    shortDescription:
      'All-Risk covered insurance for air,sea and road transport and carnet insurance.',
    overview:
      'Standard carrier liability offers minimal per-kilogram coverage. Specialized All-Risk Marine and Transit Cargo Insurance matches declared asset replacement values, supported by verifiable 360-degree digital intake inspections.',
    heroImage:
      '/img/insurance-coverage.svg',
    alt: 'Comprehensive cargo inspection and condition verification documentation',

    keyMetrics: [
      { label: 'Policy Type', value: 'Institute Cargo Clauses (A)' },
      { label: 'Underwriter Tier', value: "Lloyd's of London Syndicates" },
      { label: 'Max Asset Value', value: 'Custom Cover up to $50M+' },
      { label: 'Claim Resolution', value: 'Fast-Track Restoration' },
    ],

    components: [
      {
        code: '07.01',
        title: 'Agreed-Value Capital Protection',
        description:
          'Settlements based on verified appraisal values rather than depreciated book prices.',
      },
      {
        code: '07.02',
        title: 'Full Multi-Modal Continuity',
        description:
          'Single comprehensive policy covering garage collection, crane port handling, transit, and final delivery.',
      },
      {
        code: '07.03',
        title: 'General Average & Salvage Protection',
        description:
          'Financial indemnification protecting against maritime General Average contribution demands.',
      },
      {
        code: '07.04',
        title: 'Approved Manufacturer Restoration',
        description:
          'Claims allow repairs and bodywork restoration to be conducted exclusively by authorized factory marques.',
      },
    ],

    corridors: [
      {
        route: 'Global Sea Freight Lanes',
        mode: 'Maritime All-Risk',
        time: 'Full Voyage Cover',
      },
      {
        route: 'International Air Freight Routes',
        mode: 'Aviation All-Risk',
        time: 'Tarmac to Tarmac',
      },
      {
        route: 'GCC & European Road Networks',
        mode: 'Inland Transit',
        time: 'Collection to Handover',
      },
    ],

    complianceStandards: [
      'Time-stamped 4K photographic inspection conducted before pickup.',
      'Paint-depth gauge readings documented for historic collector vehicles.',
      'Immediate electronic claim filing with direct underwriter adjuster channels.',
      'Digital condition sign-off matching delivery handover to pickup report.',
    ],
  },

  doortodoor: {
    id: 'doortodoor',
    index: '08',
    disciplineNumber: 'Discipline 08',
    cardTitle: 'CARNET SERVICES',
    title: 'Door-to-Door',
    subtitle:
      'A single point of contact executing every mode, customs checkpoint, and delivery handoff across the globe.',
    shortDescription:
      'White-glove collection, multi-modal haulage, and keys-in-hand private delivery.',
    overview:
      'Eliminating multi-vendor communication gaps with complete white-glove accountability. A dedicated senior operations director manages every leg of the asset’s journey from first pickup to final key handover.',
    heroImage:
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Supercar parked in private estate courtyard following white-glove delivery',

    keyMetrics: [
      { label: 'Accountability', value: 'Single Senior Director' },
      { label: 'Milestone Telemetry', value: 'Live GPS & WhatsApp Updates' },
      { label: 'Handover Quality', value: 'White-Glove Valeted' },
      { label: 'Service Scope', value: 'True Door-to-Door Worldwide' },
    ],

    components: [
      {
        code: '08.01',
        title: 'Private Estate & Yacht Berth Deliveries',
        description:
          'Specialized residential access planning, navigating narrow historic European streets or private island quays.',
      },
      {
        code: '08.02',
        title: 'Turnkey Paperwork & Import Registration',
        description:
          'Customs duties, title transfer, roadworthiness inspections, and local license plate registration handled behind the scenes.',
      },
      {
        code: '08.03',
        title: 'White-Glove Presentation & Detailing',
        description:
          'Vehicles arrive immaculate, freshly hand-valeted, tyre pressures verified, and presented with original documentation in a custom binder.',
      },
      {
        code: '08.04',
        title: '24/7 Executive Priority Concierge',
        description:
          'Direct phone and WhatsApp line with your operations lead for itinerary adjustments and updates.',
      },
    ],

    corridors: [
      {
        route: 'London Mayfair ⇄ Downtown Dubai / Palm Jumeirah',
        mode: 'Air + Enclosed',
        time: 'Turnkey 48 Hours',
      },
      {
        route: 'Monaco Port ⇄ Dubai Marina Yacht Berth',
        mode: 'Sea + Cradle',
        time: 'Turnkey 21 Days',
      },
      {
        route: 'Los Angeles Beverly Hills ⇄ Riyadh Diplomatic Quarter',
        mode: 'Air Charter + Road',
        time: 'Turnkey 4 Days',
      },
      {
        route: 'Tokyo Ginza ⇄ Dubai DIFC',
        mode: 'Priority Air Express',
        time: 'Turnkey 3 Days',
      },
    ],

    complianceStandards: [
      'Pre-departure site survey ensuring transporter access clearance at both residences.',
      'Protective film application on high-wear interior touchpoints.',
      'Dual-party signed digital handover document at both collection and delivery.',
      'Battery trickle charging and fluid levels checked immediately prior to handover.',
    ],
  },
};
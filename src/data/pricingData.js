export const PRICING = {
  chairs: {
    dressedPlastic: 100,
    chiavari: 250,
    luxe: 450,
  },

  tables: {
    dressed: 700,
  },

  // TABLE SETTINGS (per guest)
  tableSettings: {
    napkinsAndRings: 70,
    wineGlasses: 80,
    chargerPlates: 100,
    tableMats: 80,
  },

  // TABLE SETTINGS (per table)
  tableSettingsPerTable: {
    tableRunners: 200,
    candlesAndHolders: 240,
  },

  // BACKDROPS
  backdrops: {
    basicBalloon: 8500,
    doubleBalloonBackdrop: 14000,
    floral: 14000,
    draped: 12000,
    shimmerWall: 15000,
  },

  // WELCOME SIGNS
  welcomeSigns: {
    floral: 6500,
    balloon: 5500,
  },

  // CENTERPIECES (per table)
  centerpieces: {
    basic: 800,
    premium: 1500,
    luxury: 2500,
  },

  // EXTRAS
  extras: {
    cakeStand: 1800,
    dessertTable: 5000,
    redCarpet: 5000, // 10 meters
    cardBox: 1500,
    individualCards: 120, // per card
    lightingPackage: 5000,
  },

  // TRANSPORT (based on location and furniture)
  transport: {
    nairobi: {
      withoutFurniture: 2000,
      withFurniture: 3000,
    },
    outsideNairobi: {
      withoutFurniture: 3000,
      withFurniture: 4000,
    },
    backdropOnly: 1000,
  },

  // LABOUR (based on guest count and setup type)
  labour: {
    lessThan50: 3000,
    fiftyPlus: 5000,
    backdropOnly: 0, // If only backdrop, no tables/chairs
  },
};

// Helper function to calculate transport cost
export const calculateTransport = (location, hasFurniture, isBackdropOnly) => {
  if (isBackdropOnly) {
    return PRICING.transport.backdropOnly;
  }

  if (location === "nairobi") {
    return hasFurniture
      ? PRICING.transport.nairobi.withFurniture
      : PRICING.transport.nairobi.withoutFurniture;
  } else {
    return hasFurniture
      ? PRICING.transport.outsideNairobi.withFurniture
      : PRICING.transport.outsideNairobi.withoutFurniture;
  }
};

// Helper function to calculate labour cost
export const calculateLabour = (guestCount, hasTableSetup, isBackdropOnly) => {
  if (isBackdropOnly) {
    return PRICING.labour.backdropOnly; // Returns 0
  }
  
  return guestCount < 50 ? PRICING.labour.lessThan50 : PRICING.labour.fiftyPlus;
};

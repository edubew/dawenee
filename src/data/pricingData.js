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
    napkinsAndRings: 60,
    wineGlasses: 80,
    chargerPlates: 80,
    tableMats: 40,
  },

  // TABLE SETTINGS (per table)
  tableSettingsPerTable: {
    tableRunners: 200,
    candlesAndHolders: 60,
  },

  // BACKDROPS
  backdrops: {
    basicBalloon: 8000,
    doubleBalloonBackdrop: 14000,
    floral: 13500,
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
    cakeStand: 1300,
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
  },

  // LABOUR (based on guest count and setup type)
  labour: {
    lessThan50: 3000,
    fiftyPlus: 4500,
    backdropOnly: 500, // If only backdrop, no tables/chairs
  },
};

// Helper function to calculate transport cost
export const calculateTransport = (location, hasFurniture) => {
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
export const calculateLabour = (guestCount, hasTableSetup, hasBackdropOnly) => {
  if (hasBackdropOnly && !hasTableSetup) {
    return PRICING.labour.backdropOnly;
  }
  return guestCount < 50 ? PRICING.labour.lessThan50 : PRICING.labour.fiftyPlus;
};
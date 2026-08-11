export const PRICING = {
  chairs: {
    dressedPlastic: 120,
    chiavari: 300,
    luxe: 450,
  },
  tables: {
    dressed: 800,
  },
  tableSettings: {
    napkinsAndRings: 90,
    wineGlasses: 100,
    chargerPlates: 100,
    tableMats: 80,
    placeCards: 150,
  },
  tableSettingsPerTable: {
    tableRunners: 200,
    candles: 150,
  },
  backdrops: {
    singleBalloon: 9000,
    doubleBalloon: 15000,
    floral: 15000,
    floralBalloon: 13000,
    draped: 12000,
    shimmerWall: 15000,
  },
  welcomeSigns: {
    floral: 7000,
    balloon: 6000,
  },
  centerpieces: {
    basic: 800,
    premium: 1500,
    luxury: 2500,
  },
  extras: {
    cakeStand: 2000,
    dessertTable: 5000,
    redCarpet: 6000,
    lightingPackage: 5000,
  },

  tents: {
    bLine: {
      label: "B-Line Tent",
      price: null,
      requiresReview: true,
    },

    canopy: {
      label: "Canopy Tent",
      price: null,
      requiresReview: true,
    },

    custom: {
      label: "Something else",
      price: null,
      requiresReview: true,
    },
  },
  tentTransportSurcharge: 7000,
};

/**
 * Transport cost based on location, whether furniture (chairs/tables)
 * is involved, and whether the order is backdrop-only (lighter job).
 */
export function calculateTransport(
  location,
  hasFurniture,
  isBackdropOnly,
  hasTent = false,
) {
  let transport;

  if (isBackdropOnly) {
    transport = 1000;
  } else if (location === "nairobi") {
    transport = hasFurniture ? 4000 : 2000;
  } else {
    transport = hasFurniture ? 5000 : 3000;
  }

  if (hasTent) {
    transport += PRICING.tentTransportSurcharge;
  }

  return transport;
}

/**
 * Setup/labour cost based on guest count and order type.
 * Backdrop-only orders need no setup labour.
 */
export function calculateLabour(guestCount, hasTableSetup, isBackdropOnly) {
  if (isBackdropOnly) return 0;
  return guestCount < 50 ? 3000 : 5000;
}

/**
 * THE single source of truth for quote pricing.
 * Both QuoteSummary (live sidebar) and StepFive (confirmation email)
 * call this
 *
 * @param {object} formData - the quote wizard's form state
 * @param {number} tablesNeeded - derived from guestCount, passed in
 *   so it's calculated once in Quote.jsx
 * @returns {object} every line item plus subtotal and deposit
 */
export function calculateQuote(formData, tablesNeeded) {
  const extras = formData.extras || {};
  const tableSettings = formData.tableSettings || {};

  // Chairs
  const chairCost = formData.chairType
    ? (PRICING.chairs[formData.chairType] || 0) * (formData.chairQuantity || 0)
    : 0;

  // Tables (included whenever chairs are picked, or any table setting is on)
  const hasTableSettings = Object.values(tableSettings).some(
    (val) => val === true,
  );
  const tableCost =
    formData.chairType || hasTableSettings
      ? tablesNeeded * PRICING.tables.dressed
      : 0;

  // Table settings — "full package" if explicitly flagged or if every
  // individual item happens to be selected
  const hasFullPackage =
    tableSettings.fullPackage ||
    (tableSettings.napkins &&
      tableSettings.wineGlasses &&
      tableSettings.chargerPlates &&
      tableSettings.tableMats &&
      tableSettings.tableRunners &&
      tableSettings.placeCards &&
      tableSettings.candles);

  let tableSettingsCost = 0;
  if (hasFullPackage) {
    tableSettingsCost +=
      formData.guestCount * PRICING.tableSettings.napkinsAndRings;
    tableSettingsCost +=
      formData.guestCount * PRICING.tableSettings.wineGlasses;
    tableSettingsCost +=
      formData.guestCount * PRICING.tableSettings.chargerPlates;
    tableSettingsCost += formData.guestCount * PRICING.tableSettings.placeCards;
    tableSettingsCost += formData.guestCount * PRICING.tableSettings.tableMats;
    tableSettingsCost +=
      tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
    tableSettingsCost += tablesNeeded * PRICING.tableSettingsPerTable.candles;
  } else {
    if (tableSettings.napkins)
      tableSettingsCost +=
        formData.guestCount * PRICING.tableSettings.napkinsAndRings;
    if (tableSettings.wineGlasses)
      tableSettingsCost +=
        formData.guestCount * PRICING.tableSettings.wineGlasses;
    if (tableSettings.chargerPlates)
      tableSettingsCost +=
        formData.guestCount * PRICING.tableSettings.chargerPlates;
    if (tableSettings.tableMats)
      tableSettingsCost +=
        formData.guestCount * PRICING.tableSettings.tableMats;
    if (tableSettings.placeCards)
      tableSettingsCost +=
        formData.guestCount * PRICING.tableSettings.placeCards;
    if (tableSettings.tableRunners)
      tableSettingsCost +=
        tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
    if (tableSettings.candles)
      tableSettingsCost += tablesNeeded * PRICING.tableSettingsPerTable.candles;
  }

  // Backdrops
  const backdropCost = (formData.backdrops || []).reduce(
    (total, backdropId) => total + (PRICING.backdrops[backdropId] || 0),
    0,
  );

  // Welcome sign
  const welcomeSignCost = formData.welcomeSign
    ? PRICING.welcomeSigns[formData.welcomeSign] || 0
    : 0;

  // Centerpieces
  const centerpieceCost = formData.centerpieceTier
    ? (PRICING.centerpieces[formData.centerpieceTier] || 0) * tablesNeeded
    : 0;

  // Extras
  let extrasCost = 0;
  if (extras.cakeStand) extrasCost += PRICING.extras.cakeStand;
  if (extras.dessertTable) extrasCost += PRICING.extras.dessertTable;
  if (extras.redCarpet) extrasCost += PRICING.extras.redCarpet;
  if (extras.lightingPackage) extrasCost += PRICING.extras.lightingPackage;

  // Tents — price is null / requiresReview for every tent type right now,
  // so tentCost contributes 0 to the subtotal (nothing to charge yet), but
  // hasTent/tentRequiresReview still flip true so the UI/email can flag
  // that tent pricing needs manual follow-up. 
  const selectedTent = formData.tentType
    ? PRICING.tents[formData.tentType]
    : null;
  const hasTent = Boolean(selectedTent);
  const tentCost = selectedTent?.price || 0;

  // Determine order "shape" for transport/labour rules
  const hasChairs = Boolean(formData.chairType);
  const hasCenterpieces = Boolean(formData.centerpieceTier);
  const hasExtras = Object.values(extras).some((val) => val === true);
  const hasBackdropsOrSigns =
    (formData.backdrops && formData.backdrops.length > 0) ||
    Boolean(formData.welcomeSign);

  const isBackdropOnly =
    hasBackdropsOrSigns &&
    !hasChairs &&
    !hasCenterpieces &&
    !hasExtras &&
    !hasTent &&
    tableSettingsCost === 0;

  const hasFurniture = hasChairs;
  const transportCost = calculateTransport(
    formData.location,
    hasFurniture,
    isBackdropOnly,
    hasTent,
  );

  const hasTableSetup = hasChairs;
  const labourCost = calculateLabour(
    formData.guestCount,
    hasTableSetup,
    isBackdropOnly,
  );

  const subtotal =
    chairCost +
    tableCost +
    tableSettingsCost +
    backdropCost +
    welcomeSignCost +
    centerpieceCost +
    extrasCost +
    tentCost +
    transportCost +
    labourCost;

  const deposit = Math.round(subtotal * 0.5);
  const balance = subtotal - deposit;

  return {
    chairCost,
    tableCost,
    tableSettingsCost,
    backdropCost,
    welcomeSignCost,
    centerpieceCost,
    tentCost,
    extrasCost,
    transportCost,
    labourCost,
    subtotal,
    deposit,
    balance,
    tablesNeeded,
    isBackdropOnly,
    hasTent,
    tentRequiresReview: hasTent,
  };
}

// label maps shared by QuoteSummary and the
//    confirmation email so naming stays consistent in one place
export const LABELS = {
  chairs: {
    dressedPlastic: "Dressed Plastic",
    chiavari: "Chiavari Seats",
    luxe: "Luxe Seats",
  },
  backdrops: {
    singleBalloon: "Single Balloon Backdrop",
    doubleBalloon: "Double Balloon Backdrop",
    floralBalloon: "Floral + Balloon Backdrop",
    floral: "Floral Backdrop",
    draped: "Draped Fabric Backdrop",
    shimmerWall: "Shimmer Wall Backdrop",
  },
  welcomeSigns: {
    floral: "Floral Welcome Sign",
    balloon: "Balloon Welcome Sign",
  },
  centerpieces: {
    basic: "Basic",
    premium: "Premium",
    luxury: "Luxury",
  },
};

export function formatQuoteDetails(formData, quote) {
  const tableSettings = formData.tableSettings || {};
  const extras = formData.extras || {};

  const chairDetails = formData.chairType
    ? `${formData.chairQuantity}x ${LABELS.chairs[formData.chairType] || formData.chairType} chairs (KES ${quote.chairCost.toLocaleString()})`
    : "None";

  let tableSettingsDetails = "None";
  const hasAnySetting = Object.values(tableSettings).some((v) => v === true);
  if (tableSettings.fullPackage) {
    tableSettingsDetails = "Full Package";
  } else if (hasAnySetting) {
    const selected = [];
    if (tableSettings.napkins) selected.push("Napkins & Rings");
    if (tableSettings.wineGlasses) selected.push("Wine Glasses");
    if (tableSettings.chargerPlates) selected.push("Charger Plates");
    if (tableSettings.tableMats) selected.push("Table Mats");
    if (tableSettings.tableRunners) selected.push("Table Runners");
    if (tableSettings.candles) selected.push("Candles & Holders");
    tableSettingsDetails = selected.join(", ");
  }

  const backdropsDetails =
    formData.backdrops && formData.backdrops.length > 0
      ? formData.backdrops.map((b) => LABELS.backdrops[b] || b).join(", ")
      : "None";

  const welcomeSignDetails = formData.welcomeSign
    ? LABELS.welcomeSigns[formData.welcomeSign] || formData.welcomeSign
    : "None";

  const centerpieceDetails = formData.centerpieceTier
    ? `${LABELS.centerpieces[formData.centerpieceTier] || formData.centerpieceTier} - ${quote.tablesNeeded} tables`
    : "None";

  const tentDetails = formData.tentType
    ? `${PRICING.tents[formData.tentType]?.label || formData.tentType} (price to be confirmed)`
    : "None";

  const extrasSelected = [];
  if (extras.cakeStand) extrasSelected.push("Elegant Cake Stand");
  if (extras.dessertTable) extrasSelected.push("Dessert Table Setup");
  if (extras.redCarpet) extrasSelected.push("Red Carpet Runner");
  if (extras.individualCards)
    extrasSelected.push(`Individual Cards (${extras.cardQuantity || 0})`);
  if (extras.lightingPackage) extrasSelected.push("Uplighting Package");
  const extrasDetails =
    extrasSelected.length > 0 ? extrasSelected.join(", ") : "None";

  return {
    chairDetails,
    tableSettingsDetails,
    backdropsDetails,
    welcomeSignDetails,
    centerpieceDetails,
    tentDetails,
    extrasDetails,
  };
}

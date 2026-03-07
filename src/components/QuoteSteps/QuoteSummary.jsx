import React from "react";
import { PRICING } from "../../data/pricingData";
import { calculateTransport, calculateLabour } from "../../data/pricingData";
import "./QuoteSummary.scss";

function QuoteSummary({ formData, tablesNeeded }) {
  // Chairs
  const chairCost = formData.chairType
    ? (PRICING.chairs[formData.chairType] || 0) * formData.chairQuantity
    : 0;

  // Tables
  const tableCost = formData.chairType
    ? tablesNeeded * PRICING.tables.dressed
    : 0;

  // Table Settings
  const calculateTableSettingsCost = () => {
    let total = 0;
    const guestCount = formData.guestCount;
    const settings = formData.tableSettings;

    // Check if full package
    const hasFullPackage =
      settings.fullPackage ||
      (settings.napkins &&
        settings.wineGlasses &&
        settings.chargerPlates &&
        settings.tableMats &&
        settings.tableRunners &&
        settings.candles);

    if (hasFullPackage) {
      total += guestCount * PRICING.tableSettings.napkinsAndRings;
      total += guestCount * PRICING.tableSettings.wineGlasses;
      total += guestCount * PRICING.tableSettings.chargerPlates;
      total += guestCount * PRICING.tableSettings.tableMats;
      total += tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
      total += tablesNeeded * PRICING.tableSettingsPerTable.candlesAndHolders;
    } else {
      if (settings.napkins)
        total += guestCount * PRICING.tableSettings.napkinsAndRings;
      if (settings.wineGlasses)
        total += guestCount * PRICING.tableSettings.wineGlasses;
      if (settings.chargerPlates)
        total += guestCount * PRICING.tableSettings.chargerPlates;
      if (settings.tableMats)
        total += guestCount * PRICING.tableSettings.tableMats;
      if (settings.tableRunners)
        total += tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
      if (settings.candles)
        total += tablesNeeded * PRICING.tableSettingsPerTable.candlesAndHolders;
    }

    return total;
  };

  // Backdrops
  const backdropCost = (formData.backdrops || []).reduce(
    (total, backdropId) => {
      return total + (PRICING.backdrops[backdropId] || 0);
    },
    0,
  );

  // Welcome Sign
  const welcomeSignCost = formData.welcomeSign
    ? PRICING.welcomeSigns[formData.welcomeSign] || 0
    : 0;

  // Centerpieces
  const centerpieceCost = formData.centerpieceTier
    ? (PRICING.centerpieces[formData.centerpieceTier] || 0) * tablesNeeded
    : 0;

  // Extras
  const calculateExtrasCost = () => {
    let total = 0;
    const extras = formData.extras || {};

    if (extras.cakeStand) total += PRICING.extras.cakeStand;
    if (extras.dessertTable) total += PRICING.extras.dessertTable;
    if (extras.redCarpet) total += PRICING.extras.redCarpet;
    if (extras.cardBox) total += PRICING.extras.cardBox;
    if (extras.lightingPackage) total += PRICING.extras.lightingPackage;
    if (extras.individualCards && extras.cardQuantity) {
      total += PRICING.extras.individualCards * extras.cardQuantity;
    }

    return total;
  };

  //Check if this is a backdrop-only order
  const hasChairs = formData.chairType ? true : false;
  const hasCenterpieces = formData.centerpieceTier ? true : false;
  const hasExtras =
    formData.extras &&
    Object.values(formData.extras).some((val) => val === true);
  const hasBackdropsOrSigns =
    (formData.backdrops && formData.backdrops.length > 0) ||
    formData.welcomeSign;

  const isBackdropOnly =
    hasBackdropsOrSigns && !hasChairs && !hasCenterpieces && !hasExtras;
  // Transport
  // const hasFurniture = formData.chairType ? true : false;
  // const transportCost = calculateTransport(formData.location, hasFurniture);

  const hasFurniture = hasChairs;
  const transportCost = calculateTransport(
    formData.location,
    hasFurniture,
    isBackdropOnly,
  );

  // Labour
  // const hasTableSetup = formData.chairType ? true : false;
  // const hasBackdropOnly =
  //   !hasTableSetup && (formData.backdrops?.length > 0 || formData.welcomeSign);
  // const labourCost = calculateLabour(
  //   formData.guestCount,
  //   hasTableSetup,
  //   hasBackdropOnly,
  // );
  const hasTableSetup = hasChairs;
  const labourCost = calculateLabour(
    formData.guestCount,
    hasTableSetup,
    isBackdropOnly,
  );

  // Subtotal
  const subtotal =
    chairCost +
    tableCost +
    calculateTableSettingsCost() +
    backdropCost +
    welcomeSignCost +
    centerpieceCost +
    calculateExtrasCost() +
    transportCost +
    labourCost;

  // Deposit (50%)
  const deposit = Math.round(subtotal * 0.5);

  return (
    <div className="quote-summary">
      <h3 className="quote-summary__title">Your Quote Summary</h3>

      <div className="quote-summary__items">
        <div className="summary-section">
          <h4 className="summary-section__title">Event Details</h4>
          <div className="summary-item">
            <span className="summary-item__label">Date:</span>
            <span className="summary-item__value">
              {formData.eventDate || "Not selected"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-item__label">Guests:</span>
            <span className="summary-item__value">{formData.guestCount}</span>
          </div>
          <div className="summary-item">
            <span className="summary-item__label">Venue:</span>
            <span className="summary-item__value">
              {formData.venueName || "Not specified"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-item__label">Location:</span>
            <span className="summary-item__value">
              {formData.location === "nairobi"
                ? "Within Nairobi"
                : "Outside Nairobi"}
            </span>
          </div>
        </div>

        {/* Seating and tables */}
        {formData.chairType && (
          <div className="summary-section">
            <h4 className="summary-section__title">Seating & Tables</h4>
            <div className="summary-item">
              <span className="summary-item__label">
                {formData.chairQuantity}×{" "}
                {formData.chairType === "dressedPlastic"
                  ? "Dressed Plastic"
                  : formData.chairType === "chiavari"
                    ? "Chiavari"
                    : "Luxe"}{" "}
                Chairs
              </span>
              <span className="summary-item__value">
                KES {chairCost.toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-item__label">
                {tablesNeeded}× Dressed Tables
              </span>
              <span className="summary-item__value">
                KES {tableCost.toLocaleString()}
              </span>
            </div>
            {calculateTableSettingsCost() > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">Table Settings</span>
                <span className="summary-item__value">
                  KES {calculateTableSettingsCost().toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Backdrop and Signage */}
        {(backdropCost > 0 || welcomeSignCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Backdrops & Signage</h4>
            {(formData.backdrops || []).map((backdropId) => (
              <div key={backdropId} className="summary-item">
                <span className="summary-item__label">
                  {backdropId === "basicBalloon"
                    ? "Balloon Backdrop"
                    : backdropId === "floral"
                      ? "Floral Backdrop"
                      : backdropId === "draped"
                        ? "Draped Backdrop"
                        : "Shimmer Wall"}
                </span>
                <span className="summary-item__value">
                  KES {(PRICING.backdrops[backdropId] || 0).toLocaleString()}
                </span>
              </div>
            ))}
            {formData.welcomeSign && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {formData.welcomeSign === "floral" ? "Floral" : "Balloon"}{" "}
                  Welcome Sign
                </span>
                <span className="summary-item__value">
                  KES {welcomeSignCost.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Centerpieces & Extras */}
        {(centerpieceCost > 0 || calculateExtrasCost() > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Centerpieces & Extras</h4>
            {formData.centerpieceTier && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {tablesNeeded}×{" "}
                  {formData.centerpieceTier.charAt(0).toUpperCase() +
                    formData.centerpieceTier.slice(1)}{" "}
                  Centerpieces
                </span>
                <span className="summary-item__value">
                  KES {centerpieceCost.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.dessertTable && (
              <div className="summary-item">
                <span className="summary-item__label">Dessert Table Setup</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.dessertTable.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.lightingPackage && (
              <div className="summary-item">
                <span className="summary-item__label">Lighting Package</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.lightingPackage.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.redCarpet && (
              <div className="summary-item">
                <span className="summary-item__label">Red Carpet (10m)</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.redCarpet.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.cakeStand && (
              <div className="summary-item">
                <span className="summary-item__label">Cake Stand</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.cakeStand.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.cardBox && (
              <div className="summary-item">
                <span className="summary-item__label">Card Box</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.cardBox.toLocaleString()}
                </span>
              </div>
            )}
            {formData.extras?.individualCards &&
              formData.extras?.cardQuantity && (
                <div className="summary-item">
                  <span className="summary-item__label">
                    {formData.extras.cardQuantity}× Individual Cards
                  </span>
                  <span className="summary-item__value">
                    KES{" "}
                    {(
                      PRICING.extras.individualCards *
                      formData.extras.cardQuantity
                    ).toLocaleString()}
                  </span>
                </div>
              )}
          </div>
        )}

        {/* Transport & Labour */}
        <div className="sumarry-section">
          <h4 className="summary-section__title">Service Fees</h4>
          <div className="summary-item">
            <span className="summary-item__label">
              Transport (
              {formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi"})
            </span>
            <span className="summary-item__value">
              KES {transportCost.toLocaleString()}
            </span>
          </div>

          <div className="summary-item">
            <span className="summary-item__label">Setup & Labour</span>
            <span className="summary-item__value">
              KES {labourCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="quote-summary__totals">
        <div className="summary-total">
          <span className="summary-total__label">Subtotal:</span>
          <span className="summary-total__value">
            KES {subtotal.toLocaleString()}
          </span>
        </div>
        <div className="summary-total summary-total--deposit">
          <span className="summary-total__label">50% Deposit to Book:</span>
          <span className="summary-total__value">
            KES {deposit.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="quote-summary__note">
        <p>
          💳 Pay 50% deposit to secure your date. Balance due after the setup is
          complete.
        </p>
      </div>
    </div>
  );
}

export default QuoteSummary;

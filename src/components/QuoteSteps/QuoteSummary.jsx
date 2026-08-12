import React from "react";
import { PRICING, calculateQuote } from "../../data/pricingData";

function QuoteSummary({ formData, tablesNeeded }) {
  const quote = calculateQuote(formData, tablesNeeded);

  const tableSettings = formData.tableSettings || {};
  const extras = formData.extras || {};

  const hasAnySelection = quote.subtotal > 0 || Boolean(formData.tentType);

  const getChairLabel = (chairType) => {
    const labels = {
      dressedPlastic: "Dressed Plastic",
      chiavari: "Chiavari",
      luxe: "Luxe",
    };

    return labels[chairType] || chairType;
  };

  const getBackdropLabel = (backdropId) => {
    const labels = {
      singleBalloon: "Single Balloon Backdrop",
      doubleBalloon: "Double Balloon Backdrop",
      floral: "Floral Backdrop",
      floralBalloon: "Floral + Balloon Backdrop",
      draped: "Draped Backdrop",
      shimmerWall: "Shimmer Wall",
    };

    return labels[backdropId] || backdropId;
  };

  const getWelcomeSignLabel = (signId) => {
    const labels = {
      floral: "Floral Welcome Sign",
      balloon: "Balloon Welcome Sign",
    };

    return labels[signId] || signId;
  };

  const getTentLabel = (tentType) => {
    return PRICING.tents[tentType]?.label || tentType;
  };

  return (
    <div className="quote-summary">
      <h3 className="quote-summary__title">Your Quote Summary</h3>

      {!hasAnySelection && (
        <p className="quote-summary__empty">
          Your selections will appear here as you go.
        </p>
      )}

      <div className="quote-summary__items">
        {/* ==================== EVENT ==================== */}
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
                ? "Nairobi"
                : formData.location
                  ? "Outside Nairobi"
                  : "Not selected"}
            </span>
          </div>
        </div>

        {/* ==================== SEATING ==================== */}
        {(quote.chairCost > 0 ||
          quote.tableCost > 0 ||
          quote.tableSettingsCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Seating &amp; Tables</h4>

            {formData.chairType && formData.chairQuantity > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {formData.chairQuantity}× {getChairLabel(formData.chairType)}{" "}
                  Chairs
                </span>

                <span className="summary-item__value">
                  KES {quote.chairCost.toLocaleString()}
                </span>
              </div>
            )}

            {quote.tableCost > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {tablesNeeded}× Dressed Tables
                </span>

                <span className="summary-item__value">
                  KES {quote.tableCost.toLocaleString()}
                </span>
              </div>
            )}

            {quote.tableSettingsCost > 0 && (
              <>
                <div className="summary-item summary-item--subsection">
                  <span className="summary-item__label">Table Settings</span>

                  <span className="summary-item__value">
                    KES {quote.tableSettingsCost.toLocaleString()}
                  </span>
                </div>

                {tableSettings.napkins && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">
                      • Napkins + Rings
                    </span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettings.napkinsAndRings *
                        formData.guestCount
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {tableSettings.wineGlasses && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">• Wine Glasses</span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettings.wineGlasses * formData.guestCount
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {tableSettings.chargerPlates && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">
                      • Charger Plates
                    </span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettings.chargerPlates *
                        formData.guestCount
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {tableSettings.tableMats && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">• Table Mats</span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettings.tableMats * formData.guestCount
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {tableSettings.tableRunners && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">• Table Runners</span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettingsPerTable.tableRunners *
                        tablesNeeded
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

                {tableSettings.candles && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">
                      • Candles + Holders
                    </span>

                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettingsPerTable.candles * tablesNeeded
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ==================== BACKDROPS ==================== */}
        {(quote.backdropCost > 0 || quote.welcomeSignCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Backdrops &amp; Signage</h4>

            {(formData.backdrops || []).map((backdropId) => (
              <div key={backdropId} className="summary-item">
                <span className="summary-item__label">
                  {getBackdropLabel(backdropId)}
                </span>

                <span className="summary-item__value">
                  KES {(PRICING.backdrops[backdropId] || 0).toLocaleString()}
                </span>
              </div>
            ))}

            {formData.welcomeSign && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {getWelcomeSignLabel(formData.welcomeSign)}
                </span>

                <span className="summary-item__value">
                  KES {quote.welcomeSignCost.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ==================== CENTERPIECES ==================== */}
        {(quote.centerpieceCost > 0 || quote.extrasCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">
              Centerpieces &amp; Extras
            </h4>

            {formData.centerpieceTier && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {tablesNeeded}×{" "}
                  {formData.centerpieceTier.charAt(0).toUpperCase() +
                    formData.centerpieceTier.slice(1)}{" "}
                  Centerpieces
                </span>

                <span className="summary-item__value">
                  KES {quote.centerpieceCost.toLocaleString()}
                </span>
              </div>
            )}

            {extras.cakeStand && (
              <div className="summary-item">
                <span className="summary-item__label">Cake Stand</span>

                <span className="summary-item__value">
                  KES {PRICING.extras.cakeStand.toLocaleString()}
                </span>
              </div>
            )}

            {extras.dessertTable && (
              <div className="summary-item">
                <span className="summary-item__label">Dessert Table Setup</span>

                <span className="summary-item__value">
                  KES {PRICING.extras.dessertTable.toLocaleString()}
                </span>
              </div>
            )}

            {extras.redCarpet && (
              <div className="summary-item">
                <span className="summary-item__label">Red Carpet</span>

                <span className="summary-item__value">
                  KES {PRICING.extras.redCarpet.toLocaleString()}
                </span>
              </div>
            )}

            {extras.lightingPackage && (
              <div className="summary-item">
                <span className="summary-item__label">Lighting Package</span>

                <span className="summary-item__value">
                  KES {PRICING.extras.lightingPackage.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ==================== TENT ==================== */}
        {formData.tentType && (
          <div className="summary-section">
            <h4 className="summary-section__title">Tent</h4>

            <div className="summary-item">
              <span className="summary-item__label">
                {getTentLabel(formData.tentType)}
              </span>

              <span className="summary-item__value">To be confirmed</span>
            </div>

            <p className="quote-summary__item-note">
              Tent availability and pricing will be confirmed on WhatsApp.
            </p>
          </div>
        )}

        {/* ==================== SERVICE FEES ==================== */}
        <div className="summary-section">
          <h4 className="summary-section__title">Service Fees</h4>

          <div className="summary-item">
            <span className="summary-item__label">Transport</span>

            <span className="summary-item__value">
              KES {quote.transportCost.toLocaleString()}
            </span>
          </div>

          <div className="summary-item">
            <span className="summary-item__label">Setup &amp; Labour</span>

            <span className="summary-item__value">
              KES {quote.labourCost.toLocaleString()}
            </span>
          </div>

          {quote.hasTent && (
            <div className="summary-item summary-item--indent">
              <span className="summary-item__label">
                • Includes KES 7,000 tent transport surcharge
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ==================== TOTALS ==================== */}
      <div className="quote-summary__totals">
        <div className="summary-total">
          <span className="summary-total__label">Estimated Total:</span>

          <span className="summary-total__value">
            KES {quote.subtotal.toLocaleString()}
          </span>
        </div>

        <div className="summary-total summary-total--deposit">
          <span className="summary-total__label">50% Deposit:</span>

          <span className="summary-total__value">
            KES {quote.deposit.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="quote-summary__note">
        <p>
          💳 50% deposit secures your date. Final pricing may change after
          confirmation of event requirements. Tent pricing is subject to
          confirmation.
        </p>
      </div>
    </div>
  );
}

export default QuoteSummary;

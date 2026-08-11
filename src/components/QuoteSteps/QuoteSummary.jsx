import React from "react";
import { PRICING, calculateQuote } from "../../data/pricingData";

function QuoteSummary({ formData, tablesNeeded }) {
  const quote = calculateQuote(formData, tablesNeeded);
  const tableSettings = formData.tableSettings || {};
  const extras = formData.extras || {};

  const hasAnySelection = quote.subtotal > 0;

  return (
    <div className="quote-summary">
      <h3 className="quote-summary__title">Your Quote Summary</h3>

      {!hasAnySelection && (
        <p className="quote-summary__empty">
          Your selections will appear here as you go — nothing to show yet.
        </p>
      )}

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

        {(quote.chairCost > 0 ||
          quote.tableCost > 0 ||
          quote.tableSettingsCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Seating &amp; Tables</h4>

            {formData.chairType && formData.chairQuantity > 0 && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {formData.chairQuantity}×{" "}
                  {formData.chairType === "dressedPlastic"
                    ? "Dressed Plastic"
                    : formData.chairType === "chiavari"
                      ? "Chiavari"
                      : formData.chairType === "luxe"
                        ? "Luxe"
                        : formData.chairType}{" "}
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
                  <span className="summary-item__label">Table Settings:</span>
                  <span className="summary-item__value"></span>
                </div>

                {tableSettings.napkins && (
                  <div className="summary-item summary-item--indent">
                    <span className="summary-item__label">
                      • Napkins + Rings ({formData.guestCount} guests)
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
                    <span className="summary-item__label">
                      • Wine Glasses ({formData.guestCount} guests)
                    </span>
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
                      • Charger Plates ({formData.guestCount} guests)
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
                    <span className="summary-item__label">
                      • Table Mats ({formData.guestCount} guests)
                    </span>
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
                    <span className="summary-item__label">
                      • Table Runners ({tablesNeeded} tables)
                    </span>
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
                      • Candles + Holders ({tablesNeeded} tables)
                    </span>
                    <span className="summary-item__value">
                      KES{" "}
                      {(
                        PRICING.tableSettingsPerTable.candlesAndHolders *
                        tablesNeeded
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {(quote.backdropCost > 0 || quote.welcomeSignCost > 0) && (
          <div className="summary-section">
            <h4 className="summary-section__title">Backdrops &amp; Signage</h4>
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
                  KES {quote.welcomeSignCost.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

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
            {extras.dessertTable && (
              <div className="summary-item">
                <span className="summary-item__label">Dessert Table Setup</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.dessertTable.toLocaleString()}
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
            {extras.redCarpet && (
              <div className="summary-item">
                <span className="summary-item__label">Red Carpet (10m)</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.redCarpet.toLocaleString()}
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
            {extras.cardBox && (
              <div className="summary-item">
                <span className="summary-item__label">Card Box</span>
                <span className="summary-item__value">
                  KES {PRICING.extras.cardBox.toLocaleString()}
                </span>
              </div>
            )}
            {extras.individualCards && extras.cardQuantity && (
              <div className="summary-item">
                <span className="summary-item__label">
                  {extras.cardQuantity}× Individual Cards
                </span>
                <span className="summary-item__value">
                  KES{" "}
                  {(
                    PRICING.extras.individualCards * extras.cardQuantity
                  ).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="summary-section">
          <h4 className="summary-section__title">Service Fees</h4>
          <div className="summary-item">
            <span className="summary-item__label">
              Transport (
              {formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi"})
            </span>
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
        </div>
      </div>

      <div className="quote-summary__totals">
        <div className="summary-total">
          <span className="summary-total__label">Subtotal:</span>
          <span className="summary-total__value">
            KES {quote.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="summary-total summary-total--deposit">
          <span className="summary-total__label">50% Deposit to Book:</span>
          <span className="summary-total__value">
            KES {quote.deposit.toLocaleString()}
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

import React, { useState } from "react";
import ChairCard from "./ChairCard";
import { PRICING } from "../../data/pricingData";
import plasticDressed from "../../assets/images/seats/plasticDressed.jpg";
import chiavariSeat from "../../assets/images/seats/chiavariSeat.jpg";
import luxeSeat from "../../assets/images/seats/luxeSeat.jpg";
import "../../pages/Quote/Quote.scss";
import "./StepTwo.scss";

const chairOptions = [
  {
    id: "dressedPlastic",
    name: "Dressed Plastic Chairs",
    price: PRICING.chairs.dressedPlastic,
    description: "Classic white plastic chairs with elegant fabric covers",
    image: plasticDressed,
    popular: true,
  },
  {
    id: "chiavari",
    name: "Chiavari Chairs",
    price: PRICING.chairs.chiavari,
    description: "Elegant chiavari chairs, perfect for upscale events",
    image: chiavariSeat,
    popular: false,
  },
  {
    id: "luxe",
    name: "Luxe Chairs",
    price: PRICING.chairs.luxe,
    description: "Premium luxury seating for sophisticated celebrations",
    image: luxeSeat,
    popular: false,
  },
];

function StepTwo({ formData, setFormData, tablesNeeded }) {
  // Local state for table settings
  const [settingsMode, setSettingsMode] = useState("none");

  // Calculate chair cost
  const calculateChairCost = () => {
    if (!formData.chairTpye) return 0;
    const pricePerChair = PRICING.chairs[formData.chairTpye] || 0;
    return pricePerChair * formData.chairQuantity;
  };

  const calculateTableCost = () => {
    return tablesNeeded * PRICING.tables.dressed;
  };

  // Calculate table settings cost
  const calculateTableSettingsCost = () => {
    let total = 0;
    const guestCount = formData.guestCount;
    const settings = formData.tableSettings;

    if (settingsMode === "package") {
      // Full package: all per-guest items + all per-table items
      total += guestCount * PRICING.tableSettings.napkinsAndRings;
      total += guestCount * PRICING.tableSettings.wineGlasses;
      total += guestCount * PRICING.tableSettings.chargerPlates;
      total += guestCount * PRICING.tableSettings.tableMats;
      total += tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
      total += tablesNeeded * PRICING.tableSettingsPerTable.candlesAndHolders;
    } else if (settingsMode === "custom") {
      // Custom: calculate selected items only
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

  const handleChairSelect = (chairId) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        chairType: chairId,
        chairQuantity: prev.guestCount,
      };
      return newData;
    });
  };

  const handleChairDeselect = () => {
    setFormData((prev) => ({
      ...prev,
      chairType: "",
      chairQuantity: 0,
    }));
  };

  const handleChairQuantityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      chairQuantity: parseInt(e.target.value) || 0,
    }));
  };

  // Handle settings mode
  const handleSettingsModeChange = (mode) => {
    setSettingsMode(mode);

    if (mode === "package") {
      // Select all items for package
      setFormData((prev) => ({
        ...prev,
        tableSettings: {
          fullPackage: true,
          napkins: true,
          wineGlasses: true,
          chargerPlates: true,
          tableMats: true,
          tableRunners: true,
          candles: true,
        },
      }));
    } else if (mode === "none") {
      // Deselect all items
      setFormData((prev) => ({
        ...prev,
        tableSettings: {
          fullPackage: false,
          napkins: false,
          wineGlasses: false,
          chargerPlates: false,
          tableMats: false,
          tableRunners: false,
          candles: false,
        },
      }));
    }
  };

  // Handle custom item toggle
  const handleCustomItemToggle = (item) => {
    setFormData((prev) => ({
      ...prev,
      tableSettings: {
        ...prev.tableSettings,
        [item]: !prev.tableSettings[item],
      },
    }));
  };

  // Calculate total for step
  const stepTotal =
    calculateChairCost() + calculateTableCost() + calculateTableSettingsCost();

  return (
    <div className="step">
      <h2 className="step__title">Step 2: Seating & Tables</h2>
      <p className="step__description">
        Select the chair style that matches your event aesthetic
      </p>

      <div className="form">
        <div className="form__group">
          <label className="form__label">Chair Type(Optional)</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Skip if you don't need chair rentals
          </p>

          <div className="chair-selector">
            {chairOptions.map((chair) => (
              <ChairCard
                key={chair.id}
                chair={chair}
                isSelected={formData.chairTpye === chair.id}
                onSelect={handleChairSelect}
              />
            ))}
          </div>

          {formData.chairType && (
            <button
              type="button"
              onClick={handleChairDeselect}
              className="deselect-button"
            >
              ✕ Remove Chair Selection
            </button>
          )}
        </div>

        {formData.chairTpye && (
          <div className="form__group">
            <label htmlFor="chairQuantity" className="form__label">
              Number of Chairs
            </label>
            <input
              type="number"
              id="chairQuantity"
              name="chairQuantity"
              min="0"
              max="1000"
              value={formData.chairQuantity}
              onChange={handleChairQuantityChange}
              className="form__input"
            />
            <span className="form__hint">
              Auto-filled based on {formData.guestCount} guests. Adjust if
              needed.
            </span>

            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                Chair cost:{" "}
                <strong>KES {calculateChairCost().toLocaleString()}</strong>
              </span>
            </div>
          </div>
        )}

        {(formData.chairTpye || settingsMode !== "none") && (
          <div className="form__group">
            <div className="form__info-box">
              <div className="form__info-box-header">
                <h4 className="form__info-box-title">
                  Tables {formData.chairType ? "Included" : "Required"}
                </h4>
              </div>
              <p className="form__info-box-text">
                <strong>{tablesNeeded} dressed tables</strong>{" "}
                {formData.chairType
                  ? "are automatically included with your chair selection"
                  : "needed for your table settings"}{" "}
                (KES {PRICING.tables.dressed.toLocaleString()} per table).
              </p>
              <div className="form__calculation">
                <span className="form__calculation-icon">💰</span>
                <span className="form__calculation-text">
                  Table cost:{" "}
                  <strong>KES {calculateTableCost().toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="form__group">
          <label className="form__label">Table Settings</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Complete your table setup with napkins, glasses, chager plates, and
            more
          </p>

          <div className="settings-mode-selector">
            <button
              type="button"
              onClick={() => handleSettingsModeChange("none")}
              className={`settings-mode-btn ${settingsMode === "none" ? "settings-mode-btn--active" : ""}`}
            >
              <span className="settings-mode-btn__title">
                No Table Settings
              </span>
              <span className="settings-mode-btn__description">
                Skip this section
              </span>
              {/* <span className="settings-mode-btn__description">
                Just chairs and tables
              </span> */}
            </button>

            <button
              type="button"
              onClick={() => handleSettingsModeChange("package")}
              className={`settings-mode-btn ${settingsMode === "package" ? "settings-mode-btn--active" : ""}`}
            >
              <span className="settings-mode-btn__badge">Best Value</span>
              <span className="settings-mode-btn__title">Full Table Setup</span>
              <span className="settings-mode-btn__description">
                Everything included
              </span>
              <span className="settings-mode-btn__price">
                +KES{" "}
                {(
                  formData.guestCount * 260 +
                  tablesNeeded * 260
                ).toLocaleString()}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSettingsModeChange("custom")}
              className={`settings-mode-btn ${settingsMode === "custom" ? "settings-mode-btn--active" : ""}`}
            >
              <span className="settings-mode-btn__title">Custom Selection</span>
              <span className="settings-mode-btn__description">
                Pick individual items
              </span>
            </button>
          </div>
        </div>

        {/* Custom settings selection */}
        {settingsMode === "custom" && (
          <div className="form__group">
            <div className="custom-settings">
              <h4 className="custom-settings__title">Choose Your Items</h4>

              <div className="custom-settings__section">
                <h5 className="custom-settings__section-title">
                  Per Guest ({formData.guestCount} guests)
                </h5>
                <div className="custom-settings__items">
                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.napkins}
                      onChange={() => handleCustomItemToggle("napkins")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Napkins + Napkin Rings
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettings.napkinsAndRings} ×{" "}
                        {formData.guestCount} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettings.napkinsAndRings *
                            formData.guestCount
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>

                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.wineGlasses}
                      onChange={() => handleCustomItemToggle("wineGlasses")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Wine Glasses
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettings.wineGlasses} ×{" "}
                        {formData.guestCount} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettings.wineGlasses *
                            formData.guestCount
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>

                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.chargerPlates}
                      onChange={() => handleCustomItemToggle("chargerPlates")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Charger Plates
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettings.chargerPlates} ×{" "}
                        {formData.guestCount} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettings.chargerPlates *
                            formData.guestCount
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>

                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.tableMats}
                      onChange={() => handleCustomItemToggle("tableMats")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Table Mats
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettings.tableMats} ×{" "}
                        {formData.guestCount} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettings.tableMats *
                            formData.guestCount
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Per table items */}
              <div className="custom-settings__section">
                <h5 className="custom-settings__section-title">
                  Per Table ({tablesNeeded} tables)
                </h5>
                <div className="custom-settings__items">
                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.tableRunners}
                      onChange={() => handleCustomItemToggle("tableRunners")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Table Runners
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettingsPerTable.tableRunners} ×{" "}
                        {tablesNeeded} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettingsPerTable.tableRunners *
                            tablesNeeded
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>

                  <label className="custom-setting-item">
                    <input
                      type="checkbox"
                      checked={formData.tableSettings.candles}
                      onChange={() => handleCustomItemToggle("candles")}
                    />
                    <div className="custom-setting-item__content">
                      <span className="custom-setting-item__name">
                        Candles + Holders
                      </span>
                      <span className="custom-setting-item__price">
                        KES {PRICING.tableSettingsPerTable.candlesAndHolders} ×{" "}
                        {tablesNeeded} =
                        <strong>
                          {" "}
                          KES{" "}
                          {(
                            PRICING.tableSettingsPerTable.candlesAndHolders *
                            tablesNeeded
                          ).toLocaleString()}
                        </strong>
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom Settings cost */}
              {calculateTableSettingsCost() > 0 && (
                <div className="form__calculation">
                  <span className="form__calculation-icon">💰</span>
                  <span className="form__calculation-text">
                    Table settings cost:{" "}
                    <strong>
                      KES {calculateTableSettingsCost().toLocaleString()}
                    </strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Package Details */}
        {settingsMode === "package" && (
          <div className="form__group">
            <div className="package-details">
              <h4 className="package-details__title">Full Package Includes:</h4>
              <div className="package-details__grid">
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Napkins + Napkin Rings</span>
                </div>
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Wine Glasses</span>
                </div>
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Charger Plates</span>
                </div>
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Table Mats</span>
                </div>
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Table Runners</span>
                </div>
                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Candles + Holders</span>
                </div>
              </div>
              <div className="form__calculation">
                <span className="form__calculation-icon">💰</span>
                <span className="form__calculation-text">
                  Package cost:{" "}
                  <strong>
                    KES {calculateTableSettingsCost().toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {stepTotal > 0 && (
          <div className="step__total">
            <span className="step__total-label">Seating & Tables Total:</span>
            <span className="step__total-amount">
              KES {stepTotal.toLocaleString()}
            </span>
          </div>
        )}

        {stepTotal === 0 && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>
              <h4 className="form__info-box-title">
                Seating & Tables are Optional
              </h4>
            </div>
            <p className="form__info-box-text">
              You can skip this step if you don't need chairs or table settings.
              Click "Next Step" to continue with backdrops and extras.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepTwo;

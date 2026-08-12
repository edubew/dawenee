import React, { useMemo, useState } from "react";
import OptionCard from "./OptionCard";
import { PRICING } from "../../data/pricingData";

import plasticDressed from "../../assets/images/seats/plasticDressed.jpg";
import chiavariSeat from "../../assets/images/seats/chiavariSeat.jpg";
import luxeSeat from "../../assets/images/seats/luxeSeat.jpg";

// import "./StepTwoThreeFour.scss";

import "../../pages/Quote/Quote.scss";

// CHAIR OPTIONS

const chairOptions = [
  {
    id: "dressedPlastic",
    name: "Dressed Plastic Chairs",
    price: PRICING.chairs.dressedPlastic,
    description:
      "Classic white plastic chairs with elegant fabric covers and tie backs.",
    image: plasticDressed,
    popular: true,
  },
  {
    id: "chiavari",
    name: "Chiavari Chairs",
    price: PRICING.chairs.chiavari,
    description: "Elegant seating for refined weddings and celebrations.",
    image: chiavariSeat,
  },
  {
    id: "luxe",
    name: "Luxe Chairs",
    price: PRICING.chairs.luxe,
    description: "Premium seating for a more sophisticated event aesthetic.",
    image: luxeSeat,
  },
];

// TABLE OPTIONS

const tableOptions = [
  {
    id: "round",
    name: "Round Tables",
    description:
      "A classic, social layout that works beautifully for celebrations and intimate gatherings.",
  },
  {
    id: "rectangular",
    name: "Rectangular Tables",
    description:
      "A versatile layout suited to banquet-style, corporate and long-table arrangements.",
  },
];

//  TABLE SETTING OPTIONS

const perGuestSettings = [
  {
    id: "napkins",
    name: "Napkins + Napkin Rings",
    price: PRICING.tableSettings.napkinsAndRings,
    suffix: "per guest",
  },
  {
    id: "wineGlasses",
    name: "Wine Glasses",
    price: PRICING.tableSettings.wineGlasses,
    suffix: "per guest",
  },
  {
    id: "chargerPlates",
    name: "Charger Plates",
    price: PRICING.tableSettings.chargerPlates,
    suffix: "per guest",
  },
  {
    id: "tableMats",
    name: "Table Mats",
    price: PRICING.tableSettings.tableMats,
    suffix: "per guest",
  },
  {
    id: "placeCards",
    name: "Place Cards",
    price: PRICING.tableSettings.placeCards,
    suffix: "per guest",
  },
];

const perTableSettings = [
  {
    id: "tableRunners",
    name: "Table Runners",
    price: PRICING.tableSettingsPerTable.tableRunners,
    suffix: "per table",
  },
  {
    id: "candles",
    name: "Candles",
    price: PRICING.tableSettingsPerTable.candles,
    suffix: "per table",
  },
];

const INITIAL_TABLE_SETTINGS = {
  fullPackage: false,
  napkins: false,
  wineGlasses: false,
  chargerPlates: false,
  tableMats: false,
  placeCards: false,
  tableRunners: false,
  candles: false,
};

function StepTwo({ formData, setFormData, tablesNeeded }) {
  const initialSettingsMode = useMemo(() => {
    const settings = formData.tableSettings || {};

    if (settings.fullPackage) {
      return "package";
    }

    const hasCustomSelection = Object.entries(settings).some(
      ([key, value]) => key !== "fullPackage" && value === true,
    );

    return hasCustomSelection ? "custom" : "none";
  }, [formData.tableSettings]);

  const [settingsMode, setSettingsMode] = useState(initialSettingsMode);

  // CALCULATIONS

  const _chairCost = useMemo(() => {
    if (!formData.chairType) return 0;

    return (
      (PRICING.chairs[formData.chairType] || 0) * (formData.chairQuantity || 0)
    );
  }, [formData.chairType, formData.chairQuantity]);

  const fullPackageCost = useMemo(() => {
    const guestCount = formData.guestCount || 0;

    const perGuestCost =
      PRICING.tableSettings.napkinsAndRings +
      PRICING.tableSettings.wineGlasses +
      PRICING.tableSettings.chargerPlates +
      PRICING.tableSettings.tableMats +
      PRICING.tableSettings.placeCards;

    const perTableCost =
      PRICING.tableSettingsPerTable.tableRunners +
      PRICING.tableSettingsPerTable.candles;

    return guestCount * perGuestCost + tablesNeeded * perTableCost;
  }, [formData.guestCount, tablesNeeded]);

  const customSettingsCost = useMemo(() => {
    const settings = formData.tableSettings || INITIAL_TABLE_SETTINGS;

    let total = 0;

    perGuestSettings.forEach((item) => {
      if (settings[item.id]) {
        total += (formData.guestCount || 0) * item.price;
      }
    });

    perTableSettings.forEach((item) => {
      if (settings[item.id]) {
        total += tablesNeeded * item.price;
      }
    });

    return total;
  }, [formData.tableSettings, formData.guestCount, tablesNeeded]);

  //  CHAIR HANDLERS

  const handleChairSelect = (chairId) => {
    setFormData((prev) => {
      const isSame = prev.chairType === chairId;

      return {
        ...prev,
        chairType: isSame ? "" : chairId,
        chairQuantity: isSame ? 0 : prev.guestCount,
      };
    });
  };

  const handleChairDeselect = () => {
    setFormData((prev) => ({
      ...prev,
      chairType: "",
      chairQuantity: 0,
    }));
  };

  const handleChairQuantityChange = (event) => {
    const value = Math.max(0, Number(event.target.value) || 0);

    setFormData((prev) => ({
      ...prev,
      chairQuantity: value,
    }));
  };

  // TABLE HANDLERS
  const handleTableTypeSelect = (tableType) => {
    setFormData((prev) => ({
      ...prev,
      tableType: prev.tableType === tableType ? "" : tableType,
    }));
  };

  // TABLE SETTINGS HANDLERS

  const clearTableSettings = () => {
    setFormData((prev) => ({
      ...prev,
      tableSettings: {
        ...INITIAL_TABLE_SETTINGS,
      },
    }));
  };

  const handleSettingsModeChange = (mode) => {
    setSettingsMode(mode);

    if (mode === "package") {
      setFormData((prev) => ({
        ...prev,
        tableSettings: {
          fullPackage: true,
          napkins: true,
          wineGlasses: true,
          chargerPlates: true,
          tableMats: true,
          placeCards: true,
          tableRunners: true,
          candles: true,
        },
      }));

      return;
    }

    if (mode === "none") {
      clearTableSettings();
      return;
    }

    /*
     * Custom mode starts with everything unchecked.
     * If the customer already had custom selections,
     * we preserve them rather than wiping them.
     */
    setFormData((prev) => ({
      ...prev,
      tableSettings: {
        ...(prev.tableSettings || INITIAL_TABLE_SETTINGS),
        fullPackage: false,
      },
    }));
  };

  const handleCustomItemToggle = (item) => {
    setFormData((prev) => ({
      ...prev,
      tableSettings: {
        ...(prev.tableSettings || INITIAL_TABLE_SETTINGS),
        fullPackage: false,
        [item]: !prev.tableSettings?.[item],
      },
    }));
  };

  return (
    <div>
      {/* INTRO */}

      <div className="step__intro">
        <span className="step__eyebrow">Step 2 · The foundation</span>

        <h2 className="step__title">
          Let's build your <em>tablescape</em>
        </h2>

        <p className="step__description">
          Choose your seating, table layout and table styling. Don't need
          something? Simply skip it.
        </p>
      </div>

      <div className="form">
        {/* SEATING */}

        <div className="form__group">
          <div className="form__section-heading">
            <div>
              <label className="form__label">Seating</label>

              <p className="form__hint">
                Choose the chair style that best suits your event.
              </p>
            </div>

            <span className="form__optional">Optional</span>
          </div>

          <div className="option-grid">
            {chairOptions.map((chair) => (
              <OptionCard
                key={chair.id}
                name={chair.name}
                description={chair.description}
                image={chair.image}
                price={chair.price}
                priceSuffix="per chair"
                popular={chair.popular}
                isSelected={formData.chairType === chair.id}
                onSelect={() => handleChairSelect(chair.id)}
              />
            ))}
          </div>

          {formData.chairType && (
            <div className="selection-controls">
              <button
                type="button"
                onClick={handleChairDeselect}
                className="deselect-button"
              >
                Remove chair selection
              </button>
            </div>
          )}

          {!formData.chairType && (
            <div className="form__skip-note">
              No chairs needed? That's perfectly fine — you can continue without
              selecting any.
            </div>
          )}
        </div>

        {/* CHAIR QUANTITY */}

        {formData.chairType && (
          <div className="form__group">
            <label htmlFor="chairQuantity" className="form__label">
              How many chairs do you need?
            </label>

            <div className="quantity-field">
              <input
                type="number"
                id="chairQuantity"
                name="chairQuantity"
                min="1"
                max="1000"
                value={formData.chairQuantity || 0}
                onChange={handleChairQuantityChange}
                className="form__input"
              />

              <span className="quantity-field__unit">chairs</span>
            </div>

            <span className="form__hint">
              We've filled this in based on your {formData.guestCount} guests.
              Adjust it if some guests already have seating.
            </span>
          </div>
        )}

        {/* TABLES */}

        <div className="form__group">
          <div className="form__section-heading">
            <div>
              <label className="form__label">Tables</label>

              <p className="form__hint">
                Choose the table shape you'd prefer for your event.
              </p>
            </div>

            <span className="form__optional">Optional</span>
          </div>

          <div className="option-grid option-grid--two">
            {tableOptions.map((table) => (
              <OptionCard
                key={table.id}
                name={table.name}
                description={table.description}
                icon={table.icon}
                price={PRICING.tables.dressed}
                priceSuffix="per dressed table"
                isSelected={formData.tableType === table.id}
                onSelect={() => handleTableTypeSelect(table.id)}
              />
            ))}
          </div>

          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon" aria-hidden="true">
                ✦
              </span>

              <h4 className="form__info-box-title">About your tables</h4>
            </div>

            <p className="form__info-box-text">
              Each dressed table is{" "}
              <strong>KES {PRICING.tables.dressed.toLocaleString()}</strong> and
              comfortably seats up to <strong>7 guests</strong>. The
              dressed-table price already includes the table and tablecloth.
            </p>
          </div>
        </div>

        {/* TABLE SETTINGS */}

        <div className="form__group">
          <div className="form__section-heading">
            <div>
              <label className="form__label">Table Styling</label>

              <p className="form__hint">
                Add the details that bring your tablescape together.
              </p>
            </div>

            <span className="form__optional">Optional</span>
          </div>

          {/* Settings mode */}
          <div className="settings-mode-selector">
            <button
              type="button"
              onClick={() => handleSettingsModeChange("none")}
              className={`settings-mode-btn ${
                settingsMode === "none" ? "settings-mode-btn--active" : ""
              }`}
              aria-pressed={settingsMode === "none"}
            >
              <span className="settings-mode-btn__title">No Table Styling</span>

              <span className="settings-mode-btn__description">
                Keep it simple
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSettingsModeChange("package")}
              className={`settings-mode-btn ${
                settingsMode === "package" ? "settings-mode-btn--active" : ""
              }`}
              aria-pressed={settingsMode === "package"}
            >
              <span className="settings-mode-btn__badge">Complete Look</span>

              <span className="settings-mode-btn__title">Full Table Setup</span>

              <span className="settings-mode-btn__description">
                Everything for a finished tablescape
              </span>

              <span className="settings-mode-btn__price">
                KES {fullPackageCost.toLocaleString()}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSettingsModeChange("custom")}
              className={`settings-mode-btn ${
                settingsMode === "custom" ? "settings-mode-btn--active" : ""
              }`}
              aria-pressed={settingsMode === "custom"}
            >
              <span className="settings-mode-btn__title">Build Your Own</span>

              <span className="settings-mode-btn__description">
                Choose only what you need
              </span>
            </button>
          </div>
        </div>

        {/* CUSTOM TABLE SETTINGS */}

        {settingsMode === "custom" && (
          <div className="form__group">
            <div className="custom-settings">
              <div className="custom-settings__header">
                <div>
                  <h4 className="custom-settings__title">
                    Choose your details
                  </h4>

                  <p className="custom-settings__description">
                    Select as many or as few as you'd like.
                  </p>
                </div>
              </div>

              {/* Per guest */}
              <div className="custom-settings__section">
                <div className="custom-settings__section-header">
                  <h5 className="custom-settings__section-title">Per guest</h5>

                  <span>{formData.guestCount} guests</span>
                </div>

                <div className="custom-settings__items">
                  {perGuestSettings.map((item) => {
                    const isSelected = Boolean(
                      formData.tableSettings?.[item.id],
                    );

                    const total = item.price * (formData.guestCount || 0);

                    return (
                      <label
                        key={item.id}
                        className={`custom-setting-item ${
                          isSelected ? "custom-setting-item--selected" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCustomItemToggle(item.id)}
                        />

                        <span className="custom-setting-item__check">
                          {isSelected ? "✓" : ""}
                        </span>

                        <div className="custom-setting-item__content">
                          <span className="custom-setting-item__name">
                            {item.name}
                          </span>

                          <span className="custom-setting-item__price">
                            KES {item.price.toLocaleString()} {item.suffix}
                          </span>
                        </div>

                        {isSelected && (
                          <strong className="custom-setting-item__total">
                            KES {total.toLocaleString()}
                          </strong>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Per table */}
              <div className="custom-settings__section">
                <div className="custom-settings__section-header">
                  <h5 className="custom-settings__section-title">Per table</h5>

                  <span>
                    {tablesNeeded} {tablesNeeded === 1 ? "table" : "tables"}
                  </span>
                </div>

                <div className="custom-settings__items">
                  {perTableSettings.map((item) => {
                    const isSelected = Boolean(
                      formData.tableSettings?.[item.id],
                    );

                    const total = item.price * tablesNeeded;

                    return (
                      <label
                        key={item.id}
                        className={`custom-setting-item ${
                          isSelected ? "custom-setting-item--selected" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCustomItemToggle(item.id)}
                        />

                        <span className="custom-setting-item__check">
                          {isSelected ? "✓" : ""}
                        </span>

                        <div className="custom-setting-item__content">
                          <span className="custom-setting-item__name">
                            {item.name}
                          </span>

                          <span className="custom-setting-item__price">
                            KES {item.price.toLocaleString()} {item.suffix}
                          </span>
                        </div>

                        {isSelected && (
                          <strong className="custom-setting-item__total">
                            KES {total.toLocaleString()}
                          </strong>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {customSettingsCost > 0 && (
                <div className="form__calculation">
                  <span className="form__calculation-icon">✦</span>

                  <span className="form__calculation-text">
                    Table styling:{" "}
                    <strong>KES {customSettingsCost.toLocaleString()}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FULL PACKAGE DETAILS */}

        {settingsMode === "package" && (
          <div className="form__group">
            <div className="package-details">
              <div className="package-details__header">
                <div>
                  <h4 className="package-details__title">Full Table Setup</h4>

                  <p className="package-details__description">
                    A complete tablescape without having to choose each piece
                    individually.
                  </p>
                </div>

                <strong className="package-details__price">
                  KES {fullPackageCost.toLocaleString()}
                </strong>
              </div>

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
                  <span>Place Cards</span>
                </div>

                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Table Runners</span>
                </div>

                <div className="package-details__item">
                  <span className="package-details__check">✓</span>
                  <span>Candles</span>
                </div>
              </div>

              <p className="package-details__note">
                The package total is calculated from your guest count and number
                of tables.
              </p>
            </div>
          </div>
        )}

        {/* NO SELECTION MESSAGE */}

        {!formData.chairType &&
          !formData.tableType &&
          settingsMode === "none" && (
            <div className="form__info-box form__info-box--soft">
              <div className="form__info-box-header">
                <span className="form__info-box-icon" aria-hidden="true">
                  ✦
                </span>

                <h4 className="form__info-box-title">Keeping it simple?</h4>
              </div>

              <p className="form__info-box-text">
                That's completely fine. You can skip seating and table styling
                and continue to explore the rest of Dawenee's decor options.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default StepTwo;

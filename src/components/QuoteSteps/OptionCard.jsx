import React from "react";

/**
 *
 * @param {object} props
 * @param {string} props.name - option title
 * @param {string} [props.description] - short supporting text
 * @param {string} [props.image] - photo URL (image takes priority over icon)
 * @param {string} [props.icon] - emoji/icon fallback when no photo exists
 * @param {number} props.price - price to display
 * @param {string} [props.priceSuffix] - e.g. "per chair", "per table"
 * @param {string} [props.totalLabel] - optional secondary line, e.g. "Total: KES 12,000"
 * @param {boolean} [props.popular] - shows a "Most Popular" badge
 * @param {boolean} props.isSelected
 * @param {function} props.onSelect - called with no args (parent already has the id in scope) or pass an id via closure
 * @param {"button"|"toggle"} [props.mode] - "button" (single-select radio-style) or "toggle" (multi-select checkbox-style); purely semantic, same visuals
 */

function OptionCard({
  name,
  description,
  image,
  icon,
  price,
  priceSuffix,
  totalLabel,
  popular,
  isSelected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`option-card ${isSelected ? "option-card--selected" : ""}`}
      aria-pressed={isSelected}
    >
      {popular && <span className="option-card__badge">Most Popular</span>}
      {isSelected && (
        <span className="option-card__selected-badge" aria-hidden="true">
          ✓
        </span>
      )}

      {image ? (
        <div className="option-card__image">
          <img src={image} alt={name} />
        </div>
      ) : icon ? (
        <div className="option-card__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}

      <h3 className="option-card__name">{name}</h3>
      {description && <p className="option-card__description">{description}</p>}

      <div className="option-card__price">
        KES {price.toLocaleString()}
        {priceSuffix && <span> {priceSuffix}</span>}
      </div>

      {totalLabel && <div className="option-card__total">{totalLabel}</div>}
    </button>
  );
}

export default OptionCard;

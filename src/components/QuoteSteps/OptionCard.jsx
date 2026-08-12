import React from "react";

/**
 * Reusable selection card for the Dawenee quote builder.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} [props.description]
 * @param {string} [props.image]
 * @param {string} [props.icon]
 * @param {number|null} [props.price]
 * @param {string} [props.priceSuffix]
 * @param {string} [props.totalLabel]
 * @param {boolean} [props.popular]
 * @param {boolean} props.isSelected
 * @param {function} props.onSelect
 * @param {boolean} [props.requiresReview]
 * @param {string} [props.reviewLabel]
 * @param {string} [props.selectionLabel]
 * @param {boolean} [props.disabled]
 */

function OptionCard({
  name,
  description,
  image,
  icon,
  price,
  priceSuffix,
  totalLabel,
  popular = false,
  isSelected = false,
  onSelect,
  requiresReview = false,
  reviewLabel = "Price confirmed after consultation",
  selectionLabel,
  disabled = false,
}) {
  const hasPrice = typeof price === "number" && !Number.isNaN(price);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`option-card ${
        isSelected ? "option-card--selected" : ""
      } ${disabled ? "option-card--disabled" : ""}`}
      aria-pressed={isSelected}
      disabled={disabled}
    >
      {/* Selection indicator */}
      <span className="option-card__selection" aria-hidden="true">
        {isSelected ? "✓" : ""}
      </span>

      {/* Popular badge */}
      {popular && <span className="option-card__badge">Most Popular</span>}

      {/* Image */}
      {image ? (
        <div className="option-card__image">
          <img src={image} alt="" loading="lazy" />
        </div>
      ) : icon ? (
        <div className="option-card__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}

      {/* Card content */}
      <div className="option-card__content">
        <h3 className="option-card__name">{name}</h3>

        {description && (
          <p className="option-card__description">{description}</p>
        )}

        {/* Pricing */}
        <div className="option-card__pricing">
          {requiresReview ? (
            <>
              <span className="option-card__price option-card__price--review">
                Price to be confirmed
              </span>

              <span className="option-card__review">{reviewLabel}</span>
            </>
          ) : hasPrice ? (
            <>
              <span className="option-card__price">
                KES {price.toLocaleString()}
              </span>

              {priceSuffix && (
                <span className="option-card__price-suffix">{priceSuffix}</span>
              )}
            </>
          ) : null}
        </div>

        {/* Calculated total */}
        {totalLabel && <div className="option-card__total">{totalLabel}</div>}

        {/* Optional contextual selection text */}
        {selectionLabel && (
          <span className="option-card__selection-label">{selectionLabel}</span>
        )}
      </div>
    </button>
  );
}

export default OptionCard;

import React from 'react';
import "./ChairCard.scss";

function ChairCard({ chair, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(chair.id)}
      className={`chair-card ${isSelected ? "chair-card--selected" : ""}`}
    >
      {chair.popular && <span className="chair-card__badge">Most Popular</span>}
      <div className="chair-card__image">
        <img src={chair.image} alt={chair.name} />
      </div>
      <h3 className="chair-card__name">{chair.name}</h3>
      <p className="chair-card__description">{chair.description}</p>
      <div className="chair-card__price">
        KES {chair.price.toLocaleString()} <span>per chair</span>
      </div>
    </button>
  );
}

export default ChairCard

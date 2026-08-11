import React from "react";

export function PampasGrass({
  className = "",
  style = {},
  color = "#7A8C5E",
  seedColor = "#C4A35A",
  opacity = 0.22,
}) {
  return (
    <svg
      className={`botanical-pampas ${className}`}
      style={{ opacity, ...style }}
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M150 400 C148 340 152 280 145 220 C140 160 130 120 120 80"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left fronds */}
      <path d="M145 220 C130 200 110 185 85 175" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M143 240 C125 215 100 195 70 185" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M142 260 C120 235 92 218 60 210" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M141 280 C118 255 88 240 55 235" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M140 300 C118 275 90 260 58 258" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Right fronds */}
      <path d="M147 220 C162 200 182 185 207 175" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M148 240 C166 215 192 195 222 185" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M149 260 C170 235 200 218 232 210" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M150 280 C172 255 204 240 238 235" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Seed head */}
      <ellipse cx="130" cy="75" rx="18" ry="32" fill={seedColor} opacity="0.35"/>
      <ellipse cx="120" cy="70" rx="10" ry="22" fill={seedColor} opacity="0.25"/>
      {/* Secondary stems */}
      <path d="M140 180 C128 165 118 148 112 130" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M148 160 C158 142 164 122 162 100" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function EucalyptusBranch({
  className = "",
  style = {},
  color = "#7A8C5E",
  opacity = 0.15,
}) {
  return (
    <svg
      className={`botanical-eucalyptus ${className}`}
      style={{ opacity, ...style }}
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M140 10 C138 80 142 150 138 220 C135 270 130 295 128 320"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaf pair 1 */}
      <path d="M139 60 C122 52 108 48 95 50" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="88" cy="50" rx="20" ry="14" fill={color} opacity="0.25" transform="rotate(-15 88 50)"/>
      {/* Leaf pair 2 */}
      <path d="M140 100 C158 90 172 86 185 88" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="192" cy="88" rx="20" ry="14" fill={color} opacity="0.25" transform="rotate(10 192 88)"/>
      {/* Leaf pair 3 */}
      <path d="M139 140 C120 130 104 126 90 128" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="82" cy="128" rx="18" ry="13" fill={color} opacity="0.22" transform="rotate(-10 82 128)"/>
      {/* Leaf pair 4 */}
      <path d="M139 180 C158 170 174 166 188 168" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="196" cy="168" rx="18" ry="13" fill={color} opacity="0.22" transform="rotate(8 196 168)"/>
      {/* Leaf pair 5 */}
      <path d="M138 220 C118 210 102 206 88 208" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="80" cy="208" rx="16" ry="12" fill={color} opacity="0.18" transform="rotate(-8 80 208)"/>
    </svg>
  );
}

export function TerracottaBranch({
  className = "",
  style = {},
  color = "#C17A5A",
  opacity = 0.18,
}) {
  return (
    <svg
      className={`botanical-branch ${className}`}
      style={{ opacity, ...style }}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M80 20 C82 80 78 140 85 180 C88 210 90 240 88 280"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Branches */}
      <path d="M82 80 C68 95 52 105 35 108" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M83 120 C66 130 48 138 28 140" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M84 160 C70 168 55 175 38 178" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M83 100 C96 88 108 80 118 74" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M84 140 C98 130 112 124 124 120" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      {/* Berries/buds */}
      <circle cx="35" cy="108" r="6" fill={color} opacity="0.45"/>
      <circle cx="28" cy="140" r="5" fill={color} opacity="0.4"/>
      <circle cx="38" cy="178" r="7" fill={color} opacity="0.35"/>
      <circle cx="118" cy="74" r="5" fill={color} opacity="0.4"/>
      <circle cx="124" cy="120" r="6" fill={color} opacity="0.38"/>
    </svg>
  );
}

export function BerrySprig({
  className = "",
  style = {},
  color = "#8B3E52",
  opacity = 0.18,
}) {
  return (
    <svg
      className={`botanical-sprig ${className}`}
      style={{ opacity, ...style }}
      viewBox="0 0 220 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M110 10 C108 70 112 130 108 190 C106 230 104 260 102 300"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left branches with leaves */}
      <path d="M109 60 C92 50 78 46 64 48" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="56" cy="48" rx="16" ry="11" fill={color} opacity="0.2" transform="rotate(-12 56 48)"/>
      <path d="M109 110 C90 100 74 96 58 98" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="50" cy="98" rx="14" ry="10" fill={color} opacity="0.18" transform="rotate(-8 50 98)"/>
      <path d="M108 160 C88 150 72 146 56 148" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="48" cy="148" rx="14" ry="10" fill={color} opacity="0.16" transform="rotate(-6 48 148)"/>
      {/* Right branches with leaves */}
      <path d="M110 80 C128 70 142 66 156 68" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="163" cy="68" rx="16" ry="11" fill={color} opacity="0.2" transform="rotate(8 163 68)"/>
      <path d="M110 130 C130 120 146 116 162 118" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="170" cy="118" rx="14" ry="10" fill={color} opacity="0.18" transform="rotate(6 170 118)"/>
      {/* Small berry clusters */}
      <circle cx="56" cy="48" r="4" fill={color} opacity="0.35"/>
      <circle cx="163" cy="68" r="4" fill={color} opacity="0.35"/>
      <circle cx="50" cy="98" r="3.5" fill={color} opacity="0.3"/>
      <circle cx="170" cy="118" r="3.5" fill={color} opacity="0.3"/>
    </svg>
  );
}
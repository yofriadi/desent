import React from 'react';
import { LifestyleId } from '@/types/workspace';

interface LifestyleGraphicProps {
  lifestyleId: LifestyleId;
  isSelected?: boolean;
  onClick?: () => void;
}

export const LifestyleGraphic: React.FC<LifestyleGraphicProps> = ({
  lifestyleId,
  isSelected = false,
  onClick,
}) => {
  return (
    <g
      id={`lifestyle-${lifestyleId}`}
      className="cursor-pointer transition-all duration-300 ease-out"
      onClick={onClick}
    >
      <defs>
        {/* Soft shadow for floor objects */}
        <radialGradient id="lifestyle-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#0f172a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="espresso-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id="beanbag-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d6a4f" />
          <stop offset="60%" stopColor="#1b4332" />
          <stop offset="100%" stopColor="#081c15" />
        </linearGradient>
      </defs>

      {/* 1. COFFEE STATION & ESPRESSO BAR (zone-coffee: Stage Left, X: 175, Floor Y: 495) */}
      {lifestyleId === 'coffee-station' && (
        <g id="lifestyle-coffee" transform="translate(175, 495)">
          {/* SELECTION HIGHLIGHT */}
          {isSelected && (
            <ellipse
              cx="0"
              cy="-60"
              rx="48"
              ry="75"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Floor Shadow */}
          <ellipse cx="0" cy="8" rx="42" ry="14" fill="url(#lifestyle-shadow)" />

          {/* Teak Rolling Bar Cart */}
          <g id="bar-cart">
            {/* Cart Legs with brass wheels */}
            <rect x="-34" y="-30" width="4" height="35" rx="1.5" fill="#552c0e" />
            <rect x="30" y="-30" width="4" height="35" rx="1.5" fill="#552c0e" />
            <circle cx="-32" cy="7" r="4" fill="#d97706" stroke="#451a03" strokeWidth="1" />
            <circle cx="32" cy="7" r="4" fill="#d97706" stroke="#451a03" strokeWidth="1" />

            {/* Bottom Shelf */}
            <polygon points="-36,-10 36,-10 38,-4 -38,-4" fill="#8d4d1e" stroke="#552c0e" strokeWidth="1" />
            {/* Bag of Bali Kintamani whole coffee beans on bottom shelf */}
            <rect x="-24" y="-22" width="16" height="18" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <rect x="-22" y="-18" width="12" height="7" rx="1" fill="#fef3c7" />
            <text x="-20" y="-13" fontSize="3" fill="#78350f" fontWeight="bold">KINTAMANI</text>

            {/* Top Counter Surface */}
            <polygon points="-38,-35 38,-35 42,-28 -42,-28" fill="#a16207" stroke="#713f12" strokeWidth="1" />
            <rect x="-42" y="-28" width="84" height="5" rx="1" fill="#713f12" />
          </g>

          {/* Italian 15-Bar Espresso Machine */}
          <g id="espresso-machine" transform="translate(-10, -32)">
            {/* Machine Main Body */}
            <rect x="-18" y="-45" width="36" height="42" rx="3" fill="url(#espresso-metal)" stroke="#1e293b" strokeWidth="1" />
            {/* Cup warming tray on top */}
            <line x1="-16" y1="-45" x2="16" y2="-45" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

            {/* Circular Pressure Gauge */}
            <circle cx="0" cy="-34" r="5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="-34" x2="3" y2="-36" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />

            {/* Grouphead & Chrome Portafilter */}
            <rect x="-6" y="-22" width="12" height="6" rx="1" fill="#0f172a" />
            <rect x="-4" y="-16" width="8" height="5" rx="1" fill="#475569" />
            {/* Portafilter handle extending right */}
            <path d="M 4 -14 L 18 -12" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {/* Drip Tray */}
            <rect x="-16" y="-7" width="32" height="5" rx="1" fill="#1e293b" />

            {/* Rising Steam Whisps */}
            <path d="M -2 -22 Q -6 -32 -2 -38" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
            <path d="M 2 -20 Q 6 -30 3 -36" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
          </g>

          {/* Conical Burr Coffee Grinder (Right of machine) */}
          <g id="coffee-grinder" transform="translate(24, -32)">
            {/* Clear Bean Hopper */}
            <polygon points="-6,-38 6,-38 4,-26 -4,-26" fill="#bae6fd" opacity="0.6" stroke="#0f172a" strokeWidth="0.8" />
            {/* Coffee beans inside hopper */}
            <circle cx="-1" cy="-32" r="1.5" fill="#451a03" />
            <circle cx="2" cy="-30" r="1.5" fill="#78350f" />
            {/* Grinder body */}
            <rect x="-6" y="-26" width="12" height="24" rx="2" fill="#0f172a" />
            <circle cx="0" cy="-14" r="2" fill="#38bdf8" />
          </g>

          {/* Ceramic Espresso Cups & Saucers */}
          <g transform="translate(-26, -32)">
            <ellipse cx="0" cy="-2" rx="6" ry="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
            <polygon points="-4,-2 4,-2 3,-7 -3,-7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
            <path d="M 3 -6 C 5 -6, 5 -3, 3 -3" stroke="#cbd5e1" strokeWidth="0.8" fill="none" />
          </g>
        </g>
      )}

      {/* 2. OUTDOOR SURFBOARD & MOTORCYCLE RACK (zone-outdoor: Far Left, X: 68, Floor Y: 495) */}
      {lifestyleId === 'surf-moto' && (
        <g id="lifestyle-outdoor" transform="translate(68, 495)">
          {isSelected && (
            <ellipse
              cx="0"
              cy="-85"
              rx="42"
              ry="95"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Floor Shadow */}
          <ellipse cx="0" cy="8" rx="38" ry="12" fill="url(#lifestyle-shadow)" />

          {/* Bamboo Upright Surf Rack Frame */}
          <line x1="-22" y1="5" x2="-22" y2="-160" stroke="#854d0e" strokeWidth="7" strokeLinecap="round" />
          <line x1="22" y1="5" x2="22" y2="-160" stroke="#854d0e" strokeWidth="7" strokeLinecap="round" />
          {/* Bamboo horizontal cross rungs */}
          <line x1="-24" y1="-30" x2="24" y2="-30" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
          <line x1="-24" y1="-85" x2="24" y2="-85" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
          <line x1="-24" y1="-140" x2="24" y2="-140" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />

          {/* Board 1: Retro Twin-Fin Fish Board (Leaning Left) */}
          <g transform="translate(-8, 5) rotate(-6)">
            {/* Board silhouette with swallow tail */}
            <path
              d={`
                M -14 0 
                Q -18 -85 0 -170 
                Q 18 -85 14 0 
                L 0 -8 
                Z
              `}
              fill="#06b6d4"
              stroke="#0891b2"
              strokeWidth="1.5"
            />
            {/* Deck resin tint stripe (Warm coral) */}
            <path
              d="M -12 -30 Q -15 -85 0 -140 Q 15 -85 12 -30 Z"
              fill="#fb923c"
              opacity="0.85"
            />
            {/* Wooden stringer center line */}
            <line x1="0" y1="-8" x2="0" y2="-170" stroke="#78350f" strokeWidth="1" />
          </g>

          {/* Board 2: Performance Thruster Shortboard (Leaning Right) */}
          <g transform="translate(10, 5) rotate(5)">
            <path
              d={`
                M -12 0 
                Q -16 -75 0 -155 
                Q 16 -75 12 0 
                Z
              `}
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Black Carbon Deck Rail Spray */}
            <path d="M -10 -40 Q -14 -75 -1 -130" stroke="#0f172a" strokeWidth="2.5" fill="none" />
            <path d="M 10 -40 Q 14 -75 1 -130" stroke="#0f172a" strokeWidth="2.5" fill="none" />
            {/* Black EVA Traction Pad at tail */}
            <polygon points="-8,-2 -8,-24 8,-24 8,-2" fill="#1e293b" />
          </g>

          {/* Scooter Moto Peg & Retro Cafe-Racer Helmet (Side mount) */}
          <g transform="translate(24, -90)">
            {/* Mounting peg */}
            <line x1="0" y1="0" x2="16" y2="-2" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            {/* Matte Black 3/4 Open-Face Helmet */}
            <circle cx="16" cy="-2" r="14" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
            {/* Bubble visor */}
            <path d="M 18 -12 C 28 -8, 28 6, 18 10" stroke="#fbbf24" strokeWidth="3" fill="none" />
            {/* Chin strap hanging */}
            <path d="M 12 8 Q 14 18 16 16" stroke="#f43f5e" strokeWidth="2" fill="none" />
          </g>
        </g>
      )}

      {/* 3. RELAX BEANBAG & YOGA MAT (zone-relax: Stage Right, X: 820, Floor Y: 505) */}
      {lifestyleId === 'relax-beanbag' && (
        <g id="lifestyle-relax" transform="translate(820, 505)">
          {isSelected && (
            <ellipse
              cx="0"
              cy="-35"
              rx="55"
              ry="45"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Floor Shadow */}
          <ellipse cx="0" cy="12" rx="55" ry="18" fill="url(#lifestyle-shadow)" />

          {/* Unrolled Natural Rubber Yoga Mat (Slate Turquoise) */}
          <polygon
            points="-52,6 38,6 52,22 -38,22"
            fill="#0f766e"
            stroke="#115e59"
            strokeWidth="1.2"
          />
          {/* Mat alignment stripe */}
          <line x1="0" y1="8" x2="8" y2="20" stroke="#2dd4bf" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Balinese Outdoor Pyramid Lounge Beanbag */}
          <path
            d={`
              M -42 6 
              C -48 -20, -18 -68, -8 -72 
              C 2 -72, 38 -25, 42 6 
              C 38 16, -38 16, -42 6 
              Z
            `}
            fill="url(#beanbag-grad)"
            stroke="#081c15"
            strokeWidth="2"
          />

          {/* Beanbag Fabric Slump Wrinkles & Piping Seam */}
          <path d="M -8 -72 Q -12 -28 -18 10" stroke="#52b788" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M -8 -72 Q 10 -25 18 10" stroke="#52b788" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M -24 -20 Q -5 -8 20 -20" stroke="#081c15" strokeWidth="1.5" fill="none" opacity="0.5" />

          {/* Top handle strap */}
          <path d="M -12 -72 Q -8 -80 -4 -72" stroke="#552c0e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* 4. GARAGE GEAR SHELF (zone-garage: Far Right, X: 935, Floor Y: 485) */}
      {lifestyleId === 'garage-shelf' && (
        <g id="lifestyle-garage" transform="translate(935, 485)">
          {isSelected && (
            <rect
              x="-35"
              y="-155"
              width="70"
              height="165"
              rx="6"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Floor Shadow */}
          <ellipse cx="0" cy="8" rx="34" ry="10" fill="url(#lifestyle-shadow)" />

          {/* 4-Tier Heavy-Duty Metal Frame Shelf */}
          <rect x="-30" y="-150" width="4" height="155" rx="1" fill="#0f172a" />
          <rect x="26" y="-150" width="4" height="155" rx="1" fill="#0f172a" />

          {/* Cross brace wire on back */}
          <line x1="-30" y1="-140" x2="26" y2="-20" stroke="#334155" strokeWidth="1" />
          <line x1="26" y1="-140" x2="-30" y2="-20" stroke="#334155" strokeWidth="1" />

          {/* Tier 1 (Top Shelf) */}
          <polygon points="-32,-140 32,-140 34,-135 -34,-135" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Surf wax circular pucks */}
          <ellipse cx="-16" cy="-142" rx="7" ry="2.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="2" cy="-142" rx="7" ry="2.5" fill="#f43f5e" stroke="#e11d48" strokeWidth="0.8" />
          <text x="-21" y="-140" fontSize="3" fill="#854d0e" fontWeight="bold">WAX</text>

          {/* Tier 2 */}
          <polygon points="-32,-98 32,-98 34,-93 -34,-93" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Spare FCS Thruster Fins */}
          <polygon points="-18,-98 -14,-112 -10,-98" fill="#38bdf8" />
          <polygon points="-8,-98 -4,-112 0,-98" fill="#38bdf8" />
          <polygon points="2,-98 6,-112 10,-98" fill="#38bdf8" />

          {/* Tier 3 */}
          <polygon points="-32,-56 32,-56 34,-51 -34,-51" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Villa Nomad Toolkit Case */}
          <rect x="-24" y="-72" width="28" height="16" rx="2" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" />
          <rect x="-14" y="-75" width="8" height="3" rx="1" fill="#0f172a" />
          <text x="-20" y="-62" fontSize="4" fill="#ffffff" fontWeight="bold">TOOLKIT</text>

          {/* Tier 4 (Bottom Shelf) */}
          <polygon points="-32,-14 32,-14 34,-9 -34,-9" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Heavy storage crate */}
          <rect x="-26" y="-34" width="52" height="20" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <line x1="-22" y1="-24" x2="22" y2="-24" stroke="#475569" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};

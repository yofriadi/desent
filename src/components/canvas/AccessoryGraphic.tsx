import React from 'react';
import { AccessoryId, DeskHeight, LightingMode } from '@/types/workspace';

interface AccessoryGraphicProps {
  accessoryId: AccessoryId;
  deskHeight: DeskHeight;
  lightingMode: LightingMode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const AccessoryGraphic: React.FC<AccessoryGraphicProps> = ({
  accessoryId,
  deskHeight,
  lightingMode,
  isSelected = false,
  onClick,
}) => {
  const isStanding = deskHeight === 'standing';
  const isSunset = lightingMode === 'sunset';
  // Desktop top Y is 265 standing, 325 sitting
  const deskTopY = isStanding ? 265 : 325;

  return (
    <g
      id={`accessory-${accessoryId}`}
      className="cursor-pointer transition-all duration-500 ease-in-out"
      onClick={onClick}
    >
      <defs>
        {/* Lamp Light Cone Gradient */}
        <radialGradient id="lamp-light-cone" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor={isSunset ? '#fbbf24' : '#fef08a'} stopOpacity={isSunset ? '0.75' : '0.45'} />
          <stop offset="50%" stopColor={isSunset ? '#f59e0b' : '#fef9c3'} stopOpacity={isSunset ? '0.35' : '0.18'} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Felt Mat Texture / Gradient */}
        <linearGradient id="felt-mat-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Terracotta Clay Pot Gradient */}
        <linearGradient id="terracotta-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c2410c" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="80%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>

        {/* Monstera Leaf Gradient */}
        <linearGradient id="monstera-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>

      {/* 1. TROPICAL DESK MONSTERA (slot-plant: Left desk surface, X: 320) */}
      {accessoryId === 'plant' && (
        <g id="item-plant" transform={`translate(325, ${deskTopY})`}>
          {/* SELECTION HIGHLIGHT */}
          {isSelected && (
            <ellipse
              cx="0"
              cy="-38"
              rx="38"
              ry="52"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Planter Drop Shadow on Desk */}
          <ellipse cx="2" cy="3" rx="20" ry="7" fill="#0f172a" opacity="0.35" />

          {/* Handcrafted Terracotta Pot */}
          <polygon points="-16,2 -11,20 11,20 16,2" fill="url(#terracotta-grad)" stroke="#7c2d12" strokeWidth="1" />
          {/* Pot Rim */}
          <ellipse cx="0" cy="2" rx="16" ry="5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          {/* Potting Soil */}
          <ellipse cx="0" cy="2" rx="13" ry="3.5" fill="#381b07" />

          {/* Tropical Monstera Deliciosa Leaves with fenestrations */}
          {/* Leaf 1 (Left arch) */}
          <g>
            <path
              d="M 0 0 Q -24 -20 -32 -48 C -30 -60, -12 -55, 0 -38 Z"
              fill="url(#monstera-grad)"
              stroke="#14532d"
              strokeWidth="0.8"
            />
            {/* Fenestration cuts */}
            <line x1="-12" y1="-32" x2="-24" y2="-38" stroke="#f8fafc" strokeWidth="1.2" opacity="0.3" />
            <line x1="-8" y1="-22" x2="-18" y2="-26" stroke="#f8fafc" strokeWidth="1.2" opacity="0.3" />
          </g>

          {/* Leaf 2 (Center high leaf) */}
          <g>
            <path
              d="M 0 0 Q 0 -35 8 -72 C 22 -75, 26 -52, 0 -32 Z"
              fill="url(#monstera-grad)"
              stroke="#14532d"
              strokeWidth="0.8"
            />
            <line x1="4" y1="-45" x2="16" y2="-55" stroke="#f8fafc" strokeWidth="1.2" opacity="0.3" />
            <line x1="2" y1="-35" x2="14" y2="-42" stroke="#f8fafc" strokeWidth="1.2" opacity="0.3" />
          </g>

          {/* Leaf 3 (Right outward leaf) */}
          <g>
            <path
              d="M 0 0 Q 18 -15 32 -36 C 35 -48, 20 -52, 0 -28 Z"
              fill="url(#monstera-grad)"
              stroke="#14532d"
              strokeWidth="0.8"
            />
            <line x1="12" y1="-26" x2="24" y2="-32" stroke="#f8fafc" strokeWidth="1.2" opacity="0.3" />
          </g>

          {/* Fresh new uncurling sprout */}
          <path d="M 0 0 Q -4 -18 -2 -34" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* 2. INPUT PERIPHERALS & FELT MAT (slot-peripherals: Center desk surface, X: 500) */}
      {accessoryId === 'peripherals' && (
        <g id="item-peripherals" transform={`translate(500, ${deskTopY + 4})`}>
          {/* SELECTION HIGHLIGHT */}
          {isSelected && (
            <rect
              x="-148"
              y="-10"
              width="296"
              height="40"
              rx="8"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Charcoal Felt Desk Mat */}
          <polygon
            points="-140,-6 140,-6 145,22 -145,22"
            fill="url(#felt-mat-grad)"
            stroke="#334155"
            strokeWidth="1.2"
          />
          {/* Mat edge stitching */}
          <polygon
            points="-137,-4 137,-4 142,20 -142,20"
            fill="none"
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="4 2"
          />

          {/* 75% Wireless Mechanical Keyboard (Left-center on mat) */}
          <g transform="translate(-40, 2)">
            {/* Keyboard Case */}
            <polygon
              points="-60,-4 35,-4 38,15 -62,15"
              fill="#090d16"
              stroke="#334155"
              strokeWidth="1"
            />
            {/* Retro Keycaps rows with slight RGB glow */}
            <g opacity="0.9">
              {/* Row 1 */}
              {[-52, -40, -28, -16, -4, 8, 20].map((kx) => (
                <rect key={kx} x={kx} y="-2" width="9" height="3" rx="0.8" fill="#e2e8f0" />
              ))}
              {/* Row 2 */}
              {[-53, -41, -29, -17, -5, 7, 19].map((kx) => (
                <rect key={kx} x={kx} y="2" width="9" height="3" rx="0.8" fill="#cbd5e1" />
              ))}
              {/* Row 3 Spacebar */}
              <rect x="-42" y="7" width="55" height="4" rx="1" fill="#38bdf8" />
              {/* Accent Enter key */}
              <rect x="18" y="6" width="12" height="5" rx="1" fill="#f43f5e" />
            </g>
          </g>

          {/* Precision Wireless Ergonomic Mouse (Right on mat) */}
          <g transform="translate(90, 8)">
            <ellipse cx="0" cy="0" rx="9" ry="14" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            {/* Mouse click button divider */}
            <line x1="0" y1="-12" x2="0" y2="-4" stroke="#64748b" strokeWidth="1" />
            {/* Metal scroll wheel */}
            <rect x="-1.5" y="-9" width="3" height="6" rx="1" fill="#38bdf8" />
          </g>
        </g>
      )}

      {/* 3. ARCHITECT LED TASK LAMP (slot-lamp: Right desk surface, X: 675) */}
      {accessoryId === 'lamp' && (
        <g id="item-lamp" transform={`translate(675, ${deskTopY})`}>
          {/* SELECTION HIGHLIGHT */}
          {isSelected && (
            <ellipse
              cx="-25"
              cy="-55"
              rx="45"
              ry="75"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* REALISTIC RADIAL LIGHT CONE ILLUMINATING DESK */}
          <polygon
            points="-38,-92 -170,18 40,18"
            fill="url(#lamp-light-cone)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Heavy Desk Clamp Base */}
          <rect x="-8" y="-4" width="16" height="12" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <circle cx="0" cy="1" r="3" fill="#cbd5e1" />

          {/* Lower Swing Arm (Angles back-left) */}
          <line x1="0" y1="-2" x2="-22" y2="-55" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="0" y1="-2" x2="-22" y2="-55" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

          {/* Articulated Tension Spring */}
          <circle cx="-22" cy="-55" r="4.5" fill="#f59e0b" stroke="#1e293b" strokeWidth="1.5" />

          {/* Upper Swing Arm (Angles forward toward desk center) */}
          <line x1="-22" y1="-55" x2="-38" y2="-92" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />

          {/* Conical Aluminum Lamp Shade */}
          <g transform="translate(-38, -92)">
            <circle cx="0" cy="0" r="4" fill="#f59e0b" stroke="#1e293b" strokeWidth="1" />
            {/* Conical shade */}
            <polygon
              points="-3,0 -20,16 6,16 3,0"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.2"
            />
            {/* Emitting bulb glow */}
            <ellipse
              cx="-7"
              cy="16"
              rx="13"
              ry="4"
              fill={isSunset ? '#fbbf24' : '#fef08a'}
              filter="url(#screen-glow)"
            />
          </g>
        </g>
      )}

      {/* 4. STUDIO WIRELESS ANC HEADSET & STAND (slot-headset: Far right desk edge, X: 715) */}
      {accessoryId === 'headset' && (
        <g id="item-headset" transform={`translate(715, ${deskTopY})`}>
          {/* SELECTION HIGHLIGHT */}
          {isSelected && (
            <ellipse
              cx="0"
              cy="-35"
              rx="24"
              ry="44"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
          )}

          {/* Headset Stand Base Shadow */}
          <ellipse cx="0" cy="2" rx="14" ry="5" fill="#0f172a" opacity="0.3" />

          {/* Aluminum Stand Base */}
          <ellipse cx="0" cy="1" rx="12" ry="4" fill="#64748b" stroke="#334155" strokeWidth="1" />
          {/* Vertical Aluminum Stem */}
          <line x1="0" y1="0" x2="0" y2="-62" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          {/* Top Cradle Arch */}
          <path d="M -12 -62 Q 0 -68 12 -62" stroke="#64748b" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Studio ANC Headphone Resting on Stand */}
          <g id="headphones">
            {/* Padded Headband */}
            <path
              d="M -16 -40 C -18 -68, 18 -68, 16 -40"
              stroke="#0f172a"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Memory Foam Headband Cushion Pad */}
            <path
              d="M -10 -64 Q 0 -67 10 -64"
              stroke="#334155"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Ear Cup */}
            <ellipse cx="-16" cy="-38" rx="7" ry="11" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <circle cx="-16" cy="-38" r="4" fill="#38bdf8" opacity="0.6" />

            {/* Right Ear Cup */}
            <ellipse cx="16" cy="-38" rx="7" ry="11" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <circle cx="16" cy="-38" r="4" fill="#38bdf8" opacity="0.6" />
          </g>
        </g>
      )}
    </g>
  );
};

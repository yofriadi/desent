import React from 'react';
import { DeskId, DeskHeight } from '@/types/workspace';

interface DeskGraphicProps {
  deskId: DeskId;
  deskHeight: DeskHeight;
  isSelected?: boolean;
  onClick?: () => void;
}

export const DeskGraphic: React.FC<DeskGraphicProps> = ({
  deskId,
  deskHeight,
  isSelected = false,
  onClick,
}) => {
  const isStanding = deskHeight === 'standing';

  // Desktop elevation coordinates
  // Sitting: Y = 325. Standing: Y = 265 (lifts up 60px)
  const topY = isStanding ? 265 : 325;
  const floorY = 490;
  const deskWidth = 460;
  const deskLeft = 270;
  const deskRight = deskLeft + deskWidth; // 730
  const topThickness = 22;

  return (
    <g
      id="desk-group"
      className="cursor-pointer transition-all duration-500 ease-in-out"
      onClick={onClick}
    >
      <defs>
        {/* Bamboo Gradient */}
        <linearGradient id="bamboo-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d5b88f" />
          <stop offset="25%" stopColor="#eedcb7" />
          <stop offset="50%" stopColor="#d9be95" />
          <stop offset="75%" stopColor="#eedcb7" />
          <stop offset="100%" stopColor="#cca97b" />
        </linearGradient>

        {/* Teak Wood Gradient */}
        <linearGradient id="teak-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6e3c15" />
          <stop offset="20%" stopColor="#8d4d1e" />
          <stop offset="45%" stopColor="#5d3211" />
          <stop offset="70%" stopColor="#9a5725" />
          <stop offset="100%" stopColor="#552c0e" />
        </linearGradient>

        {/* Minimalist White Oak Gradient */}
        <linearGradient id="oak-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="30%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Soft Floor Shadow */}
        <radialGradient id="desk-floor-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity={isStanding ? '0.22' : '0.4'} />
          <stop offset="70%" stopColor="#1e293b" stopOpacity={isStanding ? '0.08' : '0.15'} />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Desk Floor Shadow */}
      <ellipse
        cx="500"
        cy={floorY + 10}
        rx={deskWidth / 2 + 30}
        ry="24"
        fill="url(#desk-floor-shadow)"
        className="transition-all duration-500"
      />

      {/* SELECTION HIGHLIGHT RING */}
      {isSelected && (
        <rect
          x={deskLeft - 10}
          y={topY - 8}
          width={deskWidth + 20}
          height={floorY - topY + 28}
          rx="12"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
      )}

      {/* DESK LEGS & FRAMING */}
      {deskId === 'desk-bamboo' && (
        <g id="legs-bamboo">
          {/* Dual Motorized Telescopic Metal Columns (Matte Black) */}
          {/* Left Leg Column */}
          <g transform={`translate(${deskLeft + 50}, 0)`}>
            {/* Upper column (moves with top) */}
            <rect
              x="0"
              y={topY + topThickness}
              width="36"
              height={floorY - topY - topThickness - 20}
              rx="4"
              fill="#1e293b"
              className="transition-all duration-500"
            />
            {/* Telescopic collar joint */}
            <rect
              x="-2"
              y={topY + (floorY - topY) * 0.45}
              width="40"
              height="8"
              rx="2"
              fill="#475569"
              className="transition-all duration-500"
            />
            {/* Foot bracket */}
            <rect x="-18" y={floorY - 4} width="72" height="12" rx="4" fill="#0f172a" />
            <circle cx="-12" cy={floorY + 8} r="3" fill="#334155" />
            <circle cx="48" cy={floorY + 8} r="3" fill="#334155" />
          </g>

          {/* Right Leg Column */}
          <g transform={`translate(${deskRight - 86}, 0)`}>
            <rect
              x="0"
              y={topY + topThickness}
              width="36"
              height={floorY - topY - topThickness - 20}
              rx="4"
              fill="#1e293b"
              className="transition-all duration-500"
            />
            <rect
              x="-2"
              y={topY + (floorY - topY) * 0.45}
              width="40"
              height="8"
              rx="2"
              fill="#475569"
              className="transition-all duration-500"
            />
            <rect x="-18" y={floorY - 4} width="72" height="12" rx="4" fill="#0f172a" />
            <circle cx="-12" cy={floorY + 8} r="3" fill="#334155" />
            <circle cx="48" cy={floorY + 8} r="3" fill="#334155" />
          </g>

          {/* Under-desk Cable Management Tray & Motor Rail */}
          <rect
            x={deskLeft + 70}
            y={topY + topThickness + 2}
            width={deskWidth - 140}
            height="14"
            rx="3"
            fill="#334155"
            className="transition-all duration-500"
          />
        </g>
      )}

      {deskId === 'desk-teak' && (
        <g id="legs-teak">
          {/* Handcrafted Reclaimed Teak A-frame Legs with Mortise & Tenon Crossbeams */}
          {/* Left Leg A-Frame */}
          <g transform={`translate(${deskLeft + 45}, 0)`}>
            <polygon
              points={`0,${topY + topThickness} 32,${topY + topThickness} 44,${floorY} 8,${floorY}`}
              fill="#6e3c15"
              stroke="#451a03"
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            {/* Teak cross-brace */}
            <rect
              x="5"
              y={topY + (floorY - topY) * 0.55}
              width="26"
              height="10"
              rx="2"
              fill="#8d4d1e"
              className="transition-all duration-500"
            />
            {/* Foot pad */}
            <rect x="4" y={floorY} width="44" height="8" rx="2" fill="#3b1d11" />
          </g>

          {/* Right Leg A-Frame */}
          <g transform={`translate(${deskRight - 80}, 0)`}>
            <polygon
              points={`0,${topY + topThickness} 32,${topY + topThickness} 24,${floorY} -12,${floorY}`}
              fill="#6e3c15"
              stroke="#451a03"
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            <rect
              x="-6"
              y={topY + (floorY - topY) * 0.55}
              width="26"
              height="10"
              rx="2"
              fill="#8d4d1e"
              className="transition-all duration-500"
            />
            <rect x="-16" y={floorY} width="44" height="8" rx="2" fill="#3b1d11" />
          </g>

          {/* Solid teak stretcher beam across bottom */}
          <rect
            x={deskLeft + 70}
            y={floorY - 26}
            width={deskWidth - 140}
            height="10"
            rx="2"
            fill="#552c0e"
            stroke="#3b1d11"
            strokeWidth="1"
          />
        </g>
      )}

      {deskId === 'desk-minimalist' && (
        <g id="legs-minimalist">
          {/* Square Industrial Steel Loop Legs (Matte Powder-Coat Black) */}
          {/* Left O-Loop */}
          <g transform={`translate(${deskLeft + 40}, 0)`}>
            <rect
              x="0"
              y={topY + topThickness}
              width="24"
              height={floorY - topY - topThickness}
              fill="none"
              stroke="#0f172a"
              strokeWidth="12"
              className="transition-all duration-500"
            />
            <rect x="-4" y={floorY - 4} width="32" height="8" rx="2" fill="#334155" />
          </g>

          {/* Right O-Loop */}
          <g transform={`translate(${deskRight - 64}, 0)`}>
            <rect
              x="0"
              y={topY + topThickness}
              width="24"
              height={floorY - topY - topThickness}
              fill="none"
              stroke="#0f172a"
              strokeWidth="12"
              className="transition-all duration-500"
            />
            <rect x="-4" y={floorY - 4} width="32" height="8" rx="2" fill="#334155" />
          </g>

          {/* Minimalist Under-brace Bar */}
          <line
            x1={deskLeft + 52}
            y1={topY + topThickness + 6}
            x2={deskRight - 52}
            y2={topY + topThickness + 6}
            stroke="#0f172a"
            strokeWidth="8"
            className="transition-all duration-500"
          />
        </g>
      )}

      {/* DESKTOP SURFACE SLAB */}
      <g id="desktop-slab" className="transition-all duration-500">
        {/* Top surface perspective bevel */}
        <polygon
          points={`
            ${deskLeft + 18},${topY} 
            ${deskRight - 18},${topY} 
            ${deskRight},${topY + topThickness * 0.4} 
            ${deskLeft},${topY + topThickness * 0.4}
          `}
          fill={
            deskId === 'desk-bamboo'
              ? 'url(#bamboo-grad)'
              : deskId === 'desk-teak'
              ? 'url(#teak-grad)'
              : 'url(#oak-grad)'
          }
          stroke={
            deskId === 'desk-bamboo'
              ? '#b5976b'
              : deskId === 'desk-teak'
              ? '#451a03'
              : '#64748b'
          }
          strokeWidth="1"
        />

        {/* Front Edge of Desktop */}
        <rect
          x={deskLeft}
          y={topY + topThickness * 0.4}
          width={deskWidth}
          height={topThickness * 0.6}
          rx="2"
          fill={
            deskId === 'desk-bamboo'
              ? '#b49467'
              : deskId === 'desk-teak'
              ? '#552c0e'
              : '#475569'
          }
        />

        {/* Surface Accent Lines for wood texture */}
        {deskId === 'desk-bamboo' && (
          <g opacity="0.35">
            <line x1={deskLeft + 60} y1={topY + 3} x2={deskRight - 60} y2={topY + 3} stroke="#9e7b4e" strokeWidth="0.8" />
            <line x1={deskLeft + 90} y1={topY + 7} x2={deskRight - 100} y2={topY + 7} stroke="#9e7b4e" strokeWidth="0.8" />
          </g>
        )}
        {deskId === 'desk-teak' && (
          <g opacity="0.45">
            <path
              d={`M ${deskLeft + 50} ${topY + 4} Q ${deskLeft + 180} ${topY + 2} ${deskLeft + 320} ${topY + 5}`}
              stroke="#381b07"
              strokeWidth="1"
              fill="none"
            />
            <path
              d={`M ${deskLeft + 120} ${topY + 8} Q ${deskLeft + 260} ${topY + 6} ${deskRight - 80} ${topY + 7}`}
              stroke="#381b07"
              strokeWidth="1"
              fill="none"
            />
          </g>
        )}

        {/* Standing Desk Digital Handset Controller on right edge for bamboo desk */}
        {deskId === 'desk-bamboo' && (
          <g transform={`translate(${deskRight - 55}, ${topY + topThickness * 0.4})`}>
            <rect x="0" y="2" width="40" height="12" rx="2" fill="#0f172a" />
            <text x="6" y="10" fontSize="6" fontFamily="monospace" fill="#10b981" fontWeight="bold">
              {isStanding ? '108' : '072'}
            </text>
            <circle cx="28" cy="8" r="1.5" fill="#94a3b8" />
            <circle cx="34" cy="8" r="1.5" fill="#94a3b8" />
          </g>
        )}

        {/* Artisanal brass maker's plate for teak desk */}
        {deskId === 'desk-teak' && (
          <rect
            x={deskRight - 42}
            y={topY + topThickness * 0.4 + 3}
            width="28"
            height="5"
            rx="1"
            fill="#d97706"
            stroke="#92400e"
            strokeWidth="0.5"
          />
        )}
      </g>
    </g>
  );
};

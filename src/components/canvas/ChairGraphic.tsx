import React from 'react';
import { ChairId } from '@/types/workspace';

interface ChairGraphicProps {
  chairId: ChairId;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ChairGraphic: React.FC<ChairGraphicProps> = ({
  chairId,
  isSelected = false,
  onClick,
}) => {
  // Chair base center at X: 500, Floor Y: 535
  const cx = 500;
  const baseFloorY = 535;

  return (
    <g
      id="chair-group"
      className="cursor-pointer transition-all duration-300 ease-out"
      onClick={onClick}
    >
      <defs>
        {/* Soft Chair Cast Shadow */}
        <radialGradient id="chair-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.5" />
          <stop offset="65%" stopColor="#0f172a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        {/* Mesh pattern definition */}
        <pattern id="mesh-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.2" fill="#334155" />
          <rect x="0" y="0" width="6" height="6" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>

        {/* Cognac Leather Gradient */}
        <linearGradient id="leather-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="30%" stopColor="#b45309" />
          <stop offset="65%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="chrome-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Directional Floor Drop Shadow */}
      <ellipse
        cx={cx + 12}
        cy={baseFloorY + 12}
        rx="75"
        ry="22"
        fill="url(#chair-shadow)"
      />

      {/* SELECTION HIGHLIGHT */}
      {isSelected && (
        <ellipse
          cx={cx}
          cy={baseFloorY - 70}
          rx="70"
          ry="110"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
      )}

      {/* 5-STAR WHEELBASE & CASTERS (Shared structure, polished per chair) */}
      <g id="chair-wheelbase">
        {/* Central hydraulic cylinder column */}
        <rect
          x={cx - 7}
          y={baseFloorY - 55}
          width="14"
          height="50"
          rx="3"
          fill={chairId === 'chair-leather' ? 'url(#chrome-grad)' : '#1e293b'}
        />
        <rect
          x={cx - 5}
          y={baseFloorY - 40}
          width="10"
          height="35"
          rx="2"
          fill={chairId === 'chair-leather' ? '#94a3b8' : '#334155'}
        />

        {/* 5 Caster Arms Star Base */}
        <polygon
          points={`
            ${cx},${baseFloorY - 10} 
            ${cx - 55},${baseFloorY + 6} 
            ${cx - 45},${baseFloorY + 12} 
            ${cx},${baseFloorY}
          `}
          fill={chairId === 'chair-leather' ? '#cbd5e1' : '#0f172a'}
        />
        <polygon
          points={`
            ${cx},${baseFloorY - 10} 
            ${cx + 55},${baseFloorY + 6} 
            ${cx + 45},${baseFloorY + 12} 
            ${cx},${baseFloorY}
          `}
          fill={chairId === 'chair-leather' ? '#cbd5e1' : '#0f172a'}
        />
        <polygon
          points={`
            ${cx},${baseFloorY - 10} 
            ${cx - 24},${baseFloorY + 18} 
            ${cx - 15},${baseFloorY + 20} 
            ${cx},${baseFloorY}
          `}
          fill={chairId === 'chair-leather' ? '#94a3b8' : '#1e293b'}
        />
        <polygon
          points={`
            ${cx},${baseFloorY - 10} 
            ${cx + 24},${baseFloorY + 18} 
            ${cx + 15},${baseFloorY + 20} 
            ${cx},${baseFloorY}
          `}
          fill={chairId === 'chair-leather' ? '#94a3b8' : '#1e293b'}
        />

        {/* Smooth-glide Casters */}
        <circle cx={cx - 52} cy={baseFloorY + 14} r="5" fill="#020617" />
        <circle cx={cx + 52} cy={baseFloorY + 14} r="5" fill="#020617" />
        <circle cx={cx - 20} cy={baseFloorY + 21} r="5" fill="#020617" />
        <circle cx={cx + 20} cy={baseFloorY + 21} r="5" fill="#020617" />
      </g>

      {/* CHAIR MODEL SPECIFIC BODIES */}

      {/* 1. ERGONOMIC BREATHABLE MESH PRO */}
      {chairId === 'chair-mesh' && (
        <g id="body-mesh">
          {/* Seat Cushion Foundation */}
          <path
            d={`
              M ${cx - 52} ${baseFloorY - 58} 
              Q ${cx} ${baseFloorY - 70} ${cx + 52} ${baseFloorY - 58} 
              Q ${cx + 48} ${baseFloorY - 42} ${cx} ${baseFloorY - 40} 
              Q ${cx - 48} ${baseFloorY - 42} ${cx - 52} ${baseFloorY - 58} 
              Z
            `}
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          {/* Waterfall Mesh Seat Surface */}
          <ellipse
            cx={cx}
            cy={baseFloorY - 52}
            rx="46"
            ry="14"
            fill="url(#mesh-pattern)"
          />

          {/* Dynamic Lumbar Support Spine */}
          <path
            d={`M ${cx} ${baseFloorY - 52} Q ${cx} ${baseFloorY - 95} ${cx} ${baseFloorY - 145}`}
            stroke="#334155"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Y-shaped lumbar brace */}
          <path
            d={`M ${cx - 32} ${baseFloorY - 95} Q ${cx} ${baseFloorY - 105} ${cx + 32} ${baseFloorY - 95}`}
            stroke="#1e293b"
            strokeWidth="6"
            fill="none"
          />

          {/* Mesh Backrest Outer Ergonomic Frame */}
          <path
            d={`
              M ${cx - 44} ${baseFloorY - 65} 
              C ${cx - 48} ${baseFloorY - 110}, ${cx - 42} ${baseFloorY - 145}, ${cx - 26} ${baseFloorY - 160} 
              C ${cx - 10} ${baseFloorY - 166}, ${cx + 10} ${baseFloorY - 166}, ${cx + 26} ${baseFloorY - 160} 
              C ${cx + 42} ${baseFloorY - 145}, ${cx + 48} ${baseFloorY - 110}, ${cx + 44} ${baseFloorY - 65} 
              Z
            `}
            fill="none"
            stroke="#0f172a"
            strokeWidth="7"
          />
          {/* Breathable Mesh Membrane Back Panel */}
          <path
            d={`
              M ${cx - 40} ${baseFloorY - 68} 
              C ${cx - 44} ${baseFloorY - 110}, ${cx - 38} ${baseFloorY - 142}, ${cx - 24} ${baseFloorY - 156} 
              C ${cx - 8} ${baseFloorY - 162}, ${cx + 8} ${baseFloorY - 162}, ${cx + 24} ${baseFloorY - 156} 
              C ${cx + 38} ${baseFloorY - 142}, ${cx + 44} ${baseFloorY - 110}, ${cx + 40} ${baseFloorY - 68} 
              Z
            `}
            fill="url(#mesh-pattern)"
            opacity="0.9"
          />

          {/* Adjustable 3D Armrests */}
          {/* Left Armrest */}
          <path
            d={`M ${cx - 45} ${baseFloorY - 50} L ${cx - 54} ${baseFloorY - 82}`}
            stroke="#1e293b"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect x={cx - 64} y={baseFloorY - 90} width="22" height="9" rx="4" fill="#0f172a" />

          {/* Right Armrest */}
          <path
            d={`M ${cx + 45} ${baseFloorY - 50} L ${cx + 54} ${baseFloorY - 82}`}
            stroke="#1e293b"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect x={cx + 42} y={baseFloorY - 90} width="22" height="9" rx="4" fill="#0f172a" />
        </g>
      )}

      {/* 2. EXECUTIVE VEGAN LEATHER SWIVEL */}
      {chairId === 'chair-leather' && (
        <g id="body-leather">
          {/* Plush Ribbed Leather Seat */}
          <ellipse
            cx={cx}
            cy={baseFloorY - 52}
            rx="50"
            ry="18"
            fill="url(#leather-grad)"
            stroke="#5d2a09"
            strokeWidth="2"
          />
          {/* Leather stitching seams */}
          <line x1={cx - 35} y1={baseFloorY - 52} x2={cx + 35} y2={baseFloorY - 52} stroke="#3b1d11" strokeWidth="1" strokeDasharray="3 2" />

          {/* High-back Padded Leather Backrest */}
          <path
            d={`
              M ${cx - 42} ${baseFloorY - 60} 
              C ${cx - 46} ${baseFloorY - 105}, ${cx - 44} ${baseFloorY - 145}, ${cx - 32} ${baseFloorY - 170} 
              C ${cx - 15} ${baseFloorY - 180}, ${cx + 15} ${baseFloorY - 180}, ${cx + 32} ${baseFloorY - 170} 
              C ${cx + 44} ${baseFloorY - 145}, ${cx + 46} ${baseFloorY - 105}, ${cx + 42} ${baseFloorY - 60} 
              Z
            `}
            fill="url(#leather-grad)"
            stroke="#451a03"
            strokeWidth="2.5"
          />

          {/* Horizontal Leather Bolster Ribs */}
          <path d={`M ${cx - 36} ${baseFloorY - 82} Q ${cx} ${baseFloorY - 88} ${cx + 36} ${baseFloorY - 82}`} stroke="#451a03" strokeWidth="2" fill="none" />
          <path d={`M ${cx - 34} ${baseFloorY - 110} Q ${cx} ${baseFloorY - 116} ${cx + 34} ${baseFloorY - 110}`} stroke="#451a03" strokeWidth="2" fill="none" />
          <path d={`M ${cx - 30} ${baseFloorY - 138} Q ${cx} ${baseFloorY - 144} ${cx + 30} ${baseFloorY - 138}`} stroke="#451a03" strokeWidth="2" fill="none" />

          {/* Integrated Plush Padded Headrest */}
          <rect
            x={cx - 24}
            y={baseFloorY - 178}
            width="48"
            height="20"
            rx="8"
            fill="#9a4713"
            stroke="#451a03"
            strokeWidth="1.5"
          />

          {/* Polished Chrome Loop Armrests */}
          <path
            d={`
              M ${cx - 42} ${baseFloorY - 50} 
              C ${cx - 62} ${baseFloorY - 55}, ${cx - 66} ${baseFloorY - 95}, ${cx - 40} ${baseFloorY - 98}
            `}
            stroke="url(#chrome-grad)"
            strokeWidth="5"
            fill="none"
          />
          <path
            d={`
              M ${cx + 42} ${baseFloorY - 50} 
              C ${cx + 62} ${baseFloorY - 55}, ${cx + 66} ${baseFloorY - 95}, ${cx + 40} ${baseFloorY - 98}
            `}
            stroke="url(#chrome-grad)"
            strokeWidth="5"
            fill="none"
          />
        </g>
      )}

      {/* 3. ACTIVE ERGONOMIC SADDLE STOOL */}
      {chairId === 'chair-active' && (
        <g id="body-active">
          {/* Pneumatic Height Ring & Lever */}
          <ellipse cx={cx} cy={baseFloorY - 48} rx="18" ry="5" fill="#475569" />
          <line x1={cx + 10} y1={baseFloorY - 48} x2={cx + 30} y2={baseFloorY - 46} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <circle cx={cx + 30} cy={baseFloorY - 46} r="4" fill="#059669" />

          {/* Ergonomic Contoured Split-Saddle Cushion (Tropical Jungle Emerald / Slate) */}
          {/* Left Saddle lobe */}
          <ellipse
            cx={cx - 16}
            cy={baseFloorY - 60}
            rx="20"
            ry="14"
            transform={`rotate(-12 ${cx - 16} ${baseFloorY - 60})`}
            fill="#1b4332"
            stroke="#081c15"
            strokeWidth="1.5"
          />
          {/* Right Saddle lobe */}
          <ellipse
            cx={cx + 16}
            cy={baseFloorY - 60}
            rx="20"
            ry="14"
            transform={`rotate(12 ${cx + 16} ${baseFloorY - 60})`}
            fill="#2d6a4f"
            stroke="#081c15"
            strokeWidth="1.5"
          />
          {/* Center Pommel Bridge */}
          <ellipse
            cx={cx}
            cy={baseFloorY - 65}
            rx="12"
            ry="10"
            fill="#40916c"
            stroke="#1b4332"
            strokeWidth="1.5"
          />
        </g>
      )}
    </g>
  );
};

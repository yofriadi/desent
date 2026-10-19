import React from 'react';
import { LightingMode } from '@/types/workspace';

interface RoomBackgroundProps {
  lightingMode: LightingMode;
}

export const RoomBackground: React.FC<RoomBackgroundProps> = ({ lightingMode }) => {
  const isSunset = lightingMode === 'sunset';

  return (
    <g className="transition-all duration-700 ease-in-out">
      <defs>
        {/* Daylight Room Gradients */}
        <linearGradient id="wall-grad-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="wall-grad-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#fdba74" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.25" />
        </linearGradient>

        {/* Floor Gradients */}
        <linearGradient id="floor-grad-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2d9cc" />
          <stop offset="100%" stopColor="#cfc1af" />
        </linearGradient>

        <linearGradient id="floor-grad-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.65" />
        </linearGradient>

        {/* Outdoor Sky Gradient */}
        <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="70%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>

        <linearGradient id="sky-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="80%" stopColor="#831843" />
          <stop offset="100%" stopColor="#311042" />
        </linearGradient>

        {/* Sunbeam Gradient */}
        <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isSunset ? '#fbbf24' : '#ffffff'} stopOpacity={isSunset ? '0.35' : '0.2'} />
          <stop offset="100%" stopColor={isSunset ? '#f97316' : '#ffffff'} stopOpacity="0" />
        </linearGradient>

        {/* Filter for glowing elements */}
        <filter id="canvas-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="lamp-cone-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Main Back Wall */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="430"
        fill={isSunset ? 'url(#wall-grad-sunset)' : 'url(#wall-grad-day)'}
      />

      {/* Modern Villa Baseboard Line */}
      <line
        x1="0"
        y1="430"
        x2="1000"
        y2="430"
        stroke={isSunset ? '#78350f' : '#cbd5e1'}
        strokeWidth="3"
      />

      {/* Large Floor-to-Ceiling Balinese Villa Window (Stage Center-Left) */}
      <g id="villa-window">
        {/* Window Opening */}
        <rect
          x="120"
          y="35"
          width="360"
          height="340"
          rx="6"
          fill={isSunset ? 'url(#sky-sunset)' : 'url(#sky-day)'}
        />

        {/* Balinese Outdoor Tropical Foliage / Palms visible through window */}
        <g opacity={isSunset ? '0.6' : '0.85'}>
          {/* Distant Palm Fronds */}
          <path
            d="M 140 260 Q 180 180 230 160 Q 200 200 190 270 Z"
            fill={isSunset ? '#1c1917' : '#15803d'}
          />
          <path
            d="M 230 160 Q 280 140 340 150 Q 290 180 250 220 Z"
            fill={isSunset ? '#292524' : '#16a34a'}
          />
          <path
            d="M 230 160 Q 210 110 240 80 Q 250 120 250 170 Z"
            fill={isSunset ? '#1c1917' : '#14532d'}
          />
          <path
            d="M 230 160 Q 180 130 150 120 Q 180 160 210 180 Z"
            fill={isSunset ? '#292524' : '#22c55e'}
          />
          {/* Palm Trunk */}
          <path
            d="M 230 160 Q 220 280 210 375"
            stroke={isSunset ? '#1c1917' : '#854d0e'}
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Secondary lush banana leaf cluster */}
          <path
            d="M 370 375 Q 390 280 430 230 Q 450 300 410 375 Z"
            fill={isSunset ? '#1c1917' : '#166534'}
          />
          <path
            d="M 390 280 Q 460 260 470 290 Q 420 330 380 375 Z"
            fill={isSunset ? '#292524' : '#15803d'}
          />

          {/* Tropical Villa Balcony Teak Railing */}
          <line x1="120" y1="330" x2="480" y2="330" stroke={isSunset ? '#451a03' : '#a16207'} strokeWidth="4" />
          <line x1="120" y1="365" x2="480" y2="365" stroke={isSunset ? '#451a03' : '#a16207'} strokeWidth="3" />
          {[160, 210, 260, 310, 360, 410, 460].map((x) => (
            <line
              key={x}
              x1={x}
              y1="330"
              x2={x}
              y2="375"
              stroke={isSunset ? '#451a03' : '#a16207'}
              strokeWidth="2.5"
            />
          ))}
        </g>

        {/* Modern Black Steel Window Framing */}
        <rect
          x="120"
          y="35"
          width="360"
          height="340"
          rx="6"
          fill="none"
          stroke={isSunset ? '#374151' : '#1e293b'}
          strokeWidth="6"
        />
        {/* Window Mullions */}
        <line x1="300" y1="35" x2="300" y2="375" stroke={isSunset ? '#374151' : '#1e293b'} strokeWidth="4" />
        <line x1="120" y1="205" x2="480" y2="205" stroke={isSunset ? '#374151' : '#1e293b'} strokeWidth="4" />

        {/* Glass Reflection Highlight */}
        <polygon
          points="130,45 280,45 160,365 130,365"
          fill="#ffffff"
          opacity={isSunset ? '0.08' : '0.14'}
        />
      </g>

      {/* Diagonal Ambient Sunbeam from Window onto Floor */}
      <polygon
        points="120,200 480,375 750,640 220,640"
        fill="url(#sunbeam)"
      />

      {/* Parquet / Teak Floor Planks */}
      <g id="villa-floor">
        <rect
          x="0"
          y="430"
          width="1000"
          height="210"
          fill={isSunset ? '#3b1d11' : '#f1ede6'}
        />
        {/* Floor overlay for warmth */}
        <rect
          x="0"
          y="430"
          width="1000"
          height="210"
          fill={isSunset ? 'url(#floor-grad-sunset)' : 'url(#floor-grad-day)'}
          opacity="0.85"
        />

        {/* Floor Plank Seams with Perspective */}
        <g stroke={isSunset ? '#26120b' : '#dfd7ca'} strokeWidth="1.5" opacity="0.8">
          <line x1="0" y1="470" x2="1000" y2="470" />
          <line x1="0" y1="515" x2="1000" y2="515" />
          <line x1="0" y1="565" x2="1000" y2="565" />
          <line x1="0" y1="620" x2="1000" y2="620" />

          {/* Staggered vertical plank lines */}
          <line x1="180" y1="430" x2="180" y2="470" />
          <line x1="420" y1="430" x2="420" y2="470" />
          <line x1="680" y1="430" x2="680" y2="470" />
          <line x1="890" y1="430" x2="890" y2="470" />

          <line x1="80" y1="470" x2="80" y2="515" />
          <line x1="310" y1="470" x2="310" y2="515" />
          <line x1="560" y1="470" x2="560" y2="515" />
          <line x1="820" y1="470" x2="820" y2="515" />

          <line x1="210" y1="515" x2="210" y2="565" />
          <line x1="460" y1="515" x2="460" y2="565" />
          <line x1="720" y1="515" x2="720" y2="565" />
          <line x1="940" y1="515" x2="940" y2="565" />

          <line x1="120" y1="565" x2="120" y2="620" />
          <line x1="380" y1="565" x2="380" y2="620" />
          <line x1="630" y1="565" x2="630" y2="620" />
          <line x1="870" y1="565" x2="870" y2="620" />
        </g>
      </g>

      {/* Decorative Wall Art / Acoustic Wood Slats (Stage Right Wall) */}
      <g id="acoustic-slats" opacity="0.65">
        {[680, 710, 740, 770, 800, 830, 860].map((x) => (
          <rect
            key={x}
            x={x}
            y="70"
            width="14"
            height="270"
            rx="2"
            fill={isSunset ? '#78350f' : '#b47a46'}
            stroke={isSunset ? '#451a03' : '#854d0e'}
            strokeWidth="0.5"
          />
        ))}
      </g>
    </g>
  );
};

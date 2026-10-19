import React, { useState } from 'react';

interface HotspotMarkerProps {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  price?: string;
  onClick: () => void;
  accentColor?: string;
}

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({
  x,
  y,
  label,
  sublabel,
  price,
  onClick,
  accentColor = '#10b981',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer select-none"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Pulsating Ripple Rings */}
      <circle
        cx="0"
        cy="0"
        r="14"
        fill={accentColor}
        opacity="0.25"
        className="animate-ping"
      />
      <circle
        cx="0"
        cy="0"
        r="11"
        fill={accentColor}
        opacity="0.3"
      />

      {/* Main Center Button Disc */}
      <circle
        cx="0"
        cy="0"
        r="8"
        fill="#0f172a"
        stroke={accentColor}
        strokeWidth="2"
      />

      {/* Plus Icon (+) */}
      <path
        d="M -3 0 L 3 0 M 0 -3 L 0 3"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Persistent Compact Badge (Always visible or prominent on hover) */}
      <g
        transform={`translate(14, -10) scale(${isHovered ? 1.05 : 1})`}
        className="transition-transform duration-200"
      >
        {/* Badge Background Capsule */}
        <rect
          x="0"
          y="-3"
          width={label.length * 5.6 + (price ? price.length * 5 + 16 : 14)}
          height="18"
          rx="9"
          fill="#0f172a"
          stroke={accentColor}
          strokeWidth="1"
          opacity={isHovered ? '0.98' : '0.88'}
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
        />

        {/* Action Label */}
        <text
          x="8"
          y="9"
          fontSize="8"
          fill="#ffffff"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {label}
        </text>

        {/* Price Tag if provided */}
        {price && (
          <text
            x={label.length * 5.6 + 10}
            y="9"
            fontSize="7.5"
            fill="#34d399"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {price}
          </text>
        )}
      </g>

      {/* Detailed Hover Card with sublabel */}
      {isHovered && sublabel && (
        <g transform="translate(-50, -42)">
          <rect
            x="0"
            y="0"
            width="100"
            height="22"
            rx="4"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="0.8"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
          <text
            x="50"
            y="14"
            fontSize="6.5"
            fill="#cbd5e1"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {sublabel}
          </text>
        </g>
      )}
    </g>
  );
};

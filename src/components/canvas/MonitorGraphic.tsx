import React from 'react';
import { MonitorId, DeskHeight } from '@/types/workspace';

interface MonitorGraphicProps {
  monitorId: MonitorId;
  deskHeight: DeskHeight;
  isSelected?: boolean;
  onClick?: () => void;
}

export const MonitorGraphic: React.FC<MonitorGraphicProps> = ({
  monitorId,
  deskHeight,
  isSelected = false,
  onClick,
}) => {
  const isStanding = deskHeight === 'standing';
  // Desktop top Y is 265 standing, 325 sitting
  const deskTopY = isStanding ? 265 : 325;
  const cx = 500;

  return (
    <g
      id="monitor-group"
      className="cursor-pointer transition-all duration-500 ease-in-out"
      onClick={onClick}
    >
      <defs>
        {/* Screen Ambient Bloom Glow */}
        <filter id="screen-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Screen Background Gradient */}
        <linearGradient id="ide-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="arm-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* SELECTION HIGHLIGHT */}
      {isSelected && (
        <rect
          x={monitorId === 'dual-4k' ? 310 : monitorId === 'ultrawide-curved' ? 320 : 380}
          y={deskTopY - 180}
          width={monitorId === 'dual-4k' ? 380 : monitorId === 'ultrawide-curved' ? 360 : 240}
          height={185}
          rx="12"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-pulse"
        />
      )}

      {/* HEAVY-DUTY DESK ARM CLAMP & ARTICULATING STEM */}
      <g id="monitor-arm">
        {/* Clamp Bracket on rear edge of desk */}
        <rect
          x={cx - 14}
          y={deskTopY - 8}
          width="28"
          height="14"
          rx="3"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1"
        />
        {/* Heavy-duty vertical post */}
        <rect
          x={cx - 7}
          y={deskTopY - 65}
          width="14"
          height="60"
          rx="3"
          fill="url(#arm-metal)"
        />

        {/* Gas-spring articulating dual elbow joint */}
        {monitorId === 'dual-4k' ? (
          <g>
            {/* Left cross-arm */}
            <path
              d={`M ${cx} ${deskTopY - 50} Q ${cx - 40} ${deskTopY - 70} ${cx - 90} ${deskTopY - 70}`}
              stroke="#1e293b"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right cross-arm */}
            <path
              d={`M ${cx} ${deskTopY - 50} Q ${cx + 40} ${deskTopY - 70} ${cx + 90} ${deskTopY - 70}`}
              stroke="#1e293b"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : (
          <path
            d={`M ${cx} ${deskTopY - 50} L ${cx} ${deskTopY - 80}`}
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        )}
      </g>

      {/* 1. SINGLE 27" 4K IPS DISPLAY */}
      {monitorId === 'single-4k' && (
        <g id="screen-single-4k" transform={`translate(${cx}, ${deskTopY - 85})`}>
          {/* Outer Bezel (27" 16:9 proportion, 210 x 125 px) */}
          <rect
            x="-105"
            y="-125"
            width="210"
            height="125"
            rx="5"
            fill="#090d16"
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Active Screen Display with Glowing Code / Nomad Metrics */}
          <rect
            x="-101"
            y="-121"
            width="202"
            height="115"
            rx="3"
            fill="url(#ide-bg)"
            filter="url(#screen-glow)"
          />

          {/* Screen UI - Code Editor Syntax Highlighting & Cards */}
          <g transform="translate(-95, -114)">
            {/* Window title dots */}
            <circle cx="5" cy="4" r="2.2" fill="#ef4444" />
            <circle cx="12" cy="4" r="2.2" fill="#eab308" />
            <circle cx="19" cy="4" r="2.2" fill="#22c55e" />

            {/* Code syntax lines */}
            <rect x="5" y="14" width="40" height="3" rx="1.5" fill="#38bdf8" />
            <rect x="50" y="14" width="25" height="3" rx="1.5" fill="#f43f5e" />
            <rect x="80" y="14" width="55" height="3" rx="1.5" fill="#a855f7" />

            <rect x="12" y="22" width="60" height="3" rx="1.5" fill="#10b981" />
            <rect x="76" y="22" width="30" height="3" rx="1.5" fill="#f59e0b" />

            <rect x="20" y="30" width="75" height="3" rx="1.5" fill="#38bdf8" />
            <rect x="100" y="30" width="40" height="3" rx="1.5" fill="#f43f5e" />

            <rect x="20" y="38" width="50" height="3" rx="1.5" fill="#e2e8f0" />
            <rect x="75" y="38" width="35" height="3" rx="1.5" fill="#10b981" />

            <rect x="12" y="46" width="35" height="3" rx="1.5" fill="#a855f7" />
            <rect x="5" y="54" width="20" height="3" rx="1.5" fill="#38bdf8" />

            {/* Live Nomad Metrics / Bali Villa Weather Card */}
            <rect x="120" y="60" width="65" height="42" rx="4" fill="#1e293b" opacity="0.9" />
            <text x="125" y="72" fontSize="5.5" fill="#94a3b8" fontFamily="sans-serif">BALI COWORKING</text>
            <text x="125" y="83" fontSize="8" fill="#34d399" fontWeight="bold" fontFamily="sans-serif">28°C • 480 Mbps</text>
            <rect x="125" y="89" width="40" height="3" rx="1.5" fill="#10b981" />
          </g>

          {/* Bottom Bezel Power LED */}
          <circle cx="0" cy="-2" r="1.5" fill="#34d399" />
        </g>
      )}

      {/* 2. DUAL 27" 4K PRO ARRAY */}
      {monitorId === 'dual-4k' && (
        <g id="screen-dual-4k">
          {/* Left Screen (Angled inward) */}
          <g transform={`translate(${cx - 96}, ${deskTopY - 85}) rotate(3)`}>
            <rect
              x="-88"
              y="-120"
              width="176"
              height="115"
              rx="4"
              fill="#090d16"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <rect
              x="-84"
              y="-116"
              width="168"
              height="105"
              rx="2.5"
              fill="url(#ide-bg)"
              filter="url(#screen-glow)"
            />
            {/* Left Screen Code Editor UI */}
            <g transform="translate(-78, -110)">
              <circle cx="4" cy="4" r="2" fill="#ef4444" />
              <circle cx="10" cy="4" r="2" fill="#eab308" />
              <circle cx="16" cy="4" r="2" fill="#22c55e" />
              {/* Code lines */}
              <rect x="4" y="14" width="35" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="44" y="14" width="22" height="3" rx="1.5" fill="#f43f5e" />
              <rect x="70" y="14" width="45" height="3" rx="1.5" fill="#a855f7" />

              <rect x="12" y="22" width="55" height="3" rx="1.5" fill="#10b981" />
              <rect x="72" y="22" width="25" height="3" rx="1.5" fill="#f59e0b" />

              <rect x="20" y="30" width="70" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="94" y="30" width="30" height="3" rx="1.5" fill="#f43f5e" />

              <rect x="20" y="38" width="40" height="3" rx="1.5" fill="#e2e8f0" />
              <rect x="65" y="38" width="50" height="3" rx="1.5" fill="#10b981" />

              <rect x="12" y="46" width="30" height="3" rx="1.5" fill="#a855f7" />
              <rect x="4" y="54" width="85" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="12" y="62" width="60" height="3" rx="1.5" fill="#10b981" />
              <rect x="12" y="70" width="45" height="3" rx="1.5" fill="#f59e0b" />
            </g>
            <circle cx="0" cy="-3" r="1.5" fill="#34d399" />
          </g>

          {/* Right Screen (Angled inward) */}
          <g transform={`translate(${cx + 96}, ${deskTopY - 85}) rotate(-3)`}>
            <rect
              x="-88"
              y="-120"
              width="176"
              height="115"
              rx="4"
              fill="#090d16"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <rect
              x="-84"
              y="-116"
              width="168"
              height="105"
              rx="2.5"
              fill="url(#ide-bg)"
              filter="url(#screen-glow)"
            />
            {/* Right Screen Preview Browser & Metrics UI */}
            <g transform="translate(-78, -110)">
              {/* Browser navigation bar */}
              <rect x="0" y="0" width="156" height="10" rx="3" fill="#1e293b" />
              <rect x="25" y="2.5" width="105" height="5" rx="2" fill="#0f172a" />
              <text x="32" y="6.5" fontSize="4" fill="#94a3b8" fontFamily="sans-serif">https://monis.rent/dashboard</text>

              {/* Chart / Stats cards */}
              <rect x="4" y="16" width="70" height="36" rx="3" fill="#1e293b" />
              <text x="8" y="26" fontSize="5" fill="#38bdf8" fontWeight="bold">REVENUE MRR</text>
              <path d="M 8 44 Q 25 32 42 38 T 70 24" stroke="#10b981" strokeWidth="2" fill="none" />

              <rect x="80" y="16" width="70" height="36" rx="3" fill="#1e293b" />
              <text x="84" y="26" fontSize="5" fill="#f59e0b" fontWeight="bold">SERVER LATENCY</text>
              <path d="M 84 38 Q 100 44 116 32 T 146 36" stroke="#f43f5e" strokeWidth="2" fill="none" />

              {/* Nomad Villa Tasks List */}
              <rect x="4" y="58" width="146" height="32" rx="3" fill="#1e293b" />
              <circle cx="12" cy="68" r="3" fill="#10b981" />
              <text x="20" y="70" fontSize="5" fill="#f1f5f9">Deploy Next.js App Router to Vercel Edge</text>
              <circle cx="12" cy="78" r="3" fill="#38bdf8" />
              <text x="20" y="80" fontSize="5" fill="#f1f5f9">Surf Session @ Echo Beach (16:30)</text>
            </g>
            <circle cx="0" cy="-3" r="1.5" fill="#34d399" />
          </g>
        </g>
      )}

      {/* 3. 34" CURVED ULTRAWIDE 144Hz */}
      {monitorId === 'ultrawide-curved' && (
        <g id="screen-ultrawide" transform={`translate(${cx}, ${deskTopY - 88})`}>
          {/* Panoramic Curved Bezel (Sweeping 1500R) */}
          <path
            d={`
              M -160 -125 
              Q 0 -130 160 -125 
              L 165 -6 
              Q 0 -2 -165 -6 
              Z
            `}
            fill="#090d16"
            stroke="#1e293b"
            strokeWidth="3.5"
          />

          {/* Curved Screen Display Glass */}
          <path
            d={`
              M -156 -121 
              Q 0 -126 156 -121 
              L 160 -10 
              Q 0 -6 -160 -10 
              Z
            `}
            fill="url(#ide-bg)"
            filter="url(#screen-glow)"
          />

          {/* Ultrawide 3-Column Productivity Layout */}
          <g transform="translate(-150, -115)">
            {/* Window title bar */}
            <circle cx="5" cy="4" r="2.2" fill="#ef4444" />
            <circle cx="12" cy="4" r="2.2" fill="#eab308" />
            <circle cx="19" cy="4" r="2.2" fill="#22c55e" />

            {/* Column 1: File Tree & Editor */}
            <g transform="translate(0, 14)">
              <rect x="5" y="0" width="30" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="12" y="8" width="45" height="3" rx="1.5" fill="#10b981" />
              <rect x="20" y="16" width="60" height="3" rx="1.5" fill="#a855f7" />
              <rect x="20" y="24" width="40" height="3" rx="1.5" fill="#f59e0b" />
              <rect x="12" y="32" width="50" height="3" rx="1.5" fill="#e2e8f0" />
              <rect x="5" y="40" width="70" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="12" y="48" width="55" height="3" rx="1.5" fill="#10b981" />
              <rect x="20" y="56" width="45" height="3" rx="1.5" fill="#f43f5e" />
              <rect x="5" y="64" width="30" height="3" rx="1.5" fill="#a855f7" />
            </g>

            {/* Column Divider 1 */}
            <line x1="95" y1="10" x2="95" y2="95" stroke="#1e293b" strokeWidth="1.5" />

            {/* Column 2: Terminal / Build Output */}
            <g transform="translate(102, 14)">
              <rect x="0" y="0" width="90" height="80" rx="3" fill="#020617" opacity="0.8" />
              <text x="6" y="12" fontSize="5" fill="#10b981" fontFamily="monospace">$ pnpm build --turbo</text>
              <text x="6" y="22" fontSize="5" fill="#94a3b8" fontFamily="monospace">▲ Next.js 15.1.0</text>
              <text x="6" y="32" fontSize="5" fill="#38bdf8" fontFamily="monospace">✓ Compiled / in 180ms</text>
              <text x="6" y="42" fontSize="5" fill="#a855f7" fontFamily="monospace">✓ 26/26 tasks pass</text>
              <text x="6" y="52" fontSize="5" fill="#22c55e" fontFamily="monospace">Ready on http://localhost:3000</text>
              <rect x="6" y="60" width="5" height="7" fill="#34d399" className="animate-pulse" />
            </g>

            {/* Column Divider 2 */}
            <line x1="200" y1="10" x2="200" y2="95" stroke="#1e293b" strokeWidth="1.5" />

            {/* Column 3: Live Preview & Sound Wave */}
            <g transform="translate(208, 14)">
              <rect x="0" y="0" width="85" height="42" rx="3" fill="#1e293b" />
              <text x="6" y="12" fontSize="5.5" fill="#34d399" fontWeight="bold">DESENT WORKSPACE</text>
              <circle cx="12" cy="26" r="8" fill="#3b82f6" opacity="0.3" />
              <path d="M 6 26 Q 22 14 38 26 T 70 26" stroke="#38bdf8" strokeWidth="2" fill="none" />

              <rect x="0" y="48" width="85" height="32" rx="3" fill="#1e293b" />
              <text x="6" y="60" fontSize="5" fill="#fbbf24">LO-FI BALI CHILLOUT</text>
              {/* Audio visualizer bars */}
              {[6, 14, 22, 30, 38, 46, 54, 62, 70, 78].map((bx, i) => (
                <rect
                  key={bx}
                  x={bx}
                  y={66 + (i % 3) * 2}
                  width="4"
                  height={10 - (i % 4) * 2}
                  rx="1"
                  fill="#f59e0b"
                />
              ))}
            </g>
          </g>

          {/* Ultrawide Centered Status LED */}
          <circle cx="0" cy="-4" r="1.5" fill="#38bdf8" />
        </g>
      )}
    </g>
  );
};

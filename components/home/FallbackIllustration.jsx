import React from 'react';

export default function FallbackIllustration() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 border border-purple-100/40">
      <div className="animate-[float_6s_ease-in-out_infinite] flex flex-col items-center">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Bottom Book (Deep Purple/Indigo) */}
          <g filter="url(#shadow-bottom)">
            <path
              d="M40 160L160 190L200 160L80 130L40 160Z"
              fill="#5B3BE6"
            />
            <path
              d="M160 190V198L200 168V160L160 190Z"
              fill="#4328B8"
            />
            <path
              d="M40 160V168L160 198V190L40 160Z"
              fill="#4C2FB3"
            />
            <path
              d="M45 161L158 189L195 161L82 133L45 161Z"
              fill="#7456FF"
            />
            {/* Pages (White) */}
            <path
              d="M160 190.5L200 160.5V164.5L160 194.5V190.5Z"
              fill="#ECE9F2"
            />
            <path
              d="M75 161.5L160 190.5V194.5L75 165.5V161.5Z"
              fill="#FAF9FC"
            />
          </g>

          {/* Middle Book (Turquoise/Primary) */}
          <g filter="url(#shadow-middle)" transform="rotate(-6 120 120)">
            <path
              d="M50 110L170 140L210 110L90 80L50 110Z"
              fill="#00A694"
            />
            <path
              d="M170 140V148L210 118V110L170 140Z"
              fill="#007D70"
            />
            <path
              d="M50 110V118L170 148V140L50 110Z"
              fill="#008C7E"
            />
            <path
              d="M55 111L168 139L205 111L92 83L55 111Z"
              fill="#00D1BB"
            />
            {/* Pages (White) */}
            <path
              d="M170 140.5L210 110.5V114.5L170 144.5V140.5Z"
              fill="#ECE9F2"
            />
            <path
              d="M85 111.5L170 140.5V144.5L85 115.5V111.5Z"
              fill="#FAF9FC"
            />
          </g>

          {/* Top Book (Slate Blue/Theme Primary) */}
          <g filter="url(#shadow-top)" transform="rotate(8 120 80)">
            <path
              d="M60 65L180 95L220 65L100 35L60 65Z"
              fill="#2E5575"
            />
            <path
              d="M180 95V103L220 73V65L180 95Z"
              fill="#1C384F"
            />
            <path
              d="M60 65V73L180 103V95L60 65Z"
              fill="#244560"
            />
            <path
              d="M65 66L178 94L215 66L102 38L65 66Z"
              fill="#417094"
            />
            {/* Pages (White) */}
            <path
              d="M180 95.5L220 65.5V69.5L180 99.5V95.5Z"
              fill="#ECE9F2"
            />
            <path
              d="M95 66.5L180 95.5V99.5L95 70.5V66.5Z"
              fill="#FAF9FC"
            />
          </g>

          {/* Filters */}
          <defs>
            <filter id="shadow-bottom" x="20" y="115" width="200" height="110" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1a0b54" floodOpacity="0.25" />
            </filter>
            <filter id="shadow-middle" x="30" y="65" width="200" height="110" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#004d43" floodOpacity="0.25" />
            </filter>
            <filter id="shadow-top" x="40" y="20" width="200" height="110" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1c384f" floodOpacity="0.25" />
            </filter>
          </defs>
        </svg>

        {/* Glow behind fallback */}
        <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-purple-400/10 to-indigo-500/10 blur-3xl -z-10" />
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

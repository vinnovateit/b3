"use client";

export default function Ellipse({
  width = 200,
  height = 200,
  className = "",
}) {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2;
  const ry = height / 2;

  const green = "rgba(12, 172, 79, 1)";

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        {/* Gradient 1 */}
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="21%" stopColor={green} stopOpacity="0.5" />
          <stop offset="40%" stopColor={green} stopOpacity="0" />
        </linearGradient>

        {/* Gradient 2 */}
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="21%" stopColor={green} stopOpacity="0.5" />
          <stop offset="40%" stopColor={green} stopOpacity="0" />
        </linearGradient>

        {/* Gradient 3 */}
        <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="21%" stopColor={green} stopOpacity="0.5" />
          <stop offset="40%" stopColor={green} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Layer 1 */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        stroke="url(#g1)"
        strokeWidth={1.5}
        fill="none"
      />

      {/* Layer 2 */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        stroke="url(#g2)"
        strokeWidth={1.5}
        fill="none"
      />

      {/* Layer 3 */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        stroke="url(#g3)"
        strokeWidth={1.5}
        fill="none"
      />
    </svg>
  );
}


{/*"use client";

export default function Ellipse({ width = 200, height = 200, className = "" }) {
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
        <stop offset="21%" stop-color="rgba(12,172,79,1)" stop-opacity="0.5">
          <animate attributeName="offset" from="21%" to="10%" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="40%" stop-color="rgba(12,172,79,1)" stop-opacity="0">
          <animate attributeName="offset" from="40%" to="25%" dur="3s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      <filter id="blurStroke" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1" />
      </filter>

      <linearGradient id="blurMask" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-opacity="0" />
        <stop offset="25%" stop-opacity="0">
          <animate attributeName="offset" from="25%" to="15%" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="40%" stop-opacity="1">
          <animate attributeName="offset" from="40%" to="30%" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-opacity="1" />
      </linearGradient>

      <mask id="blurReveal">
        <rect width="100%" height="100%" fill="url(#blurMask)" />
      </mask>
    </defs>

    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2}" ry="${height / 2}"
      stroke="url(#g1)" stroke-width="1.5" fill="none" />

    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2}" ry="${height / 2}"
      stroke="rgba(12,172,79,1)" stroke-width="1.5" fill="none"
      filter="url(#blurStroke)" mask="url(#blurReveal)" />
  </svg>
  `;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
 */}
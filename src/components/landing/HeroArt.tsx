/**
 * Ilustração do topo — escudo de segurança sobre uma rede de nós, com um
 * radar varrendo. Vetor puro (leve, nítido em qualquer tela) e animado só
 * por CSS, respeitando prefers-reduced-motion via globals.css.
 */
export function HeroArt({ className }: { className?: string }) {
  const nodes: Array<[number, number, string]> = [
    [60, 90, "var(--magenta)"],
    [345, 70, "var(--purple)"],
    [40, 280, "var(--orange)"],
    [370, 300, "var(--magenta)"],
    [110, 380, "var(--green)"],
    [300, 395, "var(--purple)"],
    [205, 30, "var(--green)"],
  ];

  return (
    <svg
      viewBox="0 0 410 430"
      className={className}
      role="img"
      aria-label="Escudo de segurança cercado por uma rede de nós conectados e um radar de monitoramento"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2a2a" />
          <stop offset="100%" stopColor="#111821" />
        </linearGradient>
      </defs>

      <circle cx="205" cy="215" r="200" fill="url(#glow)" />

      {/* Anéis do radar */}
      {[70, 120, 170].map((r) => (
        <circle
          key={r}
          cx="205"
          cy="215"
          r={r}
          fill="none"
          stroke="#2e3a49"
          strokeDasharray={r === 170 ? "2 6" : undefined}
        />
      ))}
      <line x1="35" y1="215" x2="375" y2="215" stroke="#2e3a49" />
      <line x1="205" y1="45" x2="205" y2="385" stroke="#2e3a49" />

      {/* Varredura */}
      <g style={{ transformOrigin: "205px 215px", animation: "radar 6s linear infinite" }}>
        <path d="M205 215 L375 215 A170 170 0 0 0 325 95 Z" fill="url(#sweep)" />
      </g>

      {/* Conexões da rede */}
      <g stroke="#46566a" strokeWidth="1">
        {nodes.map(([x, y]) => (
          <line key={`l${x}`} x1={x} y1={y} x2="205" y2="215" strokeDasharray="3 5" />
        ))}
        <line x1="60" y1="90" x2="205" y2="30" />
        <line x1="345" y1="70" x2="205" y2="30" />
        <line x1="40" y1="280" x2="110" y2="380" />
        <line x1="370" y1="300" x2="300" y2="395" />
      </g>

      {nodes.map(([x, y, c], i) => (
        <g key={`n${x}`}>
          <circle cx={x} cy={y} r="11" fill="#0e1116" stroke={c} strokeWidth="1.5" />
          <circle
            cx={x}
            cy={y}
            r="4"
            fill={c}
            style={{ animation: `pulse-node 2.4s ease-in-out ${i * 0.35}s infinite` }}
          />
        </g>
      ))}

      {/* Escudo */}
      <path
        d="M205 120 L270 145 V210 C270 255 242 285 205 302 C168 285 140 255 140 210 V145 Z"
        fill="url(#shield)"
        stroke="#34d399"
        strokeWidth="2"
      />
      {/* Trilhas de circuito no escudo */}
      <g stroke="#34d399" strokeOpacity="0.45" strokeWidth="1.5" fill="none">
        <path d="M160 160 H180 V180" />
        <path d="M250 160 H230 V180" />
        <path d="M160 245 H182" />
        <path d="M250 245 H228" />
      </g>
      <g fill="#34d399" fillOpacity="0.7">
        <circle cx="180" cy="180" r="2.5" />
        <circle cx="230" cy="180" r="2.5" />
        <circle cx="182" cy="245" r="2.5" />
        <circle cx="228" cy="245" r="2.5" />
      </g>

      {/* Cadeado */}
      <rect x="183" y="200" width="44" height="36" rx="5" fill="#34d399" />
      <path
        d="M192 200 V190 A13 13 0 0 1 218 190 V200"
        fill="none"
        stroke="#34d399"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="205" cy="214" r="4.5" fill="#0e1116" />
      <rect x="203" y="216" width="4" height="10" rx="1.5" fill="#0e1116" />

      {/* Etiquetas */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#9aa7b6">
        <text x="22" y="62">AUTH.OK</text>
        <text x="312" y="44">AI.GOV</text>
        <text x="10" y="318">RISK.LOW</text>
        <text x="322" y="338">SLA 100%</text>
      </g>
    </svg>
  );
}

export default function CloudLensLogo({ size = 32 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Gradient definitions */}
            <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a5b4fc" />
                    <stop offset="100%" stopColor="#c4b5fd" />
                </linearGradient>
            </defs>

            {/* Background circle */}
            <rect width="40" height="40" rx="10" fill="url(#cloudGrad)" />

            {/* Cloud shape */}
            <path
                d="M12 24h14a5 5 0 10-1-9.9 6.5 6.5 0 00-12.2 2.5A4 4 0 0012 24z"
                fill="white"
                opacity="0.9"
            />

            {/* Lens / magnifying glass circle */}
            <circle
                cx="24"
                cy="22"
                r="5"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
            />
            {/* Lens handle */}
            <line
                x1="27.5"
                y1="25.5"
                x2="31"
                y2="29"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
            />
        </svg>
    );
}

// Mini YouTube and Instagram logos in brand colors, drawn from basic SVG
// shapes, so we don't need an icon library or image files
type SocialIconProps = {
  name: "youtube" | "instagram";
  className?: string; // size comes from the parent
};

export default function SocialIcon({ name, className }: SocialIconProps) {
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ff0000" />
        <path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="#ffffff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        {/* Instagram's yellow -> pink -> purple gradient, glowing from the
            bottom-left corner. userSpaceOnUse: one gradient across the whole
            icon, not a separate one for every shape. The id is fixed: every
            copy defines the same gradient, so it doesn't matter which one the
            browser picks. */}
        <radialGradient
          id="instagram-gradient"
          gradientUnits="userSpaceOnUse"
          cx="7"
          cy="26"
          r="31"
        >
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      {/* Camera outline painted with the gradient, no background square */}
      <g fill="none" stroke="url(#instagram-gradient)" strokeWidth="2.2">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.5" />
      </g>
      <circle cx="17.3" cy="6.7" r="1.3" fill="url(#instagram-gradient)" />
    </svg>
  );
}

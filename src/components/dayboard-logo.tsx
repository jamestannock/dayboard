type DayboardLogoProps = {
  className?: string;
  title?: string;
};

export function DayboardLogo({
  className = "h-9 w-9",
  title = "Dayboard",
}: DayboardLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <rect x="4" y="4" width="56" height="56" rx="18" fill="#020617" />
      <path
        d="M19 36.5C19 25.73 27.73 17 38.5 17H45V27.5C45 38.27 36.27 47 25.5 47H19V36.5Z"
        fill="#F59E0B"
      />
      <path
        d="M25 40.5C25 33.6 30.6 28 37.5 28H39V34.5C39 41.4 33.4 47 26.5 47H25V40.5Z"
        fill="#F8FAFC"
        fillOpacity="0.92"
      />
      <circle cx="41.5" cy="22.5" r="3.5" fill="#F8FAFC" fillOpacity="0.92" />
    </svg>
  );
}

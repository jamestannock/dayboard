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
      <rect x="4" y="4" width="56" height="56" rx="18" fill="var(--logo-shell)" />
      <rect x="16" y="14" width="32" height="38" rx="10" fill="var(--logo-page)" />
      <path
        d="M16 24C16 18.4772 20.4772 14 26 14H38C43.5228 14 48 18.4772 48 24V27H16V24Z"
        fill="var(--logo-accent)"
      />
      <circle cx="23" cy="21" r="2.5" fill="var(--logo-dot)" />
      <circle cx="41" cy="21" r="2.5" fill="var(--logo-dot)" />
      <rect x="22" y="33" width="20" height="3.5" rx="1.75" fill="var(--logo-line)" />
      <rect x="22" y="40" width="13" height="3.5" rx="1.75" fill="var(--logo-line)" />
      <circle cx="41.5" cy="41.75" r="4.5" fill="var(--logo-accent)" />
    </svg>
  );
}

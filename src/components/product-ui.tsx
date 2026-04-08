import type { ReactNode } from "react";

type Stat = {
  title: string;
  value: string;
  caption: string;
};

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

type SurfaceProps = {
  title?: string;
  subtitle?: string;
  aside?: ReactNode;
  children: ReactNode;
  dark?: boolean;
};

type ChartDatum = {
  label: string;
  value: number;
  valueLabel?: string;
  tone?: "slate" | "amber" | "emerald" | "rose";
};

type ScrollPaneProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function StatGrid({ items }: { items: Stat[] }) {
  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.75rem] border border-line bg-surface p-5 shadow-sm"
        >
          <p className="text-sm text-soft">{item.title}</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{item.value}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{item.caption}</p>
        </article>
      ))}
    </section>
  );
}

export function Surface({
  title,
  subtitle,
  aside,
  children,
  dark = false,
}: SurfaceProps) {
  const className = dark
    ? "rounded-[2rem] border border-line bg-ink p-6 text-on-dark shadow-sm"
    : "rounded-[2rem] border border-line bg-surface p-6 shadow-sm";

  return (
    <article className={className}>
      {title || subtitle || aside ? (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title ? (
              <h3 className={`text-2xl font-semibold ${dark ? "text-on-dark" : "text-ink"}`}>
                {title}
              </h3>
            ) : null}
            {subtitle ? (
              <p className={`mt-2 text-sm ${dark ? "text-on-dark-muted" : "text-soft"}`}>
                {subtitle}
              </p>
            ) : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      ) : null}
      <div className={title || subtitle || aside ? "mt-5" : ""}>{children}</div>
    </article>
  );
}

export function PillRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-ink-soft"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ScrollPane({ children, className = "" }: ScrollPaneProps) {
  return (
    <div
      className={`max-h-[28rem] overflow-y-auto pr-2 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function getChartTone(tone: ChartDatum["tone"]) {
  switch (tone) {
    case "amber":
      return "bg-accent-fill-soft";
    case "emerald":
      return "bg-success-fill";
    case "rose":
      return "bg-danger-soft";
    default:
      return "bg-ink";
  }
}

export function BarListChart({
  items,
  emptyMessage = "Nothing to chart yet.",
}: {
  items: ChartDatum[];
  emptyMessage?: string;
}) {
  const max = Math.max(...items.map((item) => item.value), 0);

  if (items.length === 0 || max <= 0) {
    return (
      <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const width = Math.max((item.value / max) * 100, 8);

        return (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-ink">{item.label}</span>
              <span className="text-soft">{item.valueLabel ?? item.value}</span>
            </div>
            <div className="h-3 rounded-full bg-surface-subtle">
              <div
                className={`h-3 rounded-full ${getChartTone(item.tone)}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

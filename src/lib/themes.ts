export type ThemeOption = {
  value: AppThemeValue;
  label: string;
  description: string;
  preview: [string, string, string];
};

export const appThemeValues = ["DAYBOARD", "OCEAN", "FOREST", "GRAPHITE"] as const;

export type AppThemeValue = (typeof appThemeValues)[number];

export const themeOptions: ThemeOption[] = [
  {
    value: "DAYBOARD",
    label: "Dayboard",
    description: "Warm paper, dark ink, and the existing Dayboard tone.",
    preview: ["#f5efe4", "#0f172a", "#d97706"],
  },
  {
    value: "OCEAN",
    label: "Ocean",
    description: "Cool slate and blue tones with a cleaner, calmer surface.",
    preview: ["#eaf3fb", "#0f172a", "#0f766e"],
  },
  {
    value: "FOREST",
    label: "Forest",
    description: "Soft stone with deeper green accents and warmer neutrals.",
    preview: ["#f3efe6", "#14281d", "#4d7c0f"],
  },
  {
    value: "GRAPHITE",
    label: "Graphite",
    description: "Muted grayscale with a restrained amber accent.",
    preview: ["#f1f3f7", "#111827", "#b45309"],
  },
];

export function isAppTheme(value: string): value is AppThemeValue {
  return appThemeValues.includes(value as AppThemeValue);
}

export function getThemeAttribute(theme: string | null | undefined) {
  switch (theme) {
    case "OCEAN":
      return "ocean";
    case "FOREST":
      return "forest";
    case "GRAPHITE":
      return "graphite";
    default:
      return "dayboard";
  }
}

export function getThemeMeta(theme: string | null | undefined) {
  return themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
}

import { createContext, useContext } from "react";
import { DEFAULT_THEME_PRESET_ID, HERO_UI_THEME_PRESETS } from "../data/herouiThemePresets";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: (next: Theme) => void;
    toggleTheme: () => void;
    themePreset: string;
    setThemePreset: (next: string | ((prev: string) => string)) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const PRESET_IDS = new Set(HERO_UI_THEME_PRESETS.map((p) => p.id));

export function isValidThemePreset(presetId: string): boolean {
    return PRESET_IDS.has(presetId);
}

/** apply preset to `<html>` immediately so `--accent` updates before paint. */
export function applyThemePresetToDocument(presetId: string): void {
    const id = isValidThemePreset(presetId) ? presetId : DEFAULT_THEME_PRESET_ID;
    document.documentElement.setAttribute("data-theme-preset", id);
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return ctx;
}
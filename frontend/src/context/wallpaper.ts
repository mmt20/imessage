import { createContext, useContext } from "react";
import type { frameStyleFromUrl, getWallpaperById } from "../data/wallpapers";

export interface WallpaperContextValue {
    wallpaperId: string;
    setWallpaperId: (id: string) => void;
    wallpaper: ReturnType<typeof getWallpaperById>;
    frameStyle: ReturnType<typeof frameStyleFromUrl>;
}

export const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function useWallpaper(): WallpaperContextValue {
    const ctx = useContext(WallpaperContext);

    if (!ctx) {
        throw new Error("useWallpaper must be used within WallpaperProvider");
    }
    return ctx;
}
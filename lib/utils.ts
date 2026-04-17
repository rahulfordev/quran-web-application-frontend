import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatAyahCount = (count: number) => `${count} ayah${count === 1 ? "" : "s"}`;

export const normalizeText = (value: string) => value.trim().toLowerCase();

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

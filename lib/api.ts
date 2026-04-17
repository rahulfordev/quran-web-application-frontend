export interface SurahSummary {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nameEnglishTranslation: string;
  revelationType: string;
  ayahCount: number;
}

export interface Ayah {
  globalNumber: number;
  numberInSurah: number;
  arabicText: string;
  translationText: string;
}

export interface SurahDetailsPayload {
  surah: SurahSummary;
  ayahs: Ayah[];
}

export interface SearchResultItem {
  surahId: number;
  surahNameEnglish: string;
  surahNameArabic: string;
  surahNameEnglishTranslation: string;
  revelationType: string;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
  translationSnippet?: string;
}

export interface SearchPayload {
  query: string;
  pagination: {
    page: number;
    limit: number;
    totalResults: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  items: SearchResultItem[];
}

interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: unknown;
  };
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

const buildUrl = (pathValue: string) =>
  `${API_BASE_URL}${pathValue.startsWith("/") ? pathValue : `/${pathValue}`}`;

export async function requestJson<T>(
  pathValue: string,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> {
  const response = await fetch(buildUrl(pathValue), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {})
    }
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new ApiClientError(payload.message, response.status, payload.success ? undefined : payload.error);
  }

  return payload.data;
}

export const searchAyahs = async (query: string, signal?: AbortSignal) =>
  requestJson<SearchPayload>(`/search?q=${encodeURIComponent(query)}&limit=20&page=1`, {
    signal,
    cache: "no-store"
  });

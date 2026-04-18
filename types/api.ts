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

export interface PaginatedSurahsPayload {
  items: SurahSummary[];
  total: number;
}

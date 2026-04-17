import "server-only";

import { readFile } from "fs/promises";
import path from "path";

import { ApiClientError, type SurahDetailsPayload, type SurahSummary, requestJson } from "./api";

interface PreparedDatasetAyah {
  globalNumber: number;
  numberInSurah: number;
  arabicText: string;
  translationText: string;
}

interface PreparedDatasetSurah extends SurahSummary {
  ayahs: PreparedDatasetAyah[];
}

interface PreparedDataset {
  surahs: PreparedDatasetSurah[];
}

const loadLocalPreparedDataset = async (): Promise<PreparedDataset> => {
  const dataFilePath = path.resolve(process.cwd(), "../backend/src/data/quran-data.json");
  const fileContents = await readFile(dataFilePath, "utf-8");

  return JSON.parse(fileContents) as PreparedDataset;
};

const getSurahsFromLocalDataset = async () => {
  const dataset = await loadLocalPreparedDataset();

  return {
    items: dataset.surahs.map((surah) => ({
      id: surah.id,
      nameArabic: surah.nameArabic,
      nameEnglish: surah.nameEnglish,
      nameEnglishTranslation: surah.nameEnglishTranslation,
      revelationType: surah.revelationType,
      ayahCount: surah.ayahCount
    })),
    total: dataset.surahs.length
  };
};

const getSurahByIdFromLocalDataset = async (id: number): Promise<SurahDetailsPayload> => {
  const dataset = await loadLocalPreparedDataset();
  const surah = dataset.surahs.find((item) => item.id === id);

  if (!surah) {
    throw new ApiClientError(`Surah ${id} was not found`, 404);
  }

  return {
    surah: {
      id: surah.id,
      nameArabic: surah.nameArabic,
      nameEnglish: surah.nameEnglish,
      nameEnglishTranslation: surah.nameEnglishTranslation,
      revelationType: surah.revelationType,
      ayahCount: surah.ayahCount
    },
    ayahs: surah.ayahs
  };
};

export const getSurahs = async () => {
  try {
    return await requestJson<{ items: SurahSummary[]; total: number }>("/surahs", {
      next: { revalidate: 3600 }
    });
  } catch {
    return getSurahsFromLocalDataset();
  }
};

export const getSurahById = async (id: number) => {
  try {
    return await requestJson<SurahDetailsPayload>(`/surahs/${id}`, {
      next: { revalidate: 3600 }
    });
  } catch {
    return getSurahByIdFromLocalDataset(id);
  }
};

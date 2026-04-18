import type { PaginatedSurahsPayload, SurahDetailsPayload } from "@/types/api";

import { requestJson } from "./api-client";

export const getSurahs = async () =>
  requestJson<PaginatedSurahsPayload>("/surahs", {
    next: { revalidate: 3600 },
  });

export const getSurahById = async (id: number) =>
  requestJson<SurahDetailsPayload>(`/surahs/${id}`, {
    next: { revalidate: 3600 },
  });

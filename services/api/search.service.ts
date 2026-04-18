import type { SearchPayload } from "@/types/api";
import { requestJson } from "./api-client";

export const searchAyahs = async (
  query: string,
  page = 1,
  signal?: AbortSignal,
) =>
  requestJson<SearchPayload>(
    `/search?q=${encodeURIComponent(query)}&limit=20&page=${page}`,
    {
      signal,
      cache: "no-store",
    },
  );

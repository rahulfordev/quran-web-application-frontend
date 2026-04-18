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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

const buildUrl = (pathValue: string) =>
  `${API_BASE_URL}${pathValue.startsWith("/") ? pathValue : `/${pathValue}`}`;

export async function requestJson<T>(
  pathValue: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const response = await fetch(buildUrl(pathValue), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new ApiClientError(
      payload.message,
      response.status,
      payload.success ? undefined : payload.error,
    );
  }

  return payload.data;
}

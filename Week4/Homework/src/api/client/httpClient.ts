import ky from "ky";
import {
  attachAuthHeader,
  buildFallbackMessage,
  parseJsonSafely,
  toApiErrorIfPossible,
} from "./httpClientUtils";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const httpClient = ky.create({
  prefixUrl: rawBaseUrl,
  timeout: 5000,
  hooks: {
    beforeRequest: [(request) => attachAuthHeader(request)],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.ok) return;

        const payload = await parseJsonSafely(response);
        toApiErrorIfPossible(payload, response.status);
        throw new Error(buildFallbackMessage(payload, response.status));
      },
    ],
  },
});

export type HttpClient = typeof httpClient;

import ky from "ky";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const httpClient = ky.create({
  prefixUrl: rawBaseUrl,
  timeout: 5000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = window.localStorage.getItem("accessToken");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const cloned = response.clone();
          let message = "오류 발생";
          try {
            const data = await cloned.json();
            message = data.message ?? message;
          } catch {
            // JSON 파싱 실패
          }
          throw new Error(message);
        }
      },
    ],
  },
});

export type HttpClient = typeof httpClient;

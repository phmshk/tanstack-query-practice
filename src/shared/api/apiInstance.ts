const BASE_URL = "http://localhost:3000";

class ApiError extends Error {
  constructor(response: Response) {
    super(`API Error: ${response.status}`);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  options?: RequestInit
) => {
  const result = await fetch(`${BASE_URL}${url}`, {
    ...options,
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};

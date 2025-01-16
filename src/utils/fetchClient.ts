let token: string | null = null;

export function setToken(newToken: string) {
  token = newToken;
}

export function fetchWithToken(
  url: string,
  options: RequestInit | undefined = {}
) {
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

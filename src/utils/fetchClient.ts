class FetchClient {
  token: string | null = null;
  static instance: FetchClient;

  constructor() {
    if (FetchClient.instance) {
      return FetchClient.instance;
    }

    this.token = null;
    FetchClient.instance = this;
  }

  setToken(token: string) {
    this.token = token;
  }

  fetch(url: string, options: RequestInit | undefined = {}) {
    const headers = {
      ...options.headers,
      Authorization: this.token ? `Bearer ${this.token}` : "",
      "Content-Type": "application/json",
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }
}

const fetchClient = new FetchClient();
export default fetchClient;

class ApiClient {
  private token: string | null = null;
  setToken(token: string | null) {
    this.token = token;
  }
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.token ? `Bearer ${this.token}` : "",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.code);
      }
      return data;
    } catch (error) {
      console.error("apiClient.get error:", error);
      throw error;
    }
  }
  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token ? `Bearer ${this.token}` : "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.code);
    }
    return data;
  }
}

export const apiClient = new ApiClient();

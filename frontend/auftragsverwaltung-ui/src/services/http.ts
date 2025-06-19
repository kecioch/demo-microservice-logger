const configHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
});

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: configHeaders(),
    ...(data && { body: JSON.stringify(data) }),
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  return res.json();
};

export const http = {
  get: <T>(url: string) => request<T>("GET", url),
  post: <T>(url: string, data: any) => request<T>("POST", url, data),
  put: <T>(url: string, data: any) => request<T>("PUT", url, data),
  delete: (url: string) => request<void>("DELETE", url),
};

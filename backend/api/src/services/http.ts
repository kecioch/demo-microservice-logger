const configHeaders = (requestID?: string) => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PERSISTENCE_TOKEN}`,
  "x-request-id": requestID,
});

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  requestID?: string,
  data?: any,
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: configHeaders(requestID),
    ...(data && { body: JSON.stringify(data) }),
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  return res.json();
};

export const http = {
  get: <T>(url: string, requestID?: string) => request<T>("GET", url, requestID),
  post: <T>(url: string, data: any, requestID?: string) => request<T>("POST", url, requestID, data),
  put: <T>(url: string, data: any, requestID?: string) => request<T>("PUT", url, requestID, data),
  delete: (url: string, requestID?: string) => request<void>("DELETE", url, requestID),
};

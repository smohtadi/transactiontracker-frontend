const URL = "http://localhost:8080"
type TMethod = "DELETE" | "GET" | "POST" | "PUT";
interface IRequest {
  headers: Headers;
  method: TMethod;
  body?: string;
  credentials?: "include" | "omit" | "same-origin";
}

export function httpDelete<T>(uri: string): Promise<T> {
  return send(uri, "DELETE", null);
}
export function httpGet<T>(uri: string): Promise<T> {
  return send(uri, "GET", null);
}
export function httpPost<T>(uri: string, body: object): Promise<T> {
  return send(uri, "POST", body);
}
export function httpPut<T>(uri: string, body: object): Promise<T> {
  return send(uri, "PUT", body);
}
async function send<T>(uri: string, method: TMethod, body: object|null): Promise<T> {
  const request: IRequest = {} as IRequest;
  const url = URL + uri;
  if (body) request.body = JSON.stringify(body);
  request.headers = new Headers();
  request.headers.append("Content-Type", "application/json");
  request.method = method;
  request.credentials = 'include';
  const response = await fetch(url, request);
  if (!response.ok) throw new Error("Response status:" + response.status);
  if (response.status === 204) return true;
  const json = await response.json();
  return json;
}

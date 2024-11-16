import { httpGet, httpPost } from "../http/http";
import { IAuthToken, ICuser } from "../types";

export function login(email: string, password: string) {
  return httpPost<IAuthToken>("/auth/login", { email, password });
}

export function logout() {
  return httpPost<boolean>("/auth/logout", {});
}

export function me() {
  return httpGet<ICuser>("/auth/me");
}

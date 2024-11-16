import { httpGet } from "../http/http";
import { ICurrency } from "../types";

export function getAll(): Promise<ICurrency[]> {
  return httpGet<ICurrency[]>("/currencies/");
}

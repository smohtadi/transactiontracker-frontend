import { httpGet } from "../http/http";
import { ICategory } from "../types";

export function getAll(): Promise<ICategory[]> {
  return httpGet<ICategory[]>("/categories/");
}

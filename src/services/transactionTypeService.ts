import { httpGet } from "../http/http";
import { ITransactionType } from "../types";

export function getAll(): Promise<ITransactionType[]> {
  return httpGet<ITransactionType[]>("/transaction-types/");
}

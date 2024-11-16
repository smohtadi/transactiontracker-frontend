import { httpDelete, httpGet, httpPost, httpPut } from "../http/http";
import {
  type ITransaction,
  type ITransactionFormValues,
  type ITransactionQuery,
} from "../types";

const RESOURCE_PATH = "/transactions/";

export function getAll(query: ITransactionQuery): Promise<ITransaction[]> {
  const params = [];
  for (const k in query) {
    params.push(`${k}=${query[k]}`);
  }
  return httpGet(`${RESOURCE_PATH}?${params.join('&')}`);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(fakeTransactions());
  //   }, 1000);
  // });
}
export function get(id: string): Promise<ITransaction> {
  return httpGet<ITransaction>(`${RESOURCE_PATH}${id}`)
}
export function create(payload: ITransactionFormValues): Promise<ITransaction> {
  return httpPost<ITransaction>(`${RESOURCE_PATH}`, payload);
}
export function update(
  id: string,
  payload: ITransactionFormValues
): Promise<ITransaction> {
  return httpPut<ITransaction>(`${RESOURCE_PATH}${id}`, payload);
}

export function remove(id: string): Promise<boolean> {
  return httpDelete<boolean>(`${RESOURCE_PATH}${id}`);
}
// function fakeTransactions(): ITransaction[] {
//   const list = Array.from<ITransaction>({ length: 13 });
//   const intRand = (min: number, max: number) =>
//     Math.floor(Math.random() * (max - min + 1) + min);
//   const decRand = (min: number, max: number) =>
//     Math.floor(Math.random() * (max - min + 1) + min) / 100;
//   const randDate = () => {
//     const m = intRand(1, 12);
//     const month = m < 10 ? `0${m}` : `${m}`;
//     return `2024-${month}-${intRand(10, 29)}`;
//   }
//   const randType = () => intRand(0, 1) === 1 ? {id: "1", name: "Expense", slug: "expense"} : { id: "2", name: "Income", slug: "income" };
//   const randCtgy = () => intRand(0, 1) === 1 ? {id: "1", name: "Food", slug: "food"} : { id: "2", name: "Misc", slug: "misc" };
//   const randCurr = () => intRand(0, 1) === 1 ? {id: "1", name: "Canadian Dollar", abbr: "CAD"} : { id: "2", name: "US Dollar", abbr: "USD" };
//   return list.map((_, i) => ({
//     id: i.toString(),
//     date: randDate(),
//     description: `hello world hello world ${i}`,
//     amount: `${decRand(1, 100000)}`,
//     type: randType(),
//     category: randCtgy(),
//     currency: randCurr(),
//   }));
// }

import { ITransactionType } from "../types";

export function getAll(): Promise<ITransactionType[]> {
  return new Promise((resolve) => {
    resolve([
      { id: 1, name: "Expense" },
      { id: 2, name: "Income" },
    ]);
  });
}

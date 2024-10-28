import {
  type ITransaction,
  type ITransactionFormValues,
} from "../types";

interface ITransactionQuery {
  from: string;
  to: string;
}

export function getAll({
  from,
  to,
}: ITransactionQuery): Promise<ITransaction[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeTransactions());
    }, 1000);
  });
}
export function get(id: string): Promise<ITransaction> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeTransactions()[0]);
    }, 1000);
  });
}
export function create(payload: ITransactionFormValues): Promise<ITransaction> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeTransactions()[0]);
    }, 1000);
  });
}
export function update(
  id: string,
  payload: ITransactionFormValues
): Promise<ITransaction> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeTransactions()[0]);
    }, 1000);
  });
}

export function deleteAll(id: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
function fakeTransactions(): ITransaction[] {
  const list = Array.from<ITransaction>({ length: 13 });
  const intRand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + 1);
  const decRand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min) / 100;
  return list.map((_, i) => ({
    id: i.toString(),
    date: `2024-${intRand(1, 12)}-${intRand(1, 29)}`,
    description: `hello world hello world ${i}`,
    amount: decRand(100, 100000) + "",
    type: {
      id: (i % 2).toString(),
      name: i % 3 ? "Expense" : "Income",
      slug: i % 3 ? "expense" : "income",
    },
    category: {
      id: (i % 2).toString(),
      name: i % 3 ? "Food" : "Salary",
      slug: i % 3 ? "food" : "salary",
    },
    currency: {
      id: (i % 2).toString(),
      name: i % 2 ? "Canadian Dollar" : "US Dollar",
      abbr: i % 2 ? "CAD" : "USD",
    },
  }));
}

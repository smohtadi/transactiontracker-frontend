import { ICategory } from "../types";

export function getAll(): Promise<ICategory[]> {
  return new Promise((resolve) => {
    resolve([
      { id: 1, name: "Charity" },
      { id: 2, name: "Food" },
    ]);
  });
}

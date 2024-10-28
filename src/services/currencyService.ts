import { ICurrency } from "../types";

export function getAll(): Promise<ICurrency[]> {
  return new Promise((resolve) => {
    resolve([
      { id: 1, name: "Canadian Dollar", abbr: "CAD" },
      { id: 2, name: "Euro", abbr: "EUR" },
    ]);
  });
}

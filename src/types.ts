import { CurrencyAbbr, TransactionType } from "./constants";

type TTransactionType = TransactionType.EXPENSE | TransactionType.INCOME;
export type TCurrencyAbbr =
  | CurrencyAbbr.CAD
  | CurrencyAbbr.EUR
  | CurrencyAbbr.GBP
  | CurrencyAbbr.USD;
export type TCurrencyAmount = {
  [key in TCurrencyAbbr]: string;
};
export interface ICategory {
  id: string;
  name: string;
  slug: string;
}
export interface IChoice {
  text: string;
  value: string | number;
}
export interface ICurrency {
  abbr: TCurrencyAbbr;
  id: string;
  name: string;
}
export interface ITransaction {
  amount: string;
  category: ICategory;
  currency: ICurrency;
  date: string;
  description: string;
  id: string;
  type: ITransactionType;
}
export interface ITransactionFormValues {
  amount: string;
  category: string;
  currency: string;
  date: string;
  description: string;
  type: string;
}
export interface ITransactionQuery {
  from: string;
  to: string;
  types: string;
}
export interface ITransactionType {
  id: string;
  name: string;
  slug: TTransactionType;
}
export interface IAuthToken {
  idToken: string;
  refreshToken: string;
}

export interface ICuser {
  id: string;
  name: string;
}
export interface IAuthContext {
  user: ICuser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
type TTransactionTypeSlug = 'expense' | 'income';
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
  abbr: string;
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
export interface ITransactionType {
  id: string;
  name: string;
  slug: TTransactionTypeSlug;
}

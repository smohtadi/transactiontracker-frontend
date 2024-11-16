import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Anchor,
  Button,
  Card,
  Form,
  Table,
  Text,
} from "../../components";
import {
  getAll as getTransactions,
  remove as deleteTransaction,
} from "../../services/transactionService";
import {
  getErrorMessage,
  groupBy,
  isBetween,
  isStrInt,
  isValidMonth,
  sumDecimals,
} from "../../utils/langUtils";
import { TCurrencyAbbr, TCurrencyAmount } from "../../types";
import { TransactionType } from "../../constants";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const isValidDate = (year: unknown, month: unknown) => {
  if (
    (!isStrInt(year) && !Number.isInteger(year)) ||
    (!isStrInt(month) && !Number.isInteger(month))
  )
    return false;
  const monthNum = +(month as string);
  const yearNum = +(year as string);
  const d = new Date();
  if (
    !isValidMonth(monthNum) ||
    !isBetween(yearNum, d.getFullYear() - 5, d.getFullYear())
  )
    return false;
  return true;
};
interface ITableRow {
  key: string;
  date: string;
  description: string;
  amount: string;
  category: string;
  type: string;
  currency: TCurrencyAbbr;
}
export default function Expenses() {
  const [currencies, setCurrencies] = useState<TCurrencyAbbr[]>([]);
  const [error, setError] = useState<string>("");
  const [month, setMonth] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [totalExpense, setTotalExpense] = useState<TCurrencyAmount>();
  const [totalIncome, setTotalIncome] = useState<TCurrencyAmount>();
  const [totalBalance, setTotalBalance] = useState<TCurrencyAmount>();
  const [year, setYear] = useState<number>(0);
  const [yearChoices, setYearChoices] = useState<number[]>([]);
  useEffect(() => {
    const currYear = new Date().getFullYear();
    const years = new Array(6);
    for (let i = 5; i >= 0; i--) {
      years.push(currYear - i);
    }
    setYearChoices(years);
  }, []);
  const fetchData = useCallback((y: number, m: number) => {
    if (!isValidDate(y, m)) return;
    const toDate = new Date(y, m + 1, 0); // last day of month
    let toDateISO = `${toDate.getFullYear()}-`;
    toDateISO += toDate.getMonth() + 1 < 10 ? `0${toDate.getMonth() + 1}-` : `${toDate.getMonth() + 1}-`;
    toDateISO += `${toDate.getDate()} 23:59:59`;
    let fromDateISO = `${y}-`;
    fromDateISO += m + 1 < 10 ? `0${m + 1}-` : `${m + 1}-`;
    fromDateISO += "01 00:00:00";
    const query = {
      from: fromDateISO,
      to: toDateISO,
      types: `${TransactionType.EXPENSE},${TransactionType.INCOME}`,
      size: 20,
      page: 1,
      sort: "date-asc",
    };
    getTransactions(query)
      .then((data) => {
        const trows: ITableRow[] = data.map((t) => {
          if (!t?.category?.name || !t?.currency?.abbr || !t?.type?.name)
            throw new Error("Invalid transaction.");
          return {
            amount: t.amount + "",
            category: t.category.name,
            currency: t.currency.abbr,
            date: t.date,
            description: t.description,
            key: t.id,
            type: t.type.name,
          };
        });
        setTableRows(trows);
        setError("");
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  useEffect(() => {
    if (tableRows.length === 0) return;
    const expenses = groupBy<ITableRow, TCurrencyAbbr>(
      tableRows.filter((t) => t.type === "Expense"),
      (t) => t.currency
    );
    const income = groupBy<ITableRow, TCurrencyAbbr>(
      tableRows.filter((t) => t.type === "Income"),
      (t) => t.currency
    );
    const expenseSum = {} as TCurrencyAmount;
    const incomeSum = {} as TCurrencyAmount;
    const balanceSum = {} as TCurrencyAmount;
    const currencySet = new Set<TCurrencyAbbr>();
    let currency: TCurrencyAbbr;
    for (currency in expenses) {
      expenseSum[currency] = sumDecimals(
        expenses[currency].map((t) => t.amount)
      );
      currencySet.add(currency);
    }
    for (currency in income) {
      incomeSum[currency] = sumDecimals(income[currency].map((t) => t.amount));
      currencySet.add(currency);
    }
    for (currency of currencySet) {
      balanceSum[currency] = sumDecimals([
        incomeSum[currency] || "0",
        expenseSum[currency] ? "-" + expenseSum[currency] : "0",
      ]);
    }
    setCurrencies([...currencySet]);
    setError("");
    setTotalBalance(balanceSum);
    setTotalExpense(expenseSum);
    setTotalIncome(incomeSum);

    // labels = expense_categories_names[]
    // [{ usd: { labels: string[], data: number }}]
  }, [tableRows]);

  useEffect(() => {
    const qmonth = searchParams.get("month") || new Date().getMonth();
    const qyear = searchParams.get("year") || new Date().getFullYear();
    if (!isValidDate(qyear, qmonth)) {
      setError("Invalid date");
      return;
    }
    if (qmonth === null || qyear === null) return;
    const m = +qmonth,
      y = +qyear;
    setMonth(m);
    setYear(y);
    fetchData(y, m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDateSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isValidDate(year, month)) {
        setError("Invalid datez.");
        return;
      }
      setSearchParams({ month: month.toString(), year: year.toString() });
      fetchData(year, month);
    },
    [fetchData, month, setSearchParams, year]
  );
  const handleClickDelete = useCallback(
    (tid: string) => {
      deleteTransaction(tid);
      const frows = tableRows.filter((r) => r.key !== tid);
      setTableRows(frows);
    },
    [tableRows]
  );
  return (
    <div className="transactions-page">
      {error.length > 0 && <Alert>{error}</Alert>}
      <Card className="mbe-4">
        <Card.Header>
          <Text.H1>Transactions</Text.H1>
        </Card.Header>
        <Card.Body className="transactions-controls">
          <Form className="d-flex gap-4" onSubmit={handleDateSubmit}>
            <Form.Group controlId="select-month">
              <Form.Label>Month</Form.Label>
              <Form.Select
                value={month}
                onChange={(e) => setMonth(+e.target.value)}
              >
                {monthNames.map((m, i) => (
                  <option key={i} value={i}>
                    {m}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="select-year">
              <Form.Label>Year</Form.Label>
              <Form.Select
                value={year}
                onChange={(e) => setYear(+e.target.value)}
              >
                {yearChoices.map((y, i) => (
                  <option key={i} value={y}>
                    {y}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="date-submit">
              <Form.Label style={{color: '#fff'}}>Submit</Form.Label>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </Form.Group>
          </Form>
          <Anchor btn href="/transactions/new" className="btn-primary">
            Add transaction
          </Anchor>
        </Card.Body>
      </Card>

      <aside className="transactions-summary" aria-label="Transactions Summary">
        <Card>
          <Card.Header>
            <Text.H2 className="transactions-summary-title">Expenses</Text.H2>
          </Card.Header>
          <Card.Body>
            {currencies &&
              totalExpense &&
              currencies.map((currency, i) => (
                <Text.P key={i}>
                  {currency} {totalExpense[currency] || 0}
                </Text.P>
              ))}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Text.H2 className="transactions-summary-title">Income</Text.H2>
          </Card.Header>
          <Card.Body>
            {currencies &&
              totalIncome &&
              currencies.map((currency, i) => (
                <Text.P key={i}>
                  {currency} {totalIncome[currency] || 0}
                </Text.P>
              ))}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Text.H2 className="transactions-summary-title">Balance</Text.H2>
          </Card.Header>
          <Card.Body>
            {currencies &&
              totalBalance &&
              currencies.map((currency, i) => (
                <Text.P key={i}>
                  {currency} {totalBalance[currency] || 0}
                </Text.P>
              ))}
          </Card.Body>
        </Card>
      </aside>

      <Card>
        <Card.Body className="overflow-auto">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Header>Date</Table.Header>
                <Table.Header>Description</Table.Header>
                <Table.Header>Amount</Table.Header>
                <Table.Header>Category</Table.Header>
                <Table.Header>Type</Table.Header>
                <Table.Header>Currency</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tableRows &&
                tableRows.map((r) => (
                  <Table.Row key={r.key}>
                    <Table.Cell>{r.date}</Table.Cell>
                    <Table.Cell>{r.description}</Table.Cell>
                    <Table.Cell>{r.amount}</Table.Cell>
                    <Table.Cell>{r.category}</Table.Cell>
                    <Table.Cell>{r.type}</Table.Cell>
                    <Table.Cell>{r.currency}</Table.Cell>
                    <Table.Cell>
                      <Anchor btn href={`/transactions/${r.key}`}>
                        Edit
                      </Anchor>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleClickDelete(r.key)}>
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import type { TableColumnsType, TableProps, MenuProps } from "antd";
import { getAll as getTransactions, deleteAll as deleteTransactions } from "../../services/transactionService";
import { groupBy, sumDecimals } from "../../utils/langUtils";
import { type ITransaction } from "../../types";
const { Paragraph, Title } = Typography;

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
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

const actionItems = [
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
];

interface ITableRow {
  key: string;
  date: string;
  description: string;
  amount: string;
  category: string;
  type: string;
  currency: string;
}

const columns: TableColumnsType<ITableRow> = [
  { title: "Date", dataIndex: "date" },
  { title: "Description", dataIndex: "description" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Type", dataIndex: "type" },
  { title: "Category", dataIndex: "category" },
  { title: "Currency", dataIndex: "currency" },
];

interface ISummary {
  [key: string]: { [k: string]: string };
}

const titleToSlugMap = {
  Expenses: "expense",
  Income: "income",
  Balance: "balance",
};
const typeTitles = Object.keys(titleToSlugMap);

export default function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [summary, setSummary] = useState<ISummary>();
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [yearChoices, setYearChoices] = useState<number[]>([]);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currYear = new Date().getFullYear();
    const years = new Array(6);
    for (let i = 5; i >= 0; i--) {
      years.push(currYear - i);
    }
    setYearChoices(years);
  }, []);

  const fetchData = useCallback(() => {
    if (!Number.isInteger(month) || !Number.isInteger(year)) return;
    const toDate = new Date(year, month + 1, 0); // last day of month
    const toDateISO = `${toDate.getFullYear()}-${
      toDate.getMonth() + 1
    }-${toDate.getDate()}`;
    const query = { from: `${year}-${month + 1}-01`, to: toDateISO };
    getTransactions(query).then((data) => {
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

      const typeGroups = groupBy(data, (t) => t?.type?.slug);
      const typeAbbrGroups: {
        [key: string]: { [key: string]: ITransaction[] };
      } = {};
      for (const type in typeGroups) {
        typeAbbrGroups[type] = groupBy<ITransaction>(
          typeGroups[type],
          (t) => t?.currency?.abbr
        );
      }
      const smap: ISummary = { balance: {} };
      for (const type in typeAbbrGroups) {
        for (const abbr in typeAbbrGroups[type]) {
          const amounts = typeAbbrGroups[type][abbr].map((t) => t.amount);
          const total = sumDecimals(amounts, 2);
          smap["balance"][abbr] = smap["balance"][abbr] || "0";
          smap["balance"][abbr] = sumDecimals([
            smap["balance"][abbr],
            type === "expense" ? "-" + total : total,
          ]);
          if (!(type in smap)) smap[type] = {};
          smap[type][abbr] = total;
        }
      }
      setSummary(smap);
      setTableRows(trows);
    });
  },[month, year]);

  useEffect(() => {
    const qmonth = searchParams.get("month");
    const qyear = searchParams.get("year");
    const currDate = new Date();
    currDate.getFullYear();
    if (
      typeof qmonth !== "string" ||
      typeof qyear !== "string" ||
      !Number.isInteger(+qmonth) ||
      !Number.isInteger(+qyear)
    )
      throw new Error("Page not found");
    const imonth = +qmonth,
      iyear = +qyear;
    if (
      imonth < 0 ||
      imonth > 11 ||
      iyear < currDate.getFullYear() - 5 ||
      iyear > currDate.getFullYear()
    )
      throw new Error("Page not found");
    setMonth(imonth);
    setYear(iyear);
    fetchData();
  }, [searchParams, fetchData]);

  const handleDateSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ month: month.toString(), year: year.toString() });
  };

  const onSelectChange = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onActionMenuClick: MenuProps["onClick"] = (e) => {
    if (selectedRowKeys.length === 0) return;
    if (e.key === "delete") {
      deleteTransactions(selectedRowKeys);
    } else if (e.key === "edit") {
      navigate(`/transaction/${selectedRowKeys[0]}`);
    }
  };

  const rowSelection: TableRowSelection<ITableRow> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <main>
      <Title>Transactions</Title>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <form style={{ display: "flex" }} onSubmit={handleDateSubmit}>
          <Form.Item label="Month" layout="vertical">
            <Select value={month} onChange={(e) => setMonth(e)}>
              {monthNames.map((m, i) => (
                <Select.Option key={i} value={i}>
                  {m}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Year" layout="vertical">
            <Select value={year} onChange={(e) => setYear(e)}>
              {yearChoices.map((y, i) => (
                <Select.Option key={i} value={y}>
                  {y}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Submit" layout="vertical">
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </form>
        <Button type="primary" href="/transactions/new">
          Add transaction
        </Button>
      </Row>
      <section
        aria-label="monthly transaction summary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {summary &&
          typeTitles.map((title, i) => (
            <Card key={i} style={{ minWidth: "10rem" }}>
              <Paragraph strong style={{ fontSize: "1rem" }}>
                {title}
              </Paragraph>
              {Object.keys(summary[titleToSlugMap[title]]).map(
                (abbr, j) => (
                  <Paragraph key={j}>
                    {abbr} {summary[titleToSlugMap[title]][abbr]}
                  </Paragraph>
                )
              )}
            </Card>
          ))}
      </section>
      <section className="table-menu" aria-label="table actions">
        <Dropdown.Button
          menu={{ items: actionItems, onClick: onActionMenuClick }}
        >
          Actions
        </Dropdown.Button>
      </section>
      <Table<ITableRow>
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`${record.key}`);
            },
          };
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableRows}
      />
    </main>
  );
}

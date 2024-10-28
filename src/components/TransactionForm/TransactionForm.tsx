import { FormEvent, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { getAll as getCategories } from "../../services/categoryService";
import { getAll as getCurrencies } from "../../services/currencyService";
import { getAll as getTypes } from "../../services/transactionTypeService";
import { type IChoice, type ITransactionFormValues } from "../../types";

type tProps = {
  values: ITransactionFormValues;
  onSubmit: (e: FormEvent) => void;
};

export default function TransactionForm({ values, onSubmit }: tProps) {
  const [categoryChoices, setCategoryChoices] = useState<IChoice[]>([]);
  const [currencyChoices, setCurrencyChoices] = useState<IChoice[]>([]);
  const [typeChoices, setTypeChoices] = useState<IChoice[]>([]);
  useEffect(() => {
    Promise.all([getCategories(), getCurrencies(), getTypes()]).then(
      (values) => {
        setCategoryChoices(
          values[0].map((c) => ({ text: c.name, value: c.id + "" }))
        );
        setCurrencyChoices(
          values[1].map((c) => ({ text: c.name, value: c.id + "" }))
        );
        setTypeChoices(
          values[2].map((c) => ({ text: c.name, value: c.id + "" }))
        );
      }
    );
  }, []);
  return (
    <form onSubmit={onSubmit}>
      <Form.Item layout="vertical" label="Description">
        <Input required value={values.description} />
      </Form.Item>
      <Form.Item layout="vertical" label="Amount">
        <Input required type="number" value={values.amount} />
      </Form.Item>
      <Form.Item layout="vertical" label="Date">
        <DatePicker format="YYYY-MM-DD" value={values.date} />
      </Form.Item>
      <Form.Item layout="vertical" label="Type">
        <Select value={values.type}>
          <Select value={-1}>Choose one</Select>
          {typeChoices.map((e) => (
            <Select.Option key={e.value} value={e.value}>
              {e.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item layout="vertical" label="Category">
        <Select value={values.category}>
          <Select value={-1}>Choose one</Select>
          {categoryChoices.map((e) => (
            <Select.Option key={e.value} value={e.value}>
              {e.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item layout="vertical" label="Currency">
        <Select value={values.currency}>
          <Select value={-1}>Choose one</Select>
          {currencyChoices.map((e) => (
            <Select.Option key={e.value} value={e.value}>
              {e.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </form>
  );
}

import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Form } from "../../components";
import { getAll as getCategories } from "../../services/categoryService";
import { getAll as getCurrencies } from "../../services/currencyService";
import { getAll as getTypes } from "../../services/transactionTypeService";
import { type IChoice, type ITransactionFormValues } from "../../types";
import { getErrorMessage } from "../../utils/langUtils";

type tProps = {
  values: ITransactionFormValues;
  onSubmit: (e: FormEvent) => void;
  onChange: (name: string, value: string) => void;
};
export default function TransactionForm({
  values,
  onChange,
  onSubmit,
}: tProps) {
  const [categoryChoices, setCategoryChoices] = useState<IChoice[]>([]);
  const [currencyChoices, setCurrencyChoices] = useState<IChoice[]>([]);
  const [typeChoices, setTypeChoices] = useState<IChoice[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    Promise.all([getCategories(), getCurrencies(), getTypes()])
      .then((values) => {
        setCategoryChoices(
          values[0].map((c) => ({ text: c.name, value: c.id + "" }))
        );
        setCurrencyChoices(
          values[1].map((c) => ({ text: c.name, value: c.id + "" }))
        );
        setTypeChoices(
          values[2].map((c) => ({ text: c.name, value: c.id + "" }))
        );
        setError("");
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, []);
  return (
    <>
      {error && error.length > 0 && <Alert>{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="description-input">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            value={values.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="amount-input">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            type="number"
            value={values.amount}
            onChange={(e) => onChange("amount", `${e.target.value}`)}
          />
        </Form.Group>
        <Form.Group controlId="date-input">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={values?.date && values.date.length > 0 ? values.date : ""}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="type-input">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={values.type}
            onChange={(e) => onChange("type", e.target.value)}
          >
            <option value={""}>Choose one</option>
            {typeChoices.map((e) => (
              <option key={e.value} value={e.value}>
                {e.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="category-input">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={values.category}
            onChange={(e) => onChange("category", e.target.value)}
          >
            <option value={""}>Choose one</option>
            {categoryChoices.map((e) => (
              <option key={e.value} value={e.value}>
                {e.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="currency-input">
          <Form.Label>Currency</Form.Label>
          <Form.Select
            value={values.currency}
            onChange={(e) => onChange("currency", e.target.value)}
          >
            <option value={""}>Choose one</option>
            {currencyChoices.map((e) => (
              <option key={e.value} value={e.value}>
                {e.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

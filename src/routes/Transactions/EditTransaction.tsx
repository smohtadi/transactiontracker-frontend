import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Loading, Text } from "../../components";
import { TransactionForm } from "../../partials";
import { ITransactionFormValues } from "../../types";
import {
  get as getTransaction,
  update as updateTransaction,
} from "../../services/transactionService";
import { getErrorMessage, isStrInt } from "../../utils/langUtils";

export default function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState<ITransactionFormValues>();
  const [error, setError] = useState<string>("");
  const handleChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isStrInt(id) || !formValues) {
        setError("Failed to submit form.");
        return;
      }
      updateTransaction(id as string, formValues)
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          setError(getErrorMessage(err));
        });
    },
    [formValues, id, navigate]
  );
  const fetchTransaction = useCallback(() => {
    if (!isStrInt(id)) {
      setError("Invalid id.");
      return;
    }
    getTransaction(id as string)
      .then((transaction) => {
        const fvals = {} as ITransactionFormValues;
        for (const key in transaction) {
          if (key === "category" || key === "currency" || key === "type") {
            fvals[key] = transaction?.[key]?.["id"];
          } else if (
            key === "description" ||
            key === "amount" ||
            key === "date"
          ) {
            fvals[key] = transaction[key];
          }
        }
        setFormValues(fvals);
        setError("");
      })
      .catch((err) => getErrorMessage(err));
  }, [id]);
  useEffect(() => {
    fetchTransaction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Text.H1>Edit Transaction</Text.H1>
      <Text.P>
        Edit this transaction by filling out the form and pressing the submit
        button.
      </Text.P>
      {error.length > 0 && <Alert>{error}</Alert>}
      {formValues ? (
        <TransactionForm
          values={formValues}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

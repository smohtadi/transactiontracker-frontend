import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Typography } from "antd";
import Loading from "../../components/Loading/Loading";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { type ITransactionFormValues } from "../../types";
import { get as getTransaction } from "../../services/transactionService";
import { getErrorMessage } from "../../utils/langUtils";
const { Title, Paragraph } = Typography;

export default function EditTransaction() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState<ITransactionFormValues>();
  const [error, setError] = useState<string>("");
  const handleSubmit = () => {};
  useEffect(() => {
    console.log(typeof id);
    if (typeof id !== "string" || !Number.isInteger(+id))
      throw new Error("Page not found.");
    getTransaction(id)
      .then((transaction) => {
        const fvals: ITransactionFormValues = {
          amount: "",
          category: 0,
          currency: 0,
          date: "",
          description: "",
          type: 0,
        };
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
      .catch((error) => getErrorMessage(error));
  }, [id]);
  return (
    <main>
      <Title>Edit Transaction</Title>
      <Paragraph>
        Edit this transaction by filling out the form and pressing the submit
        button.
      </Paragraph>
      {error.length > 0 && <Alert message={error} type="error" />}
      {formValues ? (
        <TransactionForm values={formValues} onSubmit={handleSubmit} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Card, Loading, Text } from "../../components";
import { TransactionForm } from "../../partials";
import { ITransactionFormValues } from "../../types";
import { create as createTransaction } from "../../services/transactionService";
import { getErrorMessage } from "../../utils/langUtils";

function NewTransaction() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ITransactionFormValues>({
    amount: "",
    category: "",
    currency: "",
    date: "",
    description: "",
    type: "",
  });
  const [error, setError] = useState<string>("");
  const handleChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      createTransaction(formValues)
        .then(() => {
          navigate(-1);
        })
        .catch((error) => setError(getErrorMessage(error)));
    },
    [formValues, navigate]
  );
  return (
    <Card>
      <Card.Header>
        <Text.H1>Create a Transaction</Text.H1>
        <Text.P style={{ marginBlockStart: "1rem", marginBlockEnd: "2rem" }}>
          Create a new transaction by filling out the form and pressing the
          submit button.
        </Text.P>
      </Card.Header>
      <Card.Body>
        {error.length > 0 && <Alert>{error}</Alert>}
        {formValues ? (
          <TransactionForm
            onChange={handleChange}
            onSubmit={handleSubmit}
            values={formValues}
          />
        ) : (
          <Loading />
        )}
      </Card.Body>
    </Card>
  );
}

export default NewTransaction;

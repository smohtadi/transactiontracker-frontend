import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Typography } from "antd";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { ITransactionFormValues } from "../../types";
import Loading from "../../components/Loading/Loading";
import { create as createTransaction } from "../../services/transactionService";
import { getErrorMessage } from "../../utils/langUtils";
const { Title, Paragraph } = Typography;

function NewTransaction() {
  const navigate = useNavigate();
  const [formValues] = useState<ITransactionFormValues>({
    amount: "",
    category: 0,
    currency: 0,
    date: "",
    description: "",
    type: 0,
  });
  const [error, setError] = useState<string>("");
  const handleSubmit = () => {
    createTransaction(formValues)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => setError(getErrorMessage(error)));
  };
  return (
    <main>
      <Title>Create a Transaction</Title>
      <Paragraph>
        Create a new transaction by filling out the form and pressing the save
        button.
      </Paragraph>
      {error.length > 0 && <Alert message={error} type="error" />}
      {formValues ? (
        <TransactionForm onSubmit={handleSubmit} values={formValues} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

export default NewTransaction;

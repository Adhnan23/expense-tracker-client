import { useNavigate } from "react-router-dom";
import { transactionsApi } from "../api";
import TransactionForm from "../components/TransactionForm";

const CreateTransaction = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await transactionsApi.createTransaction(data);
      alert("Transaction created successfully!");
      navigate("/"); // Redirect to home/dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create transaction");
    }
  };

  return (
    <div>
      <h1>Create Transaction</h1>
      <TransactionForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateTransaction;

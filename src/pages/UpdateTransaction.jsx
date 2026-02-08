import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { transactionsApi } from "../api";
import TransactionForm from "../components/TransactionForm";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await transactionsApi.getTransactions();
        const t = res.data.transactions.find((tx) => tx._id === id);
        setTransaction(t);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await transactionsApi.updateTransaction(id, data);
      alert("Transaction updated successfully");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!transaction) return <p>Transaction not found</p>;

  return (
    <div>
      <h1>Update Transaction</h1>
      <TransactionForm initialData={transaction} onSubmit={handleUpdate} />
    </div>
  );
};

export default UpdateTransaction;

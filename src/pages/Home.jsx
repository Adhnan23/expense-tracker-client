import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactionsApi } from "../api";

const Home = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transactions and summary
  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await transactionsApi.getTransactions();
      setTransactions(res.data.transactions);

      const summaryRes = await transactionsApi.getSummary();
      setSummary({
        totalIncome: summaryRes.data.totalIncome,
        totalExpense: summaryRes.data.totalExpense,
        balance: summaryRes.data.balance,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Delete transaction
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await transactionsApi.deleteTransaction(id);
      fetchTransactions(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete transaction");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Summary</h2>
        <p>Total Income: ${summary.totalIncome}</p>
        <p>Total Expense: ${summary.totalExpense}</p>
        <p>Balance: ${summary.balance}</p>
      </div>

      <button onClick={() => navigate("/create-transaction")}>
        Add Transaction
      </button>
      <br />
      <br />
      <button onClick={() => navigate("/reports")}>View Reports</button>
      <br />
      <br />

      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table width="100%" border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.type}</td>
                <td>{t.category.name}</td>
                <td>${t.amount}</td>
                <td>{t.description || "-"}</td>
                <td>
                  <button
                    onClick={() => navigate(`/update-transaction/${t._id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

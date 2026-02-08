import { useEffect, useState } from "react";
import { transactionsApi, getCategories } from "../api";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filters
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [enableMonth, setEnableMonth] = useState(false);
  const [monthFilter, setMonthFilter] = useState("");
  const [enableYear, setEnableYear] = useState(false);
  const [yearFilter, setYearFilter] = useState("");
  const navigate = useNavigate();
  // Summary
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  // Fetch transactions and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        const txRes = await transactionsApi.getTransactions();
        setTransactions(txRes.data.transactions);

        const catRes = await getCategories();
        setCategories(catRes.data.data);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    loadData();
  }, []);

  // Reset category when type changes
  useEffect(() => {
    setCategoryFilter("");
  }, [typeFilter]);

  // Calculate filtered summary
  useEffect(() => {
    let filtered = transactions;

    // Type filter
    if (typeFilter) filtered = filtered.filter((t) => t.type === typeFilter);

    // Category filter
    if (categoryFilter)
      filtered = filtered.filter((t) => t.category._id === categoryFilter);

    // Month & Year filters
    if (enableMonth && monthFilter) {
      const year =
        enableYear && yearFilter
          ? Number(yearFilter)
          : new Date().getFullYear();
      filtered = filtered.filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() + 1 === Number(monthFilter) && d.getFullYear() === year
        );
      });
    } else if (enableYear && yearFilter) {
      filtered = filtered.filter(
        (t) => new Date(t.date).getFullYear() === Number(yearFilter),
      );
    }

    const totalIncome = filtered
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filtered
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setSummary({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  }, [
    transactions,
    typeFilter,
    categoryFilter,
    monthFilter,
    yearFilter,
    enableMonth,
    enableYear,
  ]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Reports</h1>
      <button onClick={() => navigate("/")}>Back</button>
      <br />
      <br />
      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        {/* Type */}
        <label>
          Type:{" "}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        {/* Category */}
        <label style={{ marginLeft: "20px" }}>
          Category:{" "}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            {categories
              .filter((c) => (typeFilter ? c.type === typeFilter : true))
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <br />

        {/* Month filter */}
        <label>
          <input
            type="checkbox"
            checked={enableMonth}
            onChange={(e) => setEnableMonth(e.target.checked)}
          />{" "}
          Filter by Month
        </label>
        <select
          disabled={!enableMonth}
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Select Month</option>
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>
              {new Date(0, m).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <br />
        <br />

        {/* Year filter */}
        <label>
          <input
            type="checkbox"
            checked={enableYear}
            onChange={(e) => setEnableYear(e.target.checked)}
          />{" "}
          Filter by Year
        </label>
        <input
          type="number"
          disabled={!enableYear}
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          placeholder="YYYY"
          style={{ marginLeft: "10px", width: "100px" }}
        />
      </div>

      {/* Summary */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Summary</h2>
        <p>Total Income: ${summary.totalIncome}</p>
        <p>Total Expense: ${summary.totalExpense}</p>
        <p>Balance: ${summary.balance}</p>
      </div>

      {/* Transactions Table */}
      <div>
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
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter((t) => (typeFilter ? t.type === typeFilter : true))
                .filter((t) =>
                  categoryFilter ? t.category._id === categoryFilter : true,
                )
                .filter((t) => {
                  if (enableMonth && monthFilter) {
                    const year =
                      enableYear && yearFilter
                        ? Number(yearFilter)
                        : new Date().getFullYear();
                    const d = new Date(t.date);
                    return (
                      d.getMonth() + 1 === Number(monthFilter) &&
                      d.getFullYear() === year
                    );
                  } else if (enableYear && yearFilter) {
                    return (
                      new Date(t.date).getFullYear() === Number(yearFilter)
                    );
                  }
                  return true;
                })
                .map((t) => (
                  <tr key={t._id}>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                    <td>{t.type}</td>
                    <td>{t.category.name}</td>
                    <td>${t.amount}</td>
                    <td>{t.description || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;

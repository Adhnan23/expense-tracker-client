import { useState, useEffect } from "react";
import { getCategories } from "../api";

const TransactionForm = ({ initialData = {}, onSubmit }) => {
  const [type, setType] = useState(initialData.type || "income");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [category, setCategory] = useState(initialData.category?._id || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [date, setDate] = useState(
    initialData.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : "",
  );
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    if (!amount || !category || !date) {
      setError("Amount, Category, and Date are required");
      return;
    }
    setError("");
    onSubmit({
      type,
      amount: Number(amount),
      category,
      description,
      date,
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Type <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <br />
      <br />

      <label>
        Amount <br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <br />
      <br />

      <label>
        Category <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories
            .filter((c) => c.type === type)
            .map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </label>
      <br />
      <br />

      <label>
        Date <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <br />

      <label>
        Description <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TransactionForm;

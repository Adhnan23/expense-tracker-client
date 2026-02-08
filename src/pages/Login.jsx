import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken } from "../utils/token";
import { usersApi } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const response = await usersApi.signIn({ email, password });
      const { token } = response.data;
      setToken(token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login Page</h1>
      <label>
        Email{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Password{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        If you don't have an account <a href="/register">sign-up</a>
      </p>
    </div>
  );
};

export default Login;

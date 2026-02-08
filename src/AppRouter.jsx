import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateTransaction from "./pages/CreateTransaction";
import UpdateTransaction from "./pages/UpdateTransaction";
import Reports from "./pages/Reports";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-transaction"
          element={
            <PrivateRoute>
              <CreateTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-transaction/:id"
          element={
            <PrivateRoute>
              <UpdateTransaction />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

import api from "./api";

export const usersApi = {
  signUp: async (data) => api.post("/auth/sign-up", data),
  signIn: async (data) => api.post("/auth/sign-in", data),
};

export const getCategories = async () => api.get("/categories");

export const transactionsApi = {
  getTransactions: async () => api.get("/transactions"),
  // getTransactionsById: async (id) => api.get(`/transactions/${id}`),
  createTransaction: async (data) => api.post("/transactions", data),
  updateTransaction: async (id, data) => api.put(`/transactions/${id}`, data),
  deleteTransaction: async (id) => api.delete(`/transactions/${id}`),
  // getSummary: async (type, category) =>
  //   api.get(`/transactions/summary?type=${type}&category=${category}`),
  // getYearlySummary: async (year, type, category) =>
  //   api.get(`/transactions/summary/${year}?type=${type}&category=${category}`),
  // getMonthlySummary: async (year, month, type, category) =>
  //   api.get(
  //     `/transactions/summary/${year}/${month}?type=${type}&category=${category}`,
  //   ),
  getSummary: async (type, category) =>
    api.get("/transactions/summary", { params: { type, category } }),
  getYearlySummary: async (year, type, category) =>
    api.get(`/transactions/summary/${year}`, { params: { type, category } }),
  getMonthlySummary: async (year, month, type, category) =>
    api.get(`/transactions/summary/${year}/${month}`, {
      params: { type, category },
    }),
};

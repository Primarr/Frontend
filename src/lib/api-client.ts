import axios from "axios";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("primer_api_key") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Services/Registry
  services: {
    list: (params?: { capability?: string; maxPrice?: number }) =>
      apiClient.get("/v1/registry/search", { params }),
    get: (id: string) => apiClient.get(`/v1/services/${id}`),
    publish: (data: any) => apiClient.post("/v1/services", data),
    update: (id: string, data: any) => apiClient.put(`/v1/services/${id}`, data),
  },

  // Payments/Transactions
  transactions: {
    list: (params?: { limit?: number; offset?: number }) =>
      apiClient.get("/v1/transactions", { params }),
    get: (id: string) => apiClient.get(`/v1/transactions/${id}`),
  },

  // Agents
  agents: {
    list: () => apiClient.get("/v1/agents"),
    get: (id: string) => apiClient.get(`/v1/agents/${id}`),
    create: (data: any) => apiClient.post("/v1/agents", data),
  },

  // Budget
  budget: {
    get: (agentId: string) => apiClient.get(`/v1/budget/${agentId}`),
    configure: (agentId: string, data: any) =>
      apiClient.put(`/v1/budget/${agentId}`, data),
  },

  // Webhooks
  webhooks: {
    list: () => apiClient.get("/v1/webhooks"),
    create: (data: any) => apiClient.post("/v1/webhooks", data),
    delete: (id: string) => apiClient.delete(`/v1/webhooks/${id}`),
    testPayload: (id: string) => apiClient.post(`/v1/webhooks/${id}/test`),
  },

  // Auth
  auth: {
    login: (credentials: any) => apiClient.post("/v1/auth/login", credentials),
    logout: () => apiClient.post("/v1/auth/logout"),
  },
};

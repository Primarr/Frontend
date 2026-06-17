import axios, { AxiosInstance } from "axios";

interface ListParams {
  capability?: string;
  maxPrice?: number;
}

interface TransactionParams {
  limit?: number;
  offset?: number;
}

interface ServiceData {
  name: string;
  capability: string;
  description: string;
  pricePerCall: number;
  payoutAddress: string;
}

interface BudgetConfig {
  sessionCap: number;
  taskCap: number;
  requireApprovalAbove: number;
}

interface WebhookData {
  url: string;
  events: string[];
}

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient: AxiosInstance = axios.create({
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
  services: {
    list: (params?: ListParams) =>
      apiClient.get("/v1/registry/search", { params }),
    get: (id: string) => apiClient.get(`/v1/services/${id}`),
    publish: (data: ServiceData) => apiClient.post("/v1/services", data),
    update: (id: string, data: Partial<ServiceData>) =>
      apiClient.put(`/v1/services/${id}`, data),
  },

  transactions: {
    list: (params?: TransactionParams) =>
      apiClient.get("/v1/transactions", { params }),
    get: (id: string) => apiClient.get(`/v1/transactions/${id}`),
  },

  agents: {
    list: () => apiClient.get("/v1/agents"),
    get: (id: string) => apiClient.get(`/v1/agents/${id}`),
    create: (data: Record<string, unknown>) => apiClient.post("/v1/agents", data),
  },

  budget: {
    get: (agentId: string) => apiClient.get(`/v1/budget/${agentId}`),
    configure: (agentId: string, data: BudgetConfig) =>
      apiClient.put(`/v1/budget/${agentId}`, data),
  },

  webhooks: {
    list: () => apiClient.get("/v1/webhooks"),
    create: (data: WebhookData) => apiClient.post("/v1/webhooks", data),
    delete: (id: string) => apiClient.delete(`/v1/webhooks/${id}`),
    testPayload: (id: string) => apiClient.post(`/v1/webhooks/${id}/test`),
  },

  auth: {
    login: (credentials: Record<string, unknown>) =>
      apiClient.post("/v1/auth/login", credentials),
    logout: () => apiClient.post("/v1/auth/logout"),
  },
};

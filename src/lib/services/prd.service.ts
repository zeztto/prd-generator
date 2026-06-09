import { apiClient } from "@/lib/services/api-client";
import type { PRDService } from "@/types/api.types";
import type { PRDDocument, PRDSummary } from "@/types/prd.types";

export const prdService: PRDService = {
  async list() {
    const response = await apiClient<{ prds: PRDSummary[] }>("/api/prds");
    return response.prds;
  },

  async getById(id: string) {
    const response = await apiClient<{ prd: PRDDocument }>(`/api/prds/${id}`);
    return response.prd;
  },

  async create(data: Partial<PRDDocument>) {
    const response = await apiClient<{ prd: PRDDocument }>("/api/prds", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.prd;
  },

  async update(id: string, data: Partial<PRDDocument>) {
    const response = await apiClient<{ prd: PRDDocument }>(`/api/prds/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return response.prd;
  },

  async delete(id: string) {
    await apiClient(`/api/prds/${id}`, {
      method: "DELETE",
    });
  },

  async duplicate(id: string) {
    const response = await apiClient<{ prd: PRDDocument }>(
      `/api/prds/${id}/duplicate`,
      {
        method: "POST",
      },
    );
    return response.prd;
  },

  async updateStatus(id: string, status: PRDDocument["status"]) {
    const response = await apiClient<{ prd: PRDDocument }>(
      `/api/prds/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
    );
    return response.prd;
  },
};

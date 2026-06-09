import { apiClient } from "@/lib/services/api-client";
import type { AIService } from "@/types/api.types";
import type {
  AIReviewResult,
  BackgroundData,
  FeaturesData,
  GoalsData,
  KPI,
  Persona,
  PRDDocument,
  ScopeData,
  SolutionData,
  TargetUsersData,
} from "@/types/prd.types";

export const aiService: AIService = {
  async enhance(section: string, content: string) {
    const response = await apiClient<{ result: string }>("/api/ai/enhance", {
      method: "POST",
      body: JSON.stringify({ section, content }),
    });

    return response.result;
  },

  async review(prd: PRDDocument) {
    const response = await apiClient<{ review: AIReviewResult }>("/api/ai/review", {
      method: "POST",
      body: JSON.stringify({ prd }),
    });

    return response.review;
  },

  async suggestKPIs(context: {
    background: BackgroundData;
    goals: GoalsData;
  }) {
    const response = await apiClient<{ kpis: KPI[] }>("/api/ai/suggest-kpis", {
      method: "POST",
      body: JSON.stringify(context),
    });

    return response.kpis;
  },

  async generatePersona(context: {
    targetUsers: TargetUsersData;
    background: BackgroundData;
  }) {
    const response = await apiClient<{ persona: Persona }>(
      "/api/ai/generate-persona",
      {
        method: "POST",
        body: JSON.stringify(context),
      },
    );

    return response.persona;
  },

  async suggestFeatures(context: {
    goals: GoalsData;
    targetUsers: TargetUsersData;
    solution: SolutionData;
  }) {
    const response = await apiClient<{ features: FeaturesData }>(
      "/api/ai/suggest-features",
      {
        method: "POST",
        body: JSON.stringify(context),
      },
    );

    return response.features;
  },

  async suggestScope(context: {
    features: FeaturesData;
    scope: ScopeData;
  }) {
    const response = await apiClient<{ scope: ScopeData }>(
      "/api/ai/suggest-scope",
      {
        method: "POST",
        body: JSON.stringify(context),
      },
    );

    return response.scope;
  },
};

import {
  DocStatus,
  type BackgroundData,
  type FeaturesData,
  type GoalsData,
  type ProjectSetupData,
  type QualityScore,
  type ScopeData,
  type SolutionData,
  type TargetUsersData,
} from "@/types/prd.types";

export const EMPTY_PROJECT_SETUP: ProjectSetupData = {
  title: "",
  description: "",
  projectType: null,
  platform: [],
  targetMarket: null,
};

export const EMPTY_BACKGROUND: BackgroundData = {
  problemStatement: "",
  currentSituation: "",
};

export const EMPTY_GOALS: GoalsData = {
  businessGoals: "",
  userGoals: "",
  kpis: [],
  successCriteria: "",
};

export const EMPTY_TARGET_USERS: TargetUsersData = {
  primaryUsers: "",
  personas: [],
};

export const EMPTY_FEATURES: FeaturesData = {
  coreFeatures: [],
};

export const EMPTY_SOLUTION: SolutionData = {
  proposedSolution: "",
};

export const EMPTY_SCOPE: ScopeData = {
  inScope: "",
  outOfScope: "",
  milestones: [],
};

export const EMPTY_QUALITY_SCORE: QualityScore = {
  overall: 0,
  completeness: 0,
  clarity: 0,
  consistency: 0,
  specificity: 0,
};

export function getQualityScoreFromOverall(overall: number): QualityScore {
  return {
    overall,
    completeness: overall,
    clarity: 0,
    consistency: 0,
    specificity: 0,
  };
}

export function createEmptyPRDSections() {
  return {
    projectSetup: { ...EMPTY_PROJECT_SETUP },
    background: { ...EMPTY_BACKGROUND },
    goals: { ...EMPTY_GOALS },
    targetUsers: { ...EMPTY_TARGET_USERS },
    features: { ...EMPTY_FEATURES },
    solution: { ...EMPTY_SOLUTION },
    scope: { ...EMPTY_SCOPE },
  };
}

export function createEmptyPRDInput() {
  return {
    title: "",
    description: "",
    status: DocStatus.DRAFT,
    qualityScore: 0,
    reviewResult: undefined,
    ...createEmptyPRDSections(),
  };
}

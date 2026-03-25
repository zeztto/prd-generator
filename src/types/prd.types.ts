export enum DocStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  FINALIZED = 'FINALIZED',
  ARCHIVED = 'ARCHIVED',
}

export enum ProjectType {
  NEW_PRODUCT = 'NEW_PRODUCT',
  FEATURE_IMPROVEMENT = 'FEATURE_IMPROVEMENT',
  TECH_INFRA = 'TECH_INFRA',
  EXPERIMENT = 'EXPERIMENT',
  BUG_FIX = 'BUG_FIX',
}

export enum Platform {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  API = 'API',
  DESKTOP = 'DESKTOP',
}

export enum TargetMarket {
  B2B = 'B2B',
  B2C = 'B2C',
  INTERNAL = 'INTERNAL',
}

export enum FeaturePriority {
  MUST = 'must',
  SHOULD = 'should',
  COULD = 'could',
  WONT = 'wont',
}

// ── 섹션 데이터 타입 ──

export interface ProjectSetupData {
  title: string;
  description: string;
  projectType: ProjectType | null;
  platform: Platform[];
  targetMarket: TargetMarket | null;
  startDate?: string;
  endDate?: string;
  teamMembers?: string[];
}

export interface BackgroundData {
  problemStatement: string;
  currentSituation: string;
  marketResearch?: string;
  competitorAnalysis?: string;
  dataInsights?: string;
}

export interface KPI {
  id: string;
  name: string;
  targetValue: string;
  currentValue?: string;
  unit: string;
  description?: string;
}

export interface GoalsData {
  businessGoals: string;
  userGoals: string;
  kpis: KPI[];
  successCriteria: string;
  nonGoals?: string;
}

export interface Persona {
  id: string;
  name: string;
  age: string;
  occupation: string;
  painPoints: string[];
  needs: string[];
  scenario: string;
}

export interface TargetUsersData {
  primaryUsers: string;
  personas: Persona[];
  userSegments?: string;
  userJourney?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  priority: FeaturePriority;
  acceptanceCriteria: string[];
  estimatedEffort?: string;
  dependencies?: string[];
}

export interface FeaturesData {
  coreFeatures: Feature[];
  additionalNotes?: string;
}

export interface SolutionData {
  proposedSolution: string;
  technicalApproach?: string;
  alternativesConsidered?: string;
  constraints?: string;
  assumptions?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  deliverables: string[];
}

export interface ScopeData {
  inScope: string;
  outOfScope: string;
  milestones: Milestone[];
  risks?: string;
  dependencies?: string;
}

// ── PRD 섹션 ──

export interface PRDSection {
  id: string;
  title: string;
  content: string;
  order: number;
  updatedAt: string;
}

// ── PRD 문서 ──

export interface PRDDocument {
  id: string;
  title: string;
  description: string;
  status: DocStatus;
  qualityScore: number;
  authorId: string;
  projectSetup: ProjectSetupData;
  background: BackgroundData;
  goals: GoalsData;
  targetUsers: TargetUsersData;
  features: FeaturesData;
  solution: SolutionData;
  scope: ScopeData;
  sections?: PRDSection[];
  reviewResult?: AIReviewResult;
  createdAt: string;
  updatedAt: string;
}

// ── AI 검토 ──

export interface ReviewItem {
  id: string;
  section: string;
  type: 'warning' | 'suggestion' | 'error';
  message: string;
  originalText?: string;
  suggestedText?: string;
}

export interface QualityScore {
  overall: number;
  completeness: number;
  clarity: number;
  consistency: number;
  specificity: number;
}

export interface AIReviewResult {
  items: ReviewItem[];
  qualityScore: QualityScore;
  summary: string;
  reviewedAt: string;
}

// ── PRD 목록용 요약 타입 ──

export interface PRDSummary {
  id: string;
  title: string;
  description: string;
  status: DocStatus;
  qualityScore: number;
  projectType: ProjectType | null;
  createdAt: string;
  updatedAt: string;
}

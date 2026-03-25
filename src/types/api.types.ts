import type { AuthResponse, LoginData, OnboardingData, SignupData, SocialProvider, User } from './auth.types';
import type {
  AIReviewResult,
  BackgroundData,
  FeaturesData,
  GoalsData,
  KPI,
  Persona,
  PRDDocument,
  PRDSummary,
  ScopeData,
  SolutionData,
  TargetUsersData,
} from './prd.types';

// ── Auth 서비스 인터페이스 ──

export interface AuthService {
  login(data: LoginData): Promise<AuthResponse>;
  loginWithSocial(provider: SocialProvider): Promise<AuthResponse>;
  signup(data: SignupData): Promise<AuthResponse>;
  logout(): Promise<void>;
  completeOnboarding(data: OnboardingData): Promise<User>;
  getCurrentUser(): Promise<User>;
}

// ── PRD 서비스 인터페이스 ──

export interface PRDService {
  list(): Promise<PRDSummary[]>;
  getById(id: string): Promise<PRDDocument>;
  create(data: Partial<PRDDocument>): Promise<PRDDocument>;
  update(id: string, data: Partial<PRDDocument>): Promise<PRDDocument>;
  delete(id: string): Promise<void>;
  duplicate(id: string): Promise<PRDDocument>;
  updateStatus(id: string, status: PRDDocument['status']): Promise<PRDDocument>;
}

// ── AI 서비스 인터페이스 ──

export interface AIService {
  enhance(section: string, content: string): Promise<string>;
  review(prd: PRDDocument): Promise<AIReviewResult>;
  suggestKPIs(context: {
    background: BackgroundData;
    goals: GoalsData;
  }): Promise<KPI[]>;
  generatePersona(context: {
    targetUsers: TargetUsersData;
    background: BackgroundData;
  }): Promise<Persona>;
  suggestFeatures(context: {
    goals: GoalsData;
    targetUsers: TargetUsersData;
    solution: SolutionData;
  }): Promise<FeaturesData>;
  suggestScope(context: {
    features: FeaturesData;
    scope: ScopeData;
  }): Promise<ScopeData>;
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type {
  AIReviewResult,
  BackgroundData,
  DocStatus,
  FeaturesData,
  GoalsData,
  PRDDocument,
  PRDSummary,
  ProjectSetupData,
  QualityScore,
  ScopeData,
  SolutionData,
  TargetUsersData,
} from '@/types/prd.types';

// ── 섹션 초기값 ──

const initialProjectSetup: ProjectSetupData = {
  title: '',
  description: '',
  projectType: null,
  platform: [],
  targetMarket: null,
};

const initialBackground: BackgroundData = {
  problemStatement: '',
  currentSituation: '',
};

const initialGoals: GoalsData = {
  businessGoals: '',
  userGoals: '',
  kpis: [],
  successCriteria: '',
};

const initialTargetUsers: TargetUsersData = {
  primaryUsers: '',
  personas: [],
};

const initialFeatures: FeaturesData = {
  coreFeatures: [],
};

const initialSolution: SolutionData = {
  proposedSolution: '',
};

const initialScope: ScopeData = {
  inScope: '',
  outOfScope: '',
  milestones: [],
};

const initialQualityScore: QualityScore = {
  overall: 0,
  completeness: 0,
  clarity: 0,
  consistency: 0,
  specificity: 0,
};

// ── 스토어 타입 ──

interface PRDState {
  // 현재 편집 중인 PRD
  currentPRDId: string | null;
  currentStep: number;
  currentSubStep: number;

  // 섹션 데이터
  projectSetup: ProjectSetupData;
  background: BackgroundData;
  goals: GoalsData;
  targetUsers: TargetUsersData;
  features: FeaturesData;
  solution: SolutionData;
  scope: ScopeData;

  // AI 검토
  reviewResult: AIReviewResult | null;
  qualityScore: QualityScore;
  isReviewing: boolean;

  // 대시보드
  prdList: PRDSummary[];
  isListLoading: boolean;

  // 저장 상태
  isDirty: boolean;
  lastSavedAt: string | null;
}

interface PRDActions {
  // 네비게이션
  setStep: (step: number) => void;
  setSubStep: (subStep: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  // 섹션 업데이트
  updateProjectSetup: (data: Partial<ProjectSetupData>) => void;
  updateBackground: (data: Partial<BackgroundData>) => void;
  updateGoals: (data: Partial<GoalsData>) => void;
  updateTargetUsers: (data: Partial<TargetUsersData>) => void;
  updateFeatures: (data: Partial<FeaturesData>) => void;
  updateSolution: (data: Partial<SolutionData>) => void;
  updateScope: (data: Partial<ScopeData>) => void;

  // AI 검토
  setReviewResult: (result: AIReviewResult) => void;
  setIsReviewing: (isReviewing: boolean) => void;

  // 품질 점수
  calculateQualityScore: () => void;

  // PRD 목록
  setPRDList: (list: PRDSummary[]) => void;
  setListLoading: (loading: boolean) => void;

  // PRD 관리
  loadPRD: (prd: PRDDocument) => void;
  resetPRD: () => void;
  setCurrentPRDId: (id: string | null) => void;

  // 저장 상태
  markDirty: () => void;
  markSaved: () => void;

  // 전체 PRD 데이터 조합
  getCurrentPRDData: () => Omit<PRDDocument, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>;
}

type PRDStore = PRDState & PRDActions;

const TOTAL_STEPS = 10;

export const usePRDStore = create<PRDStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      currentPRDId: null,
      currentStep: 1,
      currentSubStep: 0,

      projectSetup: initialProjectSetup,
      background: initialBackground,
      goals: initialGoals,
      targetUsers: initialTargetUsers,
      features: initialFeatures,
      solution: initialSolution,
      scope: initialScope,

      reviewResult: null,
      qualityScore: initialQualityScore,
      isReviewing: false,

      prdList: [],
      isListLoading: false,

      isDirty: false,
      lastSavedAt: null,

      // ── 네비게이션 ──

      setStep: (step: number) => {
        if (step >= 1 && step <= TOTAL_STEPS) {
          set({ currentStep: step, currentSubStep: 0 });
        }
      },

      setSubStep: (subStep: number) => {
        set({ currentSubStep: subStep });
      },

      goToNextStep: () => {
        const { currentStep } = get();
        if (currentStep < TOTAL_STEPS) {
          set({ currentStep: currentStep + 1, currentSubStep: 0 });
        }
      },

      goToPrevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1, currentSubStep: 0 });
        }
      },

      // ── 섹션 업데이트 ──

      updateProjectSetup: (data) => {
        set((state) => ({
          projectSetup: { ...state.projectSetup, ...data },
          isDirty: true,
        }));
      },

      updateBackground: (data) => {
        set((state) => ({
          background: { ...state.background, ...data },
          isDirty: true,
        }));
      },

      updateGoals: (data) => {
        set((state) => ({
          goals: { ...state.goals, ...data },
          isDirty: true,
        }));
      },

      updateTargetUsers: (data) => {
        set((state) => ({
          targetUsers: { ...state.targetUsers, ...data },
          isDirty: true,
        }));
      },

      updateFeatures: (data) => {
        set((state) => ({
          features: { ...state.features, ...data },
          isDirty: true,
        }));
      },

      updateSolution: (data) => {
        set((state) => ({
          solution: { ...state.solution, ...data },
          isDirty: true,
        }));
      },

      updateScope: (data) => {
        set((state) => ({
          scope: { ...state.scope, ...data },
          isDirty: true,
        }));
      },

      // ── AI 검토 ──

      setReviewResult: (result) => {
        set({ reviewResult: result, qualityScore: result.qualityScore });
      },

      setIsReviewing: (isReviewing) => {
        set({ isReviewing });
      },

      // ── 품질 점수 계산 ──

      calculateQualityScore: () => {
        const state = get();
        let completeness = 0;
        let totalFields = 0;

        // 프로젝트 설정 완성도
        const setupFields = [
          state.projectSetup.title,
          state.projectSetup.description,
          state.projectSetup.projectType,
          state.projectSetup.platform.length > 0,
          state.projectSetup.targetMarket,
        ];
        totalFields += setupFields.length;
        completeness += setupFields.filter(Boolean).length;

        // 배경 완성도
        const bgFields = [
          state.background.problemStatement,
          state.background.currentSituation,
        ];
        totalFields += bgFields.length;
        completeness += bgFields.filter(Boolean).length;

        // 목표 완성도
        const goalFields = [
          state.goals.businessGoals,
          state.goals.userGoals,
          state.goals.kpis.length > 0,
          state.goals.successCriteria,
        ];
        totalFields += goalFields.length;
        completeness += goalFields.filter(Boolean).length;

        // 타겟 사용자 완성도
        const userFields = [
          state.targetUsers.primaryUsers,
          state.targetUsers.personas.length > 0,
        ];
        totalFields += userFields.length;
        completeness += userFields.filter(Boolean).length;

        // 기능 완성도
        const featureFields = [state.features.coreFeatures.length > 0];
        totalFields += featureFields.length;
        completeness += featureFields.filter(Boolean).length;

        // 솔루션 완성도
        const solutionFields = [state.solution.proposedSolution];
        totalFields += solutionFields.length;
        completeness += solutionFields.filter(Boolean).length;

        // 범위 완성도
        const scopeFields = [
          state.scope.inScope,
          state.scope.outOfScope,
          state.scope.milestones.length > 0,
        ];
        totalFields += scopeFields.length;
        completeness += scopeFields.filter(Boolean).length;

        const completenessScore = totalFields > 0
          ? Math.round((completeness / totalFields) * 100)
          : 0;

        set({
          qualityScore: {
            overall: completenessScore,
            completeness: completenessScore,
            clarity: state.reviewResult?.qualityScore.clarity ?? 0,
            consistency: state.reviewResult?.qualityScore.consistency ?? 0,
            specificity: state.reviewResult?.qualityScore.specificity ?? 0,
          },
        });
      },

      // ── PRD 목록 ──

      setPRDList: (list) => {
        set({ prdList: list });
      },

      setListLoading: (loading) => {
        set({ isListLoading: loading });
      },

      // ── PRD 관리 ──

      loadPRD: (prd) => {
        set({
          currentPRDId: prd.id,
          projectSetup: prd.projectSetup,
          background: prd.background,
          goals: prd.goals,
          targetUsers: prd.targetUsers,
          features: prd.features,
          solution: prd.solution,
          scope: prd.scope,
          reviewResult: prd.reviewResult ?? null,
          qualityScore: prd.reviewResult?.qualityScore ?? initialQualityScore,
          currentStep: 1,
          currentSubStep: 0,
          isDirty: false,
        });
      },

      resetPRD: () => {
        set({
          currentPRDId: null,
          currentStep: 1,
          currentSubStep: 0,
          projectSetup: initialProjectSetup,
          background: initialBackground,
          goals: initialGoals,
          targetUsers: initialTargetUsers,
          features: initialFeatures,
          solution: initialSolution,
          scope: initialScope,
          reviewResult: null,
          qualityScore: initialQualityScore,
          isDirty: false,
          lastSavedAt: null,
        });
      },

      setCurrentPRDId: (id) => {
        set({ currentPRDId: id });
      },

      // ── 저장 상태 ──

      markDirty: () => {
        set({ isDirty: true });
      },

      markSaved: () => {
        set({ isDirty: false, lastSavedAt: new Date().toISOString() });
      },

      // ── 전체 PRD 데이터 ──

      getCurrentPRDData: () => {
        const state = get();
        return {
          title: state.projectSetup.title,
          description: state.projectSetup.description,
          status: 'DRAFT' as DocStatus,
          qualityScore: state.qualityScore.overall,
          projectSetup: state.projectSetup,
          background: state.background,
          goals: state.goals,
          targetUsers: state.targetUsers,
          features: state.features,
          solution: state.solution,
          scope: state.scope,
          reviewResult: state.reviewResult ?? undefined,
        };
      },
    }),
    {
      name: 'prd-editor-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentPRDId: state.currentPRDId,
        currentStep: state.currentStep,
        currentSubStep: state.currentSubStep,
        projectSetup: state.projectSetup,
        background: state.background,
        goals: state.goals,
        targetUsers: state.targetUsers,
        features: state.features,
        solution: state.solution,
        scope: state.scope,
        reviewResult: state.reviewResult,
        qualityScore: state.qualityScore,
        lastSavedAt: state.lastSavedAt,
      }),
    },
  ),
);

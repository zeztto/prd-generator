import type { PRDService } from '@/types/api.types';
import type { PRDDocument, PRDSummary } from '@/types/prd.types';
import { DocStatus, ProjectType } from '@/types/prd.types';
import { MOCK_PRD_LIST, getMockPRDById, MOCK_PRD_DETAIL } from '@/lib/mock/data/prds';
import { mockDelay } from '@/lib/mock/delay';

// 메모리 내 PRD 목록 (CRUD 시뮬레이션용)
let prdList = [...MOCK_PRD_LIST];

const mockPRDServiceImpl: PRDService = {
  async list(): Promise<PRDSummary[]> {
    await mockDelay(500);
    return [...prdList];
  },

  async getById(id: string): Promise<PRDDocument> {
    await mockDelay(400);
    const prd = getMockPRDById(id);
    if (!prd) {
      throw new Error(`PRD를 찾을 수 없습니다: ${id}`);
    }
    return prd;
  },

  async create(data: Partial<PRDDocument>): Promise<PRDDocument> {
    await mockDelay(600);

    const newId = `prd-${Date.now()}`;
    const now = new Date().toISOString();

    const newPRD: PRDDocument = {
      ...MOCK_PRD_DETAIL,
      ...data,
      id: newId,
      title: data.title ?? '새 PRD',
      description: data.description ?? '',
      status: DocStatus.DRAFT,
      qualityScore: 0,
      authorId: 'user-001',
      createdAt: now,
      updatedAt: now,
    };

    const summary: PRDSummary = {
      id: newPRD.id,
      title: newPRD.title,
      description: newPRD.description,
      status: newPRD.status,
      qualityScore: newPRD.qualityScore,
      projectType: newPRD.projectSetup.projectType,
      createdAt: newPRD.createdAt,
      updatedAt: newPRD.updatedAt,
    };

    prdList = [summary, ...prdList];
    return newPRD;
  },

  async update(id: string, data: Partial<PRDDocument>): Promise<PRDDocument> {
    await mockDelay(400);

    const existing = getMockPRDById(id);
    if (!existing) {
      throw new Error(`PRD를 찾을 수 없습니다: ${id}`);
    }

    const updated: PRDDocument = {
      ...existing,
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };

    // 목록도 업데이트
    prdList = prdList.map((p) =>
      p.id === id
        ? {
            ...p,
            title: updated.title,
            description: updated.description,
            status: updated.status,
            qualityScore: updated.qualityScore,
            updatedAt: updated.updatedAt,
          }
        : p,
    );

    return updated;
  },

  async delete(id: string): Promise<void> {
    await mockDelay(300);
    prdList = prdList.filter((p) => p.id !== id);
  },

  async duplicate(id: string): Promise<PRDDocument> {
    await mockDelay(500);

    const original = getMockPRDById(id);
    if (!original) {
      throw new Error(`PRD를 찾을 수 없습니다: ${id}`);
    }

    const newId = `prd-${Date.now()}`;
    const now = new Date().toISOString();

    const duplicated: PRDDocument = {
      ...original,
      id: newId,
      title: `${original.title} (복사본)`,
      status: DocStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    };

    const summary: PRDSummary = {
      id: duplicated.id,
      title: duplicated.title,
      description: duplicated.description,
      status: duplicated.status,
      qualityScore: duplicated.qualityScore,
      projectType: duplicated.projectSetup.projectType,
      createdAt: duplicated.createdAt,
      updatedAt: duplicated.updatedAt,
    };

    prdList = [summary, ...prdList];
    return duplicated;
  },

  async updateStatus(id: string, status: DocStatus): Promise<PRDDocument> {
    await mockDelay(300);

    const existing = getMockPRDById(id);
    if (!existing) {
      throw new Error(`PRD를 찾을 수 없습니다: ${id}`);
    }

    const updated: PRDDocument = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    };

    prdList = prdList.map((p) =>
      p.id === id ? { ...p, status, updatedAt: updated.updatedAt } : p,
    );

    return updated;
  },
};

export const mockPRDService = mockPRDServiceImpl;

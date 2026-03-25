import { Platform, ProjectType, TargetMarket } from '@/types/prd.types';

export interface ProjectTypeOption {
  value: ProjectType;
  label: string;
  description: string;
  icon: string;
}

export interface PlatformOption {
  value: Platform;
  label: string;
  description: string;
  icon: string;
}

export interface TargetMarketOption {
  value: TargetMarket;
  label: string;
  description: string;
  icon: string;
}

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  {
    value: ProjectType.NEW_PRODUCT,
    label: '신규 제품',
    description: '처음부터 새로운 제품을 기획합니다.',
    icon: 'Rocket',
  },
  {
    value: ProjectType.FEATURE_IMPROVEMENT,
    label: '기능 개선',
    description: '기존 제품의 기능을 개선하거나 추가합니다.',
    icon: 'Wrench',
  },
  {
    value: ProjectType.TECH_INFRA,
    label: '기술/인프라',
    description: '기술 부채 해소 또는 인프라 개선 프로젝트입니다.',
    icon: 'Server',
  },
  {
    value: ProjectType.EXPERIMENT,
    label: '실험/검증',
    description: '가설을 검증하기 위한 실험 프로젝트입니다.',
    icon: 'FlaskConical',
  },
  {
    value: ProjectType.BUG_FIX,
    label: '버그 수정',
    description: '주요 버그를 수정하고 안정성을 높입니다.',
    icon: 'Bug',
  },
];

export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    value: Platform.WEB,
    label: '웹',
    description: '웹 브라우저 기반 서비스입니다.',
    icon: 'Globe',
  },
  {
    value: Platform.MOBILE,
    label: '모바일',
    description: 'iOS, Android 모바일 앱입니다.',
    icon: 'Smartphone',
  },
  {
    value: Platform.API,
    label: 'API',
    description: 'API 서비스 또는 백엔드 시스템입니다.',
    icon: 'Code',
  },
  {
    value: Platform.DESKTOP,
    label: '데스크톱',
    description: 'PC용 데스크톱 애플리케이션입니다.',
    icon: 'Monitor',
  },
];

export const TARGET_MARKET_OPTIONS: TargetMarketOption[] = [
  {
    value: TargetMarket.B2B,
    label: 'B2B',
    description: '기업 고객을 대상으로 하는 서비스입니다.',
    icon: 'Building2',
  },
  {
    value: TargetMarket.B2C,
    label: 'B2C',
    description: '일반 소비자를 대상으로 하는 서비스입니다.',
    icon: 'Users',
  },
  {
    value: TargetMarket.INTERNAL,
    label: '사내용',
    description: '내부 직원을 위한 도구입니다.',
    icon: 'Building',
  },
];

export const getProjectTypeOption = (value: ProjectType): ProjectTypeOption | undefined =>
  PROJECT_TYPE_OPTIONS.find((option) => option.value === value);

export const getPlatformOption = (value: Platform): PlatformOption | undefined =>
  PLATFORM_OPTIONS.find((option) => option.value === value);

export const getTargetMarketOption = (value: TargetMarket): TargetMarketOption | undefined =>
  TARGET_MARKET_OPTIONS.find((option) => option.value === value);

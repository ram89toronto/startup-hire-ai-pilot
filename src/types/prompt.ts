export interface PromptContext {
  roleTitle: string;
  companyContext: string;
  challenges: string;
  values: string;
}

export interface ChatContext {
  role: string;
  roleTitle: string;
  companyContext: string;
  scenario: string;
}

export interface SearchResult {
  title: string;
  snippet: string;
  url?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKeyError {
  message: string;
  code?: string;
}

export interface StatsData {
  [key: string]: number | string;
}

export interface Scenario {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  description: string;
  tests: string;
  lookFor: string;
  isGenerated?: boolean;
  baseScenario?: string;
}
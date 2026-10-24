export type VectorKey = 'sobrevivencia' | 'aceleracao' | 'futuro' | 'lazer';

export interface VectorAllocation {
  key: VectorKey;
  name: string;
  tag: string;
  percentage: number;
  spent: number;
  color: string;
  glowClass: string;
  icon: string;
  description: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  vector: VectorKey;
  method: string;
  isRecurring?: boolean;
}

export interface UserSettings {
  liquidIncome: number;
  proLabore: number;
  variableIncome: number;
  alternativeIncome: number;
  hoursWorkedPerMonth: number;
  currency: 'BRL' | 'USD' | 'EUR' | 'BTC';
  vectorPercentages: {
    sobrevivencia: number;
    aceleracao: number;
    futuro: number;
    lazer: number;
  };
  fireTargetAnnualExpenseMultiplier: number; // default 25 (regra dos 4%)
  annualReturnRate: number; // default 0.12 (12% a.a.)
  currentPatrimony: number;
}

export interface ImpulseAnalysis {
  item: string;
  price: number;
  workHours: number;
  projection1y: number;
  projection5y: number;
  projection10y: number;
  verdict: 'AUTORIZADO' | 'ATENCAO_IMPACTO' | 'CRITICO';
}


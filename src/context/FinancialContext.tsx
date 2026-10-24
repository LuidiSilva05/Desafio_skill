"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Transaction, UserSettings, VectorKey, ImpulseAnalysis } from "../types/financial";

interface FinancialContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  hourlyRate: number;
  dailySurvivalCost: number;
  totalSpent: number;
  netSavings: number;
  fireStats: {
    targetPatrimony: number;
    currentPatrimony: number;
    progressPct: number;
    yearsToFire: number;
    monthsToFire: number;
  };
  analyzeImpulse: (item: string, price: number) => ImpulseAnalysis;
  parseNaturalLanguage: (input: string) => Transaction[];
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  liquidIncome: 7000,
  proLabore: 0,
  variableIncome: 1000,
  alternativeIncome: 500,
  hoursWorkedPerMonth: 160,
  currency: "BRL",
  vectorPercentages: {
    sobrevivencia: 50,
    aceleracao: 25,
    futuro: 15,
    lazer: 10,
  },
  fireTargetAnnualExpenseMultiplier: 25,
  annualReturnRate: 0.12,
  currentPatrimony: 45000,
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2026-10-24", description: "Aluguel & Condomínio", amount: 2400, category: "Moradia", vector: "sobrevivencia", method: "Pix" },
  { id: "2", date: "2026-10-24", description: "Supermercado Semanal", amount: 620, category: "Alimentação", vector: "sobrevivencia", method: "Cartão" },
  { id: "3", date: "2026-10-23", description: "Aporte Tesouro IPCA+ 2035", amount: 1200, category: "Investimentos", vector: "aceleracao", method: "Ted/Pix" },
  { id: "4", date: "2026-10-22", description: "FIIs Dividend Yield", amount: 600, category: "Investimentos", vector: "aceleracao", method: "Home Broker" },
  { id: "5", date: "2026-10-21", description: "Reserva Viagem Japão", amount: 500, category: "Projetos", vector: "futuro", method: "CDB Liquidez" },
  { id: "6", date: "2026-10-20", description: "Jantar Degustação Cyberpunk", amount: 280, category: "Gastronomia", vector: "lazer", method: "Crédito" },
  { id: "7", date: "2026-10-19", description: "Netflix 4K Ultra", amount: 55.9, category: "Assinatura", vector: "lazer", method: "Crédito", isRecurring: true },
  { id: "8", date: "2026-10-18", description: "Spotify Duo HiFi", amount: 27.9, category: "Assinatura", vector: "lazer", method: "Crédito", isRecurring: true },
  { id: "9", date: "2026-10-17", description: "Uber Comfort", amount: 38.4, category: "Transporte", vector: "sobrevivencia", method: "Pix" },
];

const FinancialContext = createContext<FinancialContextType | null>(null);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("quantum_hud_settings");
      const storedTx = localStorage.getItem("quantum_hud_tx");
      if (storedSettings) setSettings(JSON.parse(storedSettings));
      if (storedTx) setTransactions(JSON.parse(storedTx));
    } catch (e) {
      console.warn("Storage sync error:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("quantum_hud_settings", JSON.stringify(settings));
      localStorage.setItem("quantum_hud_tx", JSON.stringify(transactions));
    } catch (e) {
      console.warn("Saving state error:", e);
    }
  }, [settings, transactions, isLoaded]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addTransaction = (tx: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setTransactions(INITIAL_TRANSACTIONS);
  };

  const totalIncome =
    settings.liquidIncome +
    settings.proLabore +
    settings.variableIncome +
    settings.alternativeIncome;

  const hourlyRate =
    settings.hoursWorkedPerMonth > 0 ? totalIncome / settings.hoursWorkedPerMonth : 0;

  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const netSavings = totalIncome - totalSpent;

  const monthlySurvivalTarget = totalIncome * (settings.vectorPercentages.sobrevivencia / 100);
  const dailySurvivalCost = monthlySurvivalTarget / 30;

  // FIRE Calculation
  const annualExpenses = totalSpent > 0 ? totalSpent * 12 : totalIncome * 0.7 * 12;
  const targetPatrimony = annualExpenses * settings.fireTargetAnnualExpenseMultiplier;
  const currentPatrimony = settings.currentPatrimony + Math.max(0, netSavings);
  const progressPct = targetPatrimony > 0 ? Math.min(100, (currentPatrimony / targetPatrimony) * 100) : 0;

  const monthlyInvestment = totalIncome * (settings.vectorPercentages.aceleracao / 100);
  const monthlyRate = Math.pow(1 + settings.annualReturnRate, 1 / 12) - 1;

  // Years to FIRE using financial formula
  let monthsToFire = 120; // default 10 years fallback
  if (monthlyInvestment > 0 && targetPatrimony > currentPatrimony) {
    // FV = PV*(1+r)^n + PMT*(((1+r)^n - 1)/r)
    // Estimate months by simulation loop for ultra-reliability
    let simPatrimony = currentPatrimony;
    let m = 0;
    while (simPatrimony < targetPatrimony && m < 600) {
      simPatrimony = simPatrimony * (1 + monthlyRate) + monthlyInvestment;
      m++;
    }
    monthsToFire = m;
  }
  const yearsToFire = Math.floor(monthsToFire / 12);
  const remMonths = monthsToFire % 12;

  const analyzeImpulse = (item: string, price: number): ImpulseAnalysis => {
    const workHours = hourlyRate > 0 ? price / hourlyRate : 0;
    const r = settings.annualReturnRate;
    const projection1y = price * Math.pow(1 + r, 1);
    const projection5y = price * Math.pow(1 + r, 5);
    const projection10y = price * Math.pow(1 + r, 10);

    let verdict: 'AUTORIZADO' | 'ATENCAO_IMPACTO' | 'CRITICO' = 'AUTORIZADO';
    if (price > totalIncome * 0.25 || workHours > 40) {
      verdict = 'CRITICO';
    } else if (price > totalIncome * 0.08 || workHours > 12) {
      verdict = 'ATENCAO_IMPACTO';
    }

    return {
      item,
      price,
      workHours,
      projection1y,
      projection5y,
      projection10y,
      verdict,
    };
  };

  const parseNaturalLanguage = (text: string): Transaction[] => {
    const results: Transaction[] = [];
    const segments = text.split(/(?:,|\se\s|\smais\s|\+)/i).map((s) => s.trim()).filter(Boolean);

    for (const seg of segments) {
      const match = seg.match(/(\d+[.,]?\d*)/);
      if (!match) continue;
      const amount = parseFloat(match[1].replace(",", "."));
      if (isNaN(amount) || amount <= 0) continue;

      let desc = seg.replace(match[0], "").trim();
      desc = desc.replace(/^(gastei|paguei|comprei|de|no|na|em|por|r\$)\s*/gi, "").trim();
      if (!desc) desc = "Despesa Espontânea";

      const lower = seg.toLowerCase();
      let vector: VectorKey = "sobrevivencia";
      let category = "Diversos";

      if (lower.includes("invest") || lower.includes("selic") || lower.includes("ipca") || lower.includes("fii") || lower.includes("ação") || lower.includes("cripto")) {
        vector = "aceleracao";
        category = "Investimento FIRE";
      } else if (lower.includes("curso") || lower.includes("viagem") || lower.includes("livro") || lower.includes("notebook") || lower.includes("meta")) {
        vector = "futuro";
        category = "Projeto Futuro";
      } else if (lower.includes("netflix") || lower.includes("bar") || lower.includes("jogo") || lower.includes("cinema") || lower.includes("chopp") || lower.includes("lazer")) {
        vector = "lazer";
        category = "Lazer Sem Culpa";
      } else if (lower.includes("aluguel") || lower.includes("luz") || lower.includes("uber") || lower.includes("mercado") || lower.includes("almoço") || lower.includes("farmácia")) {
        vector = "sobrevivencia";
        category = "Essenciais";
      }

      results.push({
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toISOString().split("T")[0],
        description: desc.charAt(0).toUpperCase() + desc.slice(1),
        amount,
        category,
        vector,
        method: lower.includes("cartao") || lower.includes("cartão") ? "Cartão" : "Pix",
      });
    }

    return results;
  };

  return (
    <FinancialContext.Provider
      value={{
        settings,
        updateSettings,
        transactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        hourlyRate,
        dailySurvivalCost,
        totalSpent,
        netSavings,
        fireStats: {
          targetPatrimony,
          currentPatrimony,
          progressPct,
          yearsToFire,
          monthsToFire: remMonths,
        },
        analyzeImpulse,
        parseNaturalLanguage,
        resetToDefaults,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error("useFinancial must be used within a FinancialProvider");
  }
  return context;
}


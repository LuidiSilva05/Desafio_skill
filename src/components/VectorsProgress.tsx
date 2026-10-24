"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { Shield, Zap, Rocket, Gamepad2, Info } from "lucide-react";
import { VectorKey } from "../types/financial";

export function VectorsProgress() {
  const { totalIncome, transactions, settings } = useFinancial();

  // Calculate spent in each vector
  const vectorSpent: Record<VectorKey, number> = {
    sobrevivencia: 0,
    aceleracao: 0,
    futuro: 0,
    lazer: 0,
  };

  transactions.forEach((tx) => {
    if (vectorSpent[tx.vector] !== undefined) {
      vectorSpent[tx.vector] += tx.amount;
    }
  });

  const vectors = [
    {
      key: "sobrevivencia" as VectorKey,
      name: "Vetor Sobrevivência",
      tag: "50-60% Teto",
      pctTarget: settings.vectorPercentages.sobrevivencia,
      spent: vectorSpent.sobrevivencia,
      targetAmount: totalIncome * (settings.vectorPercentages.sobrevivencia / 100),
      barColor: "bg-slate-700",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      description: "Moradia, contas essenciais, supermercado e saúde.",
      isCap: true,
    },
    {
      key: "aceleracao" as VectorKey,
      name: "Vetor Aceleração FIRE",
      tag: "20%+ Mínimo",
      pctTarget: settings.vectorPercentages.aceleracao,
      spent: vectorSpent.aceleracao,
      targetAmount: totalIncome * (settings.vectorPercentages.aceleracao / 100),
      barColor: "bg-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Tesouro Selic/IPCA, Ações, FIIs e Ativos Globais.",
      isCap: false,
    },
    {
      key: "futuro" as VectorKey,
      name: "Vetor Futuro",
      tag: "10-15% Meta",
      pctTarget: settings.vectorPercentages.futuro,
      spent: vectorSpent.futuro,
      targetAmount: totalIncome * (settings.vectorPercentages.futuro / 100),
      barColor: "bg-kamino-600",
      badgeColor: "bg-indigo-50 text-kamino-700 border-indigo-200",
      description: "Projetos de médio prazo, especializações e viagens.",
      isCap: false,
    },
    {
      key: "lazer" as VectorKey,
      name: "Vetor Lazer Livre",
      tag: "10-15% Fixo",
      pctTarget: settings.vectorPercentages.lazer,
      spent: vectorSpent.lazer,
      targetAmount: totalIncome * (settings.vectorPercentages.lazer / 100),
      barColor: "bg-amber-500",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Lazer sem culpa para manter a qualidade de vida diária.",
      isCap: true,
    },
  ];

  return (
    <div className="kamino-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-base text-navy-900">
              Método Quantum-Split
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Alocação em 4 Vetores
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Distribuição matemática de capital para equilibrar crescimento patrimonial e qualidade de vida.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-500">
          Orçamento Calibrado: <span className="font-semibold text-navy-900">R$ {totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vectors.map((vec) => {
          const consumptionPct =
            vec.targetAmount > 0 ? (vec.spent / vec.targetAmount) * 100 : 0;
          const remaining = vec.targetAmount - vec.spent;

          let statusBadge = "Dentro do Limite";
          let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

          if (vec.isCap) {
            if (consumptionPct > 100) {
              statusBadge = "Acima do Teto";
              badgeStyle = "bg-red-50 text-red-700 border-red-200";
            } else if (consumptionPct > 80) {
              statusBadge = "Atenção ao Teto";
              badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
            } else {
              statusBadge = "Dentro do Limite";
              badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
            }
          } else {
            if (consumptionPct >= 100) {
              statusBadge = "Meta Atingida";
              badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
            } else {
              statusBadge = `${consumptionPct.toFixed(0)}% Aportado`;
              badgeStyle = "bg-indigo-50 text-kamino-700 border-indigo-200";
            }
          }

          return (
            <div
              key={vec.key}
              className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-heading font-semibold text-sm text-navy-900">
                      {vec.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 px-1.5 py-0.5 rounded bg-white border border-slate-200">
                      {vec.pctTarget}%
                    </span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                    {statusBadge}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-2">
                  <div className="font-heading text-xl font-bold text-navy-900">
                    R$ {vec.spent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    / R$ {vec.targetAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full ${vec.barColor} transition-all duration-500`}
                    style={{ width: `${Math.min(100, consumptionPct)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>Consumido: {consumptionPct.toFixed(1)}%</span>
                  <span>
                    {vec.isCap
                      ? remaining >= 0
                        ? `Saldo Livre: R$ ${remaining.toFixed(2)}`
                        : `Excesso: R$ ${Math.abs(remaining).toFixed(2)}`
                      : `Aportar restante: R$ ${Math.max(0, remaining).toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{vec.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

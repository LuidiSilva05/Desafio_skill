"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { ShieldAlert, AlertCircle } from "lucide-react";

export function LeakDetector() {
  const { transactions, settings } = useFinancial();

  // Filter subscriptions and micro-expenses
  const subscriptions = transactions.filter(
    (t) => t.category.toLowerCase().includes("assinatura") || t.isRecurring
  );

  const totalMonthlySubs = subscriptions.reduce((acc, curr) => acc + curr.amount, 0);
  const annualSubs = totalMonthlySubs * 12;

  // 5 years compound growth of saving these subscriptions
  const monthlyRate = Math.pow(1 + settings.annualReturnRate, 1 / 12) - 1;
  const fiveYearsImpact =
    totalMonthlySubs > 0
      ? totalMonthlySubs * ((Math.pow(1 + monthlyRate, 60) - 1) / monthlyRate)
      : 0;

  return (
    <div className="kamino-card p-6">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
          <ShieldAlert className="w-5 h-5 text-kamino-600" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-base text-navy-900">
            Auditoria de Custos Recorrentes & Assinaturas
          </h2>
          <p className="text-xs text-slate-500">
            Identificação de microgastos e serviços com débito automático que podem drenar o orçamento.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Assinaturas Ativas</div>
          <div className="font-heading text-xl font-bold text-navy-900 mt-1">
            {subscriptions.length} serviços
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Total: R$ {totalMonthlySubs.toFixed(2)} / mês
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Dreno Anual Acumulado</div>
          <div className="font-heading text-xl font-bold text-red-600 mt-1">
            R$ {annualSubs.toFixed(2)} / ano
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Impacto no Vetor Sobrevivência
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Se Investido em 5 Anos</div>
          <div className="font-heading text-xl font-bold text-emerald-600 mt-1">
            R$ {fiveYearsImpact.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">
            Projeção no Vetor Aceleração FIRE
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
          >
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-kamino-600"></span>
              <span className="font-semibold text-navy-900">{sub.description}</span>
              <span className="text-slate-400">({sub.method})</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-heading font-bold text-navy-900">
                R$ {sub.amount.toFixed(2)}/mês
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Recorrente
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

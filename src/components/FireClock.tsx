"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { TrendingUp, Target, Award, ShieldCheck } from "lucide-react";

export function FireClock() {
  const { fireStats, settings, totalIncome } = useFinancial();

  const monthlyAceleration = totalIncome * (settings.vectorPercentages.aceleracao / 100);

  return (
    <div className="kamino-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-base text-navy-900">
              Projeção de Liberdade Financeira (FIRE)
            </h2>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Regra dos 4% (25x Custos Anuais)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cálculo atuarial de independência baseado no ritmo atual de aportes e rentabilidade real esperada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Tempo Estimado */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tempo até a Independência
            </div>
            <div className="font-heading font-extrabold text-2xl lg:text-3xl text-navy-900 mt-2">
              {fireStats.yearsToFire} <span className="text-base font-medium text-slate-500">anos e</span> {fireStats.monthsToFire} <span className="text-base font-medium text-slate-500">meses</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-200">
            Aporte Mensal: <strong className="text-navy-900">R$ {monthlyAceleration.toFixed(0)}/mês</strong> a {(settings.annualReturnRate * 100).toFixed(0)}% a.a.
          </div>
        </div>

        {/* Metric 2: Patrimônio Alvo */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-kamino-600" /> Patrimônio Alvo FIRE:
              </span>
              <span className="font-heading font-bold text-navy-900">
                R$ {fireStats.targetPatrimony.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-kamino-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, fireStats.progressPct)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-medium">
              <span>Atual: R$ {fireStats.currentPatrimony.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</span>
              <span className="text-emerald-600 font-semibold">{fireStats.progressPct.toFixed(1)}% Atingido</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex justify-between">
            <span>Renda Mensal Segura:</span>
            <span className="font-semibold text-navy-900">
              R$ {(fireStats.targetPatrimony * (0.04 / 12)).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}/mês
            </span>
          </div>
        </div>

        {/* Metric 3: Multiplicador de Juros Compostos */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-kamino-600" />
            <span>Curva de Aceleração Patrimonial</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Projeção 5 anos:</span>
              <span className="font-semibold text-navy-900">
                R$ {(fireStats.currentPatrimony * Math.pow(1 + settings.annualReturnRate, 5) + monthlyAceleration * 75).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
              <span className="text-slate-500">Projeção 10 anos:</span>
              <span className="font-semibold text-emerald-600">
                R$ {(fireStats.currentPatrimony * Math.pow(1 + settings.annualReturnRate, 10) + monthlyAceleration * 230).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-2">
            Carteira recomendada: Renda Fixa IPCA+, Fundos Imobiliários e Ativos Globais.
          </div>
        </div>
      </div>
    </div>
  );
}

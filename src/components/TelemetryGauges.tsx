"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { TrendingUp, Clock, DollarSign, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function TelemetryGauges() {
  const { totalIncome, hourlyRate, dailySurvivalCost, totalSpent, netSavings, settings } = useFinancial();

  const spentPercentage = totalIncome > 0 ? (totalSpent / totalIncome) * 100 : 0;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const isOverBudget = spentPercentage > 85;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Consumo do Orçamento Mensal */}
      <div className="kamino-card p-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span className="uppercase tracking-wider">Orçamento Consumido</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            isOverBudget ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}>
            {spentPercentage.toFixed(1)}% do Teto
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="font-heading text-2xl font-bold text-navy-900">
            R$ {totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500">
            de R$ {totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? "bg-red-500" : "bg-kamino-600"
            }`}
            style={{ width: `${Math.min(100, spentPercentage)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2.5">
          <span>{isOverBudget ? "Orçamento sob pressão" : "Dentro do limite seguro"}</span>
          <span className="font-medium text-slate-700">
            R$ {Math.max(0, totalIncome - totalSpent).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} restante
          </span>
        </div>
      </div>

      {/* Metric 2: Custo da Hora de Trabalho */}
      <div className="kamino-card p-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span className="uppercase tracking-wider">Valor da Hora de Vida</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {settings.hoursWorkedPerMonth}h / mês
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="font-heading text-2xl font-bold text-navy-900">
            R$ {hourlyRate.toFixed(2)}
            <span className="text-xs font-normal text-slate-500 ml-1">/ hora</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <span>Taxa de Conversão:</span>
          <span className="font-semibold text-kamino-600">
            1 dia (8h) = R$ {(hourlyRate * 8).toFixed(0)}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">
          Base: Salário Líquido + Receitas / {settings.hoursWorkedPerMonth}h
        </div>
      </div>

      {/* Metric 3: Custo Diário de Sobrevivência */}
      <div className="kamino-card p-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span className="uppercase tracking-wider">Burn Rate Diário</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-kamino-700 border border-indigo-100">
            Sobrevivência
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="font-heading text-2xl font-bold text-navy-900">
            R$ {dailySurvivalCost.toFixed(2)}
            <span className="text-xs font-normal text-slate-500 ml-1">/ dia</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <span>Teto do Vetor:</span>
          <span className="font-semibold text-slate-700">
            R$ {(totalIncome * (settings.vectorPercentages.sobrevivencia / 100)).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">
          Custo diário para manter moradia, alimentação e saúde
        </div>
      </div>

      {/* Metric 4: Excedente Líquido & Poupança */}
      <div className="kamino-card p-5">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span className="uppercase tracking-wider">Excedente Líquido</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {savingsRate.toFixed(0)}% Taxa Poupança
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className={`font-heading text-2xl font-bold ${netSavings >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            R$ {netSavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <span>Potencial de Aceleração:</span>
          <span className="font-semibold text-emerald-600">
            {netSavings > 0 ? "Pronto para Aporte" : "Atenção ao Balanço"}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1">
          Saldo livre direcionável a investimentos FIRE
        </div>
      </div>
    </div>
  );
}

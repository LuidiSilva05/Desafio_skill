"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { Gauge, Clock, ShieldAlert, TrendingUp, DollarSign } from "lucide-react";

export function TelemetryGauges() {
  const { totalIncome, hourlyRate, dailySurvivalCost, totalSpent, netSavings, settings } = useFinancial();

  const spentPercentage = totalIncome > 0 ? (totalSpent / totalIncome) * 100 : 0;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const isOverBudget = spentPercentage > 85;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Gauge 1: Status do Mês (% Consumo) */}
      <div className="hud-box rounded-xl p-4 transition-all hover:border-hud-cyan group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-hud-cyan">
            <Gauge className="w-4 h-4" /> [ STATUS DO MÊS ]
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${isOverBudget ? "bg-hud-magenta/20 text-hud-magenta border border-hud-magenta/40" : "bg-hud-green/20 text-hud-green border border-hud-green/40"}`}>
            {isOverBudget ? "ALERTA" : "NOMINAL"}
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div className="font-orbitron text-2xl lg:text-3xl font-extrabold text-white">
            {spentPercentage.toFixed(1)}%
          </div>
          <div className="text-xs font-mono text-slate-400">
            {spentPercentage <= 100 ? "Teto Seguro OK" : "Extrapolado"}
          </div>
        </div>

        {/* HUD Meter Bar */}
        <div className="w-full bg-space-950 h-2.5 rounded-full overflow-hidden mt-3 border border-slate-800">
          <div
            className={`h-full transition-all duration-700 ${
              isOverBudget
                ? "bg-gradient-to-r from-amber-500 to-hud-magenta shadow-[0_0_10px_#ff006e]"
                : "bg-gradient-to-r from-hud-cyan to-hud-green shadow-[0_0_10px_#00f5ff]"
            }`}
            style={{ width: `${Math.min(100, spentPercentage)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
          <span>Gasto: R$ {totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          <span>Teto: R$ {totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Gauge 2: Valor da Hora de Trabalho */}
      <div className="hud-box rounded-xl p-4 transition-all hover:border-hud-gold group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-hud-gold">
            <Clock className="w-4 h-4" /> [ VALOR DA HORA ]
          </span>
          <span className="text-[10px] font-mono text-hud-gold/80 bg-hud-gold/10 px-1.5 py-0.5 rounded border border-hud-gold/30">
            {settings.hoursWorkedPerMonth}h / mês
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div className="font-orbitron text-2xl lg:text-3xl font-extrabold text-hud-gold">
            R$ {hourlyRate.toFixed(2)}
            <span className="text-xs font-mono text-slate-400 font-normal">/h</span>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span>Conversor de Esforço:</span>
          <span className="text-hud-cyan font-semibold">
            1h = R$ {hourlyRate.toFixed(0)}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Base: Renda Total / {settings.hoursWorkedPerMonth}h mensais
        </div>
      </div>

      {/* Gauge 3: Custo Diário de Sobrevivência */}
      <div className="hud-box rounded-xl p-4 transition-all hover:border-hud-cyan group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-hud-cyan">
            <ShieldAlert className="w-4 h-4" /> [ BURNRATE DIÁRIO ]
          </span>
          <span className="text-[10px] font-mono text-hud-cyan/80 bg-hud-cyan/10 px-1.5 py-0.5 rounded border border-hud-cyan/30">
            30 DIAS
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div className="font-orbitron text-2xl lg:text-3xl font-extrabold text-hud-cyan">
            R$ {dailySurvivalCost.toFixed(2)}
            <span className="text-xs font-mono text-slate-400 font-normal">/dia</span>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span>Teto Sobrevivência:</span>
          <span className="text-white font-semibold">
            R$ {(totalIncome * (settings.vectorPercentages.sobrevivencia / 100)).toFixed(0)}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Para manter o padrão de vida básico
        </div>
      </div>

      {/* Gauge 4: Sobra Líquida / Taxa de Poupança */}
      <div className="hud-box rounded-xl p-4 transition-all hover:border-hud-green group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-hud-green">
            <TrendingUp className="w-4 h-4" /> [ SOBRA PROJETADA ]
          </span>
          <span className="text-[10px] font-mono text-hud-green/80 bg-hud-green/10 px-1.5 py-0.5 rounded border border-hud-green/30">
            {savingsRate.toFixed(0)}% POUPANÇA
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <div className={`font-orbitron text-2xl lg:text-3xl font-extrabold ${netSavings >= 0 ? "text-hud-green" : "text-hud-magenta"}`}>
            R$ {netSavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <span>Potencial Aceleração:</span>
          <span className="text-hud-green font-semibold">
            {netSavings > 0 ? "Pronto para aporte" : "Déficit Detectado"}
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          Excedente líquido livre de obrigações
        </div>
      </div>
    </div>
  );
}


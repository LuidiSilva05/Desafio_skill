"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { Hourglass, Flame, TrendingUp, Target, Award } from "lucide-react";

export function FireClock() {
  const { fireStats, settings, totalIncome } = useFinancial();

  const monthlyAceleration = totalIncome * (settings.vectorPercentages.aceleracao / 100);

  return (
    <div className="hud-box rounded-xl p-5 border border-hud-green/30 bg-gradient-to-br from-space-900/90 via-space-950 to-space-900">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-green-950/70 border border-hud-green text-hud-green shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-sm tracking-widest text-hud-green flex items-center gap-2">
              <span>⏳ RELÓGIO DE LIBERDADE FINANCEIRA (FIRE)</span>
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Cálculo atuaria SpaceX para independência financeira total.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-hud-green bg-hud-green/10 border border-hud-green/30 px-2.5 py-1 rounded">
            REGRA DOS 4% (25x Custos Anuais)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Count Down Big Display */}
        <div className="p-4 rounded-xl bg-space-950 border border-hud-green/40 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400">
            [ ESTIMATIVA ATUARIAL ]
          </div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-4">
            Tempo Projetado até a Liberdade:
          </div>
          <div className="font-orbitron font-extrabold text-3xl sm:text-4xl text-hud-green tracking-tight mt-1 shadow-sm">
            {fireStats.yearsToFire} <span className="text-sm font-mono text-slate-400 font-normal">ANOS</span> {fireStats.monthsToFire} <span className="text-sm font-mono text-slate-400 font-normal">MESES</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2">
            Base: Aportes de R$ {monthlyAceleration.toFixed(0)}/mês a {(settings.annualReturnRate * 100).toFixed(0)}% a.a.
          </div>
        </div>

        {/* Progress Bar & Patrimony Target */}
        <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1 text-slate-300">
                <Target className="w-3.5 h-3.5 text-hud-cyan" /> PATRIMÔNIO ALVO FIRE:
              </span>
              <span className="text-hud-cyan font-bold font-orbitron">
                R$ {fireStats.targetPatrimony.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="w-full bg-space-950 h-3 rounded-full overflow-hidden mt-2 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-hud-cyan to-hud-green shadow-[0_0_10px_#39ff14] transition-all duration-700"
                style={{ width: `${Math.min(100, fireStats.progressPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
              <span>Atual: R$ {fireStats.currentPatrimony.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</span>
              <span className="text-hud-green font-bold">{fireStats.progressPct.toFixed(1)}% Alcançado</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Rendimento Mensal Projetado na Liberdade:</span>
            <span className="text-hud-green font-bold">
              R$ {(fireStats.targetPatrimony * (0.04 / 12)).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}/mês
            </span>
          </div>
        </div>

        {/* Compound Interest Multiplier Simulation */}
        <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-300 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-hud-green" />
            <span>MULTIPLICADOR DE JUROS COMPOSTOS</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between p-1 rounded bg-space-950/70 border border-slate-800/50">
              <span className="text-slate-400">Em 5 Anos:</span>
              <span className="text-hud-cyan font-bold">
                R$ {(fireStats.currentPatrimony * Math.pow(1 + settings.annualReturnRate, 5) + monthlyAceleration * 75).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between p-1 rounded bg-space-950/70 border border-slate-800/50">
              <span className="text-slate-400">Em 10 Anos:</span>
              <span className="text-hud-green font-bold">
                R$ {(fireStats.currentPatrimony * Math.pow(1 + settings.annualReturnRate, 10) + monthlyAceleration * 230).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between p-1 rounded bg-space-950/70 border border-slate-800/50">
              <span className="text-slate-400">Em 15 Anos:</span>
              <span className="text-hud-gold font-bold">
                R$ {(fireStats.currentPatrimony * Math.pow(1 + settings.annualReturnRate, 15) + monthlyAceleration * 500).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 mt-2">
            Taxa adotada: {(settings.annualReturnRate * 100).toFixed(0)}% a.a. diversificada (IPCA+, FIIs, Global)
          </div>
        </div>
      </div>
    </div>
  );
}

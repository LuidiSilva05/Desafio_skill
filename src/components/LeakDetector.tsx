"use client";

import React from "react";
import { useFinancial } from "../context/FinancialContext";
import { ShieldAlert, AlertTriangle, ArrowRight, Zap } from "lucide-react";

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
    <div className="hud-box rounded-xl p-5 border border-hud-magenta/30 bg-space-900/80">
      <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-slate-800">
        <div className="p-2 rounded-lg bg-pink-950/70 border border-hud-magenta text-hud-magenta shadow-neon-magenta">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-sm tracking-widest text-hud-magenta">
            DETECTOR DE VAZAMENTOS SILENCIOSOS
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Assinaturas esquecidas, microgastos recorrentes e cobranças automáticas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-space-950 border border-slate-800 text-center">
          <div className="text-[10px] font-mono text-slate-400">ASSINATURAS DETECTADAS</div>
          <div className="font-orbitron text-xl font-bold text-white mt-1">
            {subscriptions.length} ativas
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Total: R$ {totalMonthlySubs.toFixed(2)}/mês
          </div>
        </div>

        <div className="p-3 rounded-lg bg-space-950 border border-slate-800 text-center">
          <div className="text-[10px] font-mono text-slate-400">CUSTO ANUAL DRENADO</div>
          <div className="font-orbitron text-xl font-bold text-hud-magenta mt-1">
            R$ {annualSubs.toFixed(2)}/ano
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Impacto no Vetor Sobrevivência
          </div>
        </div>

        <div className="p-3 rounded-lg bg-space-950 border border-slate-800 text-center">
          <div className="text-[10px] font-mono text-slate-400">SE INVESTIDO EM 5 ANOS</div>
          <div className="font-orbitron text-xl font-bold text-hud-green mt-1">
            R$ {fiveYearsImpact.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[11px] font-mono text-hud-green/80 mt-1">
            Aporte no Vetor Aceleração FIRE
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-2.5 rounded-lg bg-space-950/70 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-hud-magenta"></span>
              <span className="text-white font-semibold">{sub.description}</span>
              <span className="text-slate-500">({sub.method})</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-hud-magenta font-bold">
                R$ {sub.amount.toFixed(2)}/mês
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                AUDITAR
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


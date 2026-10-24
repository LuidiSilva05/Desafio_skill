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
      name: "SOBREVIVÊNCIA",
      emoji: "🛡️",
      icon: Shield,
      pctTarget: settings.vectorPercentages.sobrevivencia,
      spent: vectorSpent.sobrevivencia,
      targetAmount: totalIncome * (settings.vectorPercentages.sobrevivencia / 100),
      color: "#00f5ff",
      bgBar: "bg-hud-cyan",
      textColor: "text-hud-cyan",
      borderColor: "border-hud-cyan/30",
      description: "Moradia, contas básicas, mercado e saúde. Teto seguro.",
      isCap: true, // It's a ceiling
    },
    {
      key: "aceleracao" as VectorKey,
      name: "ACELERAÇÃO FIRE",
      emoji: "⚡",
      icon: Zap,
      pctTarget: settings.vectorPercentages.aceleracao,
      spent: vectorSpent.aceleracao,
      targetAmount: totalIncome * (settings.vectorPercentages.aceleracao / 100),
      color: "#39ff14",
      bgBar: "bg-hud-green",
      textColor: "text-hud-green",
      borderColor: "border-hud-green/30",
      description: "Tesouro Selic/IPCA, Ações, FIIs e Ativos Globais.",
      isCap: false, // It's a minimum goal
    },
    {
      key: "futuro" as VectorKey,
      name: "VETOR FUTURO",
      emoji: "🚀",
      icon: Rocket,
      pctTarget: settings.vectorPercentages.futuro,
      spent: vectorSpent.futuro,
      targetAmount: totalIncome * (settings.vectorPercentages.futuro / 100),
      color: "#bf5af2",
      bgBar: "bg-hud-purple",
      textColor: "text-hud-purple",
      borderColor: "border-hud-purple/30",
      description: "Projetos pessoais, viagens, especializações e reservas.",
      isCap: false,
    },
    {
      key: "lazer" as VectorKey,
      name: "LAZER LIVRE",
      emoji: "🎮",
      icon: Gamepad2,
      pctTarget: settings.vectorPercentages.lazer,
      spent: vectorSpent.lazer,
      targetAmount: totalIncome * (settings.vectorPercentages.lazer / 100),
      color: "#ffd700",
      bgBar: "bg-hud-gold",
      textColor: "text-hud-gold",
      borderColor: "border-hud-gold/30",
      description: "Gastos sem culpa para manter alta qualidade de vida diária.",
      isCap: true,
    },
  ];

  return (
    <div className="hud-box rounded-xl p-5 border border-cyan-500/30">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="font-orbitron font-bold text-sm tracking-widest text-hud-cyan flex items-center gap-2">
            <span>🧬 MÉTODO QUANTUM-SPLIT</span>
            <span className="text-slate-400 font-mono text-xs font-normal">
              | TELEMETRIA DOS 4 VETORES
            </span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Distribuição matemática para multiplicar patrimônio sem perder o presente.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-hud-cyan animate-pulse"></span>
          <span>CALIBRADO EM 100% DA RENDA TOTAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vectors.map((vec) => {
          const Icon = vec.icon;
          const consumptionPct =
            vec.targetAmount > 0 ? (vec.spent / vec.targetAmount) * 100 : 0;
          const remaining = vec.targetAmount - vec.spent;

          let statusTag = "NOMINAL";
          let statusStyle = "bg-slate-800 text-slate-300 border-slate-700";

          if (vec.isCap) {
            if (consumptionPct > 100) {
              statusTag = "ESTOURADO";
              statusStyle = "bg-hud-magenta/20 text-hud-magenta border-hud-magenta/40";
            } else if (consumptionPct > 80) {
              statusTag = "ALERTA TETO";
              statusStyle = "bg-hud-gold/20 text-hud-gold border-hud-gold/40";
            } else {
              statusTag = "DENTRO DO LIMITE";
              statusStyle = "bg-hud-cyan/20 text-hud-cyan border-hud-cyan/40";
            }
          } else {
            if (consumptionPct >= 100) {
              statusTag = "META SUPERADA 🚀";
              statusStyle = "bg-hud-green/20 text-hud-green border-hud-green/40";
            } else {
              statusTag = `APORTADO ${consumptionPct.toFixed(0)}%`;
              statusStyle = "bg-purple-900/30 text-hud-purple border-purple-500/40";
            }
          }

          return (
            <div
              key={vec.key}
              className="p-4 rounded-lg bg-space-900/80 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{vec.emoji}</span>
                    <span className={`font-orbitron font-bold text-xs ${vec.textColor}`}>
                      {vec.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-space-850 text-slate-400 border border-slate-800">
                      {vec.pctTarget}%
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${statusStyle}`}>
                    {statusTag}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3">
                  <div className="font-orbitron text-xl font-bold text-white">
                    R$ {vec.spent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    / R$ {vec.targetAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-space-950 h-2.5 rounded-full overflow-hidden mt-2.5 border border-slate-800/80 relative">
                  <div
                    className={`h-full ${vec.bgBar} transition-all duration-700`}
                    style={{ width: `${Math.min(100, consumptionPct)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono mt-2 text-slate-400">
                  <span>Progresso: {consumptionPct.toFixed(1)}%</span>
                  <span>
                    {vec.isCap
                      ? remaining >= 0
                        ? `Margem livre: R$ ${remaining.toFixed(2)}`
                        : `Excesso: R$ ${Math.abs(remaining).toFixed(2)}`
                      : `Faltam: R$ ${Math.max(0, remaining).toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/50 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Info className="w-3 h-3 text-slate-400" />
                <span className="truncate">{vec.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

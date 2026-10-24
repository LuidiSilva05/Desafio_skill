"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFinancial } from "../../context/FinancialContext";
import { ArrowLeft, Save, RotateCcw, Check, AlertCircle, DollarSign, Clock, Percent, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const { settings, updateSettings, resetToDefaults } = useFinancial();

  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const totalPercentage =
    Number(formData.vectorPercentages.sobrevivencia) +
    Number(formData.vectorPercentages.aceleracao) +
    Number(formData.vectorPercentages.futuro) +
    Number(formData.vectorPercentages.lazer);

  const isPercentageValid = Math.abs(totalPercentage - 100) < 0.1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const totalIncomePreview =
    Number(formData.liquidIncome) +
    Number(formData.proLabore) +
    Number(formData.variableIncome) +
    Number(formData.alternativeIncome);

  const hourlyRatePreview =
    formData.hoursWorkedPerMonth > 0 ? totalIncomePreview / formData.hoursWorkedPerMonth : 0;

  return (
    <div className="min-h-screen pb-16 px-4 pt-6 max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-mono uppercase text-slate-400 hover:text-hud-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao HUD de Telemetria</span>
        </Link>
        <span className="text-xs font-mono text-hud-cyan bg-cyan-950/60 border border-hud-cyan/30 px-2.5 py-1 rounded">
          CALIBRAÇÃO ATUARIAL DO SISTEMA
        </span>
      </div>

      <div className="hud-box rounded-xl p-6 border border-cyan-500/30">
        <div className="mb-6">
          <h1 className="font-orbitron font-extrabold text-xl text-white tracking-wider flex items-center gap-2">
            <span>⚙️ CALIBRAÇÃO 100% CUSTOMIZÁVEL</span>
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Ajuste fino de todas as métricas: fontes de renda, horas mensais, vetores e parâmetros FIRE.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SEÇÃO 1: FONTES DE RENDA */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-hud-cyan flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <DollarSign className="w-4 h-4" /> [ 1. FONTES DE RENDA MENSAL ]
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Salário Líquido Mensal (CLT / Fixo)
                </label>
                <input
                  type="number"
                  value={formData.liquidIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, liquidIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Pró-labore (PJ / Empresa)
                </label>
                <input
                  type="number"
                  value={formData.proLabore}
                  onChange={(e) =>
                    setFormData({ ...formData, proLabore: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Renda Variável (Comissões, Freelas, Bônus)
                </label>
                <input
                  type="number"
                  value={formData.variableIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, variableIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Fontes Alternativas (Dividendos, Aluguéis, Outros)
                </label>
                <input
                  type="number"
                  value={formData.alternativeIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, alternativeIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950 border border-cyan-500/20 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Renda Total Projetada:</span>
              <span className="text-hud-cyan font-bold font-orbitron text-base">
                R$ {totalIncomePreview.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* SEÇÃO 2: VALOR DA HORA DE TRABALHO */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-hud-gold flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Clock className="w-4 h-4" /> [ 2. HORAS TRABALHADAS & TAXA HORÁRIA ]
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Horas Trabalhadas no Mês (Horas)
                </label>
                <input
                  type="number"
                  value={formData.hoursWorkedPerMonth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hoursWorkedPerMonth: parseFloat(e.target.value) || 160,
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-gold focus:outline-none"
                />
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Padrão 40h semanais = 160h/mês | 44h semanais = 176h/mês
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Moeda Padrão de Exibição
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value as any })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-gold focus:outline-none"
                >
                  <option value="BRL">BRL (R$) - Real Brasileiro</option>
                  <option value="USD">USD ($) - Dólar Americano</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="BTC">BTC (₿) - Bitcoin</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950 border border-yellow-500/20 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Valor da sua Hora de Vida:</span>
              <span className="text-hud-gold font-bold font-orbitron text-base">
                R$ {hourlyRatePreview.toFixed(2)}/h
              </span>
            </div>
          </div>

          {/* SEÇÃO 3: MÉTODO QUANTUM-SPLIT (% DE CADA VETOR) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h2 className="text-xs font-mono uppercase tracking-widest text-hud-green flex items-center gap-1.5">
                <Percent className="w-4 h-4" /> [ 3. METAS E PORCENTAGENS DOS 4 VETORES ]
              </h2>
              <span
                className={`text-xs font-mono font-bold ${
                  isPercentageValid ? "text-hud-green" : "text-hud-magenta"
                }`}
              >
                Soma Atual: {totalPercentage}% {isPercentageValid ? "(100% OK)" : "(Ajuste para 100%)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  🛡️ Vetor Sobrevivência (%)
                </label>
                <input
                  type="number"
                  value={formData.vectorPercentages.sobrevivencia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vectorPercentages: {
                        ...formData.vectorPercentages,
                        sobrevivencia: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  ⚡ Vetor Aceleração FIRE (%)
                </label>
                <input
                  type="number"
                  value={formData.vectorPercentages.aceleracao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vectorPercentages: {
                        ...formData.vectorPercentages,
                        aceleracao: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  🚀 Vetor Futuro (%)
                </label>
                <input
                  type="number"
                  value={formData.vectorPercentages.futuro}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vectorPercentages: {
                        ...formData.vectorPercentages,
                        futuro: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  🎮 Vetor Lazer Livre (%)
                </label>
                <input
                  type="number"
                  value={formData.vectorPercentages.lazer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vectorPercentages: {
                        ...formData.vectorPercentages,
                        lazer: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: METAS FIRE & PATRIMÔNIO ACUMULADO */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-hud-purple flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4" /> [ 4. PATRIMÔNIO & TAXA DE INVESTIMENTOS ]
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Patrimônio Atual Acumulado (R$)
                </label>
                <input
                  type="number"
                  value={formData.currentPatrimony}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPatrimony: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-purple focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                  Taxa de Retorno Real Anual Esperada (% a.a.)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.annualReturnRate * 100}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualReturnRate: (parseFloat(e.target.value) || 12) / 100,
                    })
                  }
                  className="w-full bg-space-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white focus:border-hud-purple focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={resetToDefaults}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 text-slate-400 hover:text-white font-mono text-xs uppercase transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restaurar Padrões</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-hud-cyan to-blue-500 text-space-950 font-orbitron font-bold text-xs uppercase hover:brightness-110 shadow-neon-cyan transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Gravar Calibração no HUD</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-lg bg-green-950/40 border border-hud-green text-xs font-mono text-hud-green flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Configurações salvas e aplicadas a toda a telemetria do sistema!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}


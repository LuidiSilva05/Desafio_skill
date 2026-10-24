"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFinancial } from "../../context/FinancialContext";
import { ArrowLeft, Save, RotateCcw, Check, DollarSign, Clock, Percent, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-surface-ground pb-20 px-6 pt-8 max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Dashboard</span>
        </Link>
        <span className="text-xs font-semibold text-kamino-600 bg-kamino-50 border border-kamino-100 px-3 py-1 rounded-full">
          Parâmetros Financeiros & Calibração
        </span>
      </div>

      <div className="kamino-card p-8">
        <div className="mb-8">
          <h1 className="font-heading font-extrabold text-2xl text-navy-900 tracking-tight">
            Configurações do Sistema
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalize todas as premissas atuariais: receitas, horas trabalhadas, percentuais dos 4 Vetores e metas FIRE.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SEÇÃO 1: FONTES DE RECEITA */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-2.5 border-b border-slate-100">
              <DollarSign className="w-4 h-4 text-kamino-600" /> Fontes de Receita Mensal
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Salário Líquido Mensal (CLT / Fixo)
                </label>
                <input
                  type="number"
                  value={formData.liquidIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, liquidIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Pró-labore (PJ / Empresa)
                </label>
                <input
                  type="number"
                  value={formData.proLabore}
                  onChange={(e) =>
                    setFormData({ ...formData, proLabore: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Renda Variável (Comissões, Freelas, Bônus)
                </label>
                <input
                  type="number"
                  value={formData.variableIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, variableIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Fontes Alternativas (Dividendos, Aluguéis, Outros)
                </label>
                <input
                  type="number"
                  value={formData.alternativeIncome}
                  onChange={(e) =>
                    setFormData({ ...formData, alternativeIncome: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Renda Total Mensal Consolidada:</span>
              <span className="text-kamino-600 font-heading font-bold text-lg">
                R$ {totalIncomePreview.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* SEÇÃO 2: VALOR DA HORA DE TRABALHO */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-2.5 border-b border-slate-100">
              <Clock className="w-4 h-4 text-kamino-600" /> Horas Trabalhadas & Custo da Hora
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Horas Trabalhadas no Mês
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Padrão 40h semanais = 160h/mês | 44h semanais = 176h/mês
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Moeda Principal do Dashboard
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value as any })
                  }
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                >
                  <option value="BRL">BRL (R$) - Real Brasileiro</option>
                  <option value="USD">USD ($) - Dólar Americano</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="BTC">BTC (₿) - Bitcoin</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Valor Calculado da Hora de Trabalho:</span>
              <span className="text-navy-900 font-heading font-bold text-lg">
                R$ {hourlyRatePreview.toFixed(2)} / hora
              </span>
            </div>
          </div>

          {/* SEÇÃO 3: MÉTODO QUANTUM-SPLIT (% DE CADA VETOR) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Percent className="w-4 h-4 text-kamino-600" /> Metas dos 4 Vetores de Capital
              </h2>
              <span
                className={`text-xs font-semibold ${
                  isPercentageValid ? "text-emerald-600" : "text-red-600"
                }`}
              >
                Soma: {totalPercentage}% {isPercentageValid ? "(100% Calibrado)" : "(Ajuste para 100%)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  🛡️ Vetor Sobrevivência (Contas Fixas e Essenciais %)
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  ⚡ Vetor Aceleração FIRE (Investimentos %)
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  🚀 Vetor Futuro (Projetos & Upgrades %)
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  🎮 Vetor Lazer Livre (Qualidade de Vida %)
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: METAS FIRE & PATRIMÔNIO ACUMULADO */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-2.5 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-kamino-600" /> Patrimônio Acumulado & Rentabilidade
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Patrimônio Atual Investido (R$)
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
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
                  className="w-full kamino-input p-3 text-xs text-navy-900"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={resetToDefaults}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restaurar Valores Padrão</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white font-semibold text-xs shadow-sm hover:shadow-indigo transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Configurações salvas e aplicadas a todos os dashboards com sucesso!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

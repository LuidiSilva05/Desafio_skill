"use client";

import React, { useState } from "react";
import { useFinancial } from "../context/FinancialContext";
import { ShoppingBag, Clock, TrendingUp } from "lucide-react";

export function ImpulseCalculator() {
  const { analyzeImpulse, hourlyRate, settings } = useFinancial();
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price.replace(",", "."));
    if (!item.trim() || isNaN(numPrice) || numPrice <= 0) return;

    const res = analyzeImpulse(item, numPrice);
    setResult(res);
  };

  return (
    <div className="kamino-card p-6">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-kamino-600">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-base text-navy-900">
            Calculadora de Custo de Oportunidade
          </h2>
          <p className="text-xs text-slate-500">
            Analise o impacto de decisões de compra em horas de trabalho vs. Projeção de Juros Compostos.
          </p>
        </div>
      </div>

      <form onSubmit={handleSimulate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Item / Aquisição
          </label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Ex: iPhone 16 Pro, Viagem, Curso"
            className="w-full kamino-input px-3.5 py-2 text-xs text-navy-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Valor Estimado (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 5500.00"
            className="w-full kamino-input px-3.5 py-2 text-xs text-navy-900"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-kamino-600 hover:bg-kamino-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            Analisar Custo FIRE
          </button>
        </div>
      </form>

      {/* RESULT DISPLAY */}
      {result && (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
            <div className="font-heading font-bold text-sm text-navy-900">
              Análise de Decisão: <span className="text-kamino-600">{result.item}</span> (R$ {result.price.toFixed(2)})
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                result.verdict === "CRITICO"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : result.verdict === "ATENCAO_IMPACTO"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              Veredito: {result.verdict === "CRITICO" ? "Alto Impacto no Orçamento" : result.verdict === "ATENCAO_IMPACTO" ? "Requer Avaliação" : "Dentro da Margem Segura"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="text-[11px] font-medium text-slate-500">HORAS DE TRABALHO</div>
              <div className="font-heading text-xl font-bold text-navy-900 mt-1">
                {result.workHours.toFixed(1)}h
              </div>
              <div className="text-[10px] text-slate-400">
                {(result.workHours / 8).toFixed(1)} dias de jornada
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="text-[11px] font-medium text-slate-500">PROJEÇÃO EM 1 ANO</div>
              <div className="font-heading text-lg font-bold text-emerald-600 mt-1">
                R$ {result.projection1y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] text-emerald-700">+{(settings.annualReturnRate * 100).toFixed(0)}% a.a.</div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="text-[11px] font-medium text-slate-500">PROJEÇÃO EM 5 ANOS</div>
              <div className="font-heading text-lg font-bold text-emerald-600 mt-1">
                R$ {result.projection5y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] text-slate-400">Multiplicador ~1.76x</div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <div className="text-[11px] font-medium text-slate-500">PROJEÇÃO EM 10 ANOS</div>
              <div className="font-heading text-lg font-bold text-kamino-600 mt-1">
                R$ {result.projection10y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10px] text-kamino-700">Multiplicador ~3.10x</div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-white p-3.5 rounded-lg border border-slate-200">
            <strong className="text-navy-900">Diagnóstico Executivo:</strong> Se este gasto potencializa sua produtividade, saúde ou desenvolvimento pessoal, aloque-o no <strong>Vetor Futuro</strong> ou <strong>Lazer Livre</strong>. Caso seja um impulso pontual, o valor alocado no <strong>Vetor Aceleração</strong> somaria R$ {result.projection10y.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} ao seu patrimônio de longo prazo.
          </div>
        </div>
      )}
    </div>
  );
}
